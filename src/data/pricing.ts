export type BillingPeriod = "monthly" | "yearly";

export type Plan = {
  id: "free" | "pro" | "team";
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyMonthly: number;
  yearlyTotal: number;
  features: string[];
  cta: string;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For a simpler daily routine.",
    monthlyPrice: 0,
    yearlyMonthly: 0,
    yearlyTotal: 0,
    features: [
      "25-minute focus sessions",
      "Daily priorities",
      "7-day session history",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For a focus routine that's yours.",
    monthlyPrice: 6,
    yearlyMonthly: 4,
    yearlyTotal: 48,
    features: [
      "Everything in Free",
      "Custom session lengths",
      "Unlimited history",
      "Personal routines",
      "Progress insights",
    ],
    cta: "Try Pro demo",
    badge: "Recommended",
  },
  {
    id: "team",
    name: "Team",
    tagline: "For teams that make time to focus.",
    monthlyPrice: 12,
    yearlyMonthly: 8,
    yearlyTotal: 96,
    features: [
      "Everything in Pro",
      "Shared focus rooms",
      "Team routines",
      "Team activity overview",
    ],
    cta: "Explore Team demo",
  },
];

export function getPrice(plan: Plan, billing: BillingPeriod) {
  if (plan.id === "free")
    return { display: "$0", sub: "forever", total: null as string | null };
  if (billing === "monthly")
    return {
      display: `$${plan.monthlyPrice}`,
      sub: plan.id === "team" ? "/user/month" : "/month",
      total: null,
    };
  return {
    display: `$${plan.yearlyMonthly}`,
    sub: plan.id === "team" ? "/user/month" : "/month",
    total: `billed $${plan.yearlyTotal}${plan.id === "team" ? " per user" : ""} yearly`,
  };
}
