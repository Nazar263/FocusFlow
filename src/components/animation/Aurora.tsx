"use client";

/**
 * Adapted from React Bits Aurora, copyright (c) 2026 David Haz.
 * MIT + Commons Clause. Full notice: public/licenses/react-bits-LICENSE.md.
 * Source: github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Backgrounds/Aurora/Aurora.tsx
 * OGL is loaded only for the visible hero when full motion is permitted.
 */
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  if (uLightMode > 0.5) {
    float energy = clamp(max(intensity, 0.0), 0.0, 1.0);
    float coverage = clamp(auroraAlpha * (0.55 + 0.45 * energy), 0.0, 0.86);
    vec3 chroma = pow(clamp(rampColor, 0.0, 1.0), vec3(1.2));
    float chromaPeak = max(chroma.r, max(chroma.g, chroma.b));
    chroma /= max(chromaPeak, 0.0001);
    fragColor = vec4(mix(vec3(1.0), chroma, min(coverage * 1.08, 0.94)), 1.0);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export function Aurora({ paused }: { paused: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const synchronize = useRef<(() => void) | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
    synchronize.current?.();
  }, [paused]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let visible = true;
    let initialized = false;
    let frame = 0;
    let destroy: (() => void) | undefined;
    let syncRenderer: (() => void) | undefined;

    async function initialize() {
      if (initialized || disposed || reduced.matches || !visible) return;
      initialized = true;
      try {
        const { Renderer, Program, Mesh, Color, Triangle } =
          await import("ogl");
        if (disposed) return;
        const renderer = new Renderer({
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          dpr: Math.min(
            window.devicePixelRatio,
            window.innerWidth < 768 ? 1 : 1.5,
          ),
          webgl: 2,
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        const geometry = new Triangle(gl);
        delete geometry.attributes.uv;
        const stops = ["#88B68F", "#C3EE78", "#63BDA5"].map((hex) => {
          const color = new Color(hex);
          return [color.r, color.g, color.b];
        });
        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: 1.15 },
            uColorStops: { value: stops },
            uResolution: { value: [1, 1] },
            uBlend: { value: 0.45 },
            uLightMode: { value: 0 },
          },
        });
        const mesh = new Mesh(gl, { geometry, program });
        element?.appendChild(gl.canvas);
        let previous = 0;
        let elapsed = 0;
        let lastPaint = 0;
        const allowed = () =>
          visible && !pausedRef.current && !reduced.matches && !document.hidden;
        const render = () => renderer.render({ scene: mesh });
        const update = (timestamp: number) => {
          frame = 0;
          if (!allowed()) {
            previous = 0;
            return;
          }
          if (previous) elapsed += Math.min(timestamp - previous, 100);
          previous = timestamp;
          if (timestamp - lastPaint >= 1000 / 30) {
            program.uniforms.uTime.value = elapsed * 0.0008;
            render();
            lastPaint = timestamp;
          }
          frame = requestAnimationFrame(update);
        };
        syncRenderer = () => {
          if (!allowed()) {
            cancelAnimationFrame(frame);
            frame = 0;
            previous = 0;
          } else if (!frame) frame = requestAnimationFrame(update);
        };
        const resize = () => {
          if (!element) return;
          renderer.setSize(element.clientWidth, element.clientHeight);
          program.uniforms.uResolution.value = [
            gl.canvas.width,
            gl.canvas.height,
          ];
          render();
        };
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(element!);
        const lost = (event: Event) => {
          event.preventDefault();
          cancelAnimationFrame(frame);
          frame = 0;
          element?.classList.remove("aurora-ready");
        };
        gl.canvas.addEventListener("webglcontextlost", lost);
        resize();
        element?.classList.add("aurora-ready");
        syncRenderer();
        destroy = () => {
          cancelAnimationFrame(frame);
          sizeObserver.disconnect();
          gl.canvas.removeEventListener("webglcontextlost", lost);
          gl.canvas.remove();
          geometry.remove();
          program.remove();
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      } catch {
        element?.classList.remove("aurora-ready");
      }
    }

    const sync = () => {
      void initialize();
      syncRenderer?.();
    };
    synchronize.current = sync;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      disposed = true;
      synchronize.current = null;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      destroy?.();
    };
  }, []);

  return <div ref={container} className="aurora-canvas" aria-hidden="true" />;
}
