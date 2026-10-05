import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/Manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "FocusFlow — Find your focus. Build your flow.",
  description:
    "Explore FocusFlow, a fictional productivity app concept with focus sessions, daily priorities, and flexible routines. Try the interactive demo.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "FocusFlow — Find your focus. Build your flow.",
    description:
      "Explore FocusFlow, a fictional productivity app concept with focus sessions, daily priorities, and flexible routines. Try the interactive demo.",
    url: siteUrl,
    siteName: "FocusFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FocusFlow — Find your focus. Build your flow.",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusFlow — Find your focus. Build your flow.",
    description:
      "Explore FocusFlow, a fictional productivity app concept. Try the interactive demo.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport = {
  themeColor: "#F7F8F2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.dataset.js='true';try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.reduced='true';}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F8F2] text-[#18211C]">
        {children}
      </body>
    </html>
  );
}
