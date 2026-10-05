import {
  Timer,
  ListChecks,
  CalendarDays,
  Bell,
  BarChart3,
  Users,
  Check,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { Container } from "../ui/Container";
import { Spotlight } from "../ui/Spotlight";
const features = [
  {
    icon: Timer,
    title: "A timer that gives you space.",
    desc: "Settle into one task. Let a gentle timer hold the boundaries, so your attention can stay where it matters.",
    kind: "timer",
  },
  {
    icon: ListChecks,
    title: "Less list. More intention.",
    desc: "Choose your daily priorities and keep the next right thing in sight.",
    kind: "tasks",
  },
  {
    icon: BarChart3,
    title: "Small wins, made visible.",
    desc: "See your completed sessions and discover the rhythm of your week.",
    kind: "chart",
  },
  {
    icon: CalendarDays,
    title: "Your day. Your rhythm.",
    desc: "Shape your sessions and breaks around the way you actually work.",
    kind: "routine",
  },
  {
    icon: Bell,
    title: "A nudge, not a distraction.",
    desc: "Thoughtful reminders for starting, pausing, and coming back.",
    kind: "reminder",
  },
  {
    icon: Users,
    title: "Find your flow, together.",
    desc: "Make room for shared focus with your team on the Team plan.",
    kind: "team",
  },
];
export function Features() {
  return (
    <section id="features" className="feature-section section-space">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / THOUGHTFULLY SIMPLE</p>
            <h2>
              Less friction.
              <br />
              <em>More headspace.</em>
            </h2>
          </div>
          <p>
            You don’t need another tool to manage.
            <br />
            You need a little space to do your thing.
          </p>
        </div>
        <div className="feature-experience">
          <figure className="feature-product-showcase">
            <div className="showcase-copy">
              <p className="eyebrow">MADE FOR A LITTLE MORE YOU</p>
              <h3>
                Your day.
                <br />A clearer view.
              </h3>
              <p>
                Focus, priorities, and progress.
                <br />
                One calm place to bring them together.
              </p>
            </div>
            <div className="showcase-light" aria-hidden="true" />
            <Image
              src="/images/focusflow-front.png"
              width={901}
              height={1746}
              alt="Front view of the FocusFlow app on a metallic phone, with a dark green focus timer interface."
              sizes="(max-width: 640px) 240px, (max-width: 900px) 280px, 300px"
              quality={90}
              className="feature-phone-photo"
            />
            <figcaption>YOUR POCKET-SIZED SPACE TO FOCUS.</figcaption>
          </figure>
          <div className="feature-benefits">
            {features.map(({ icon: Icon, title, desc, kind }, i) => (
              <Spotlight
                key={kind}
                className={`feature-benefit feature-${kind}`}
              >
                <div className="benefit-heading">
                  <span className="benefit-icon">
                    <Icon size={22} />
                  </span>
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <FeatureVisual kind={kind} />
              </Spotlight>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
function FeatureVisual({ kind }: { kind: string }) {
  if (kind === "timer")
    return (
      <div className="feature-timer-art" aria-hidden="true">
        <div className="feature-timer-ring">
          <span>
            25<span>:00</span>
          </span>
        </div>
        <div className="timer-art-label">
          <span className="status-dot" /> A SINGLE TASK. YOUR FULL ATTENTION.
        </div>
      </div>
    );
  if (kind === "tasks")
    return (
      <div className="task-art" aria-hidden="true">
        <div>
          <span className="task-check">
            <Check size={12} />
          </span>
          <span>Make something meaningful</span>
          <ArrowUpRight size={14} />
        </div>
        <div>
          <span className="task-circle" />
          <span>Leave room for a break</span>
        </div>
      </div>
    );
  if (kind === "chart")
    return (
      <div className="chart-art" aria-hidden="true">
        {[35, 58, 44, 83, 66, 92, 50].map((h, i) => (
          <div key={i}>
            <span style={{ height: `${h}px` }} />
            <small>{["M", "T", "W", "T", "F", "S", "S"][i]}</small>
          </div>
        ))}
      </div>
    );
  if (kind === "routine")
    return (
      <div className="routine-art" aria-hidden="true">
        <span>09:00</span>
        <div>
          Deep work <small>25 min</small>
        </div>
        <span>09:25</span>
        <div className="break">
          A little breathing room <small>5 min</small>
        </div>
      </div>
    );
  if (kind === "reminder")
    return (
      <div className="reminder-art" aria-hidden="true">
        <span className="note-icon">
          <Bell size={18} />
        </span>
        <div>
          <strong>Ready for a fresh start?</strong>
          <span>Your next focus session is waiting.</span>
        </div>
        <small>now</small>
      </div>
    );
  return (
    <div className="team-art" aria-hidden="true">
      <div>
        {["J", "M", "A"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <span className="team-status">
        <span className="status-dot" /> In our own space. In the same flow.
      </span>
    </div>
  );
}
