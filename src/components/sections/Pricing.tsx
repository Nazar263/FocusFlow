"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { plans, type BillingPeriod, getPrice } from "@/data/pricing";

export function Pricing({
  onSelectPlan,
}: {
  onSelectPlan: (planId: string, billing: BillingPeriod) => void;
}) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="pricing-premium scroll-mt-24">
      <Container>
        <div className="pricing-heading text-center max-w-[640px] mx-auto">
          <p className="eyebrow">03 / A LITTLE STRUCTURE, AT YOUR PACE</p>
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold tracking-tight text-[#18211C] leading-tight">
            Find a plan that fits your flow
          </h2>
          <p className="mt-3 text-[16px] md:text-[17px] text-[#556158]">
            Start free. Add more flexibility when you need it.
          </p>

          <div
            className="billing-toggle mt-7 inline-flex items-center gap-1 p-1 rounded-full bg-white border border-[#DDE3D7] shadow-sm"
            data-billing={billing}
          >
            {(["monthly", "yearly"] as BillingPeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setBilling(period)}
                aria-pressed={billing === period}
                className={`relative rounded-full px-5 py-2 text-[14px] font-semibold transition-colors duration-200 cursor-pointer ${
                  billing === period
                    ? "text-[#18211C]"
                    : "text-[#556158] hover:text-[#18211C]"
                }`}
              >
                <span className="relative capitalize flex items-center gap-2">
                  {period}
                  {period === "yearly" && (
                    <span className="inline-flex items-center rounded-full bg-[#18251E] text-white text-[11px] font-bold px-2 py-0.5">
                      Save 33%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch">
          {plans.map((plan) => {
            const price = getPrice(plan, billing);
            const isPro = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className={`pricing-card relative rounded-[24px] border bg-white flex flex-col p-6 md:p-7 transition-all ${
                  isPro
                    ? "pro-plan border-[#18251E] shadow-[0_16px_40px_rgba(24,37,28,0.12)] lg:scale-[1.02]"
                    : "border-[#DDE3D7] shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#18251E] text-white text-[12px] font-bold px-3 py-1 tracking-wide whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-[20px] font-bold text-[#18211C] tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-1 text-[13px] text-[#556158]">
                  {plan.tagline}
                </p>

                <div className="mt-5">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="price-value text-[36px] font-extrabold tracking-tight text-[#18211C] transition-opacity duration-200"
                      key={`${plan.id}-${billing}`}
                    >
                      {price.display}
                    </span>
                    <span className="price-sub text-[14px] font-medium text-[#556158]">
                      {price.sub}
                    </span>
                  </div>
                  {price.total ? (
                    <p className="text-[12px] text-[#556158] mt-1">
                      {price.total}
                    </p>
                  ) : plan.id !== "free" && billing === "yearly" ? (
                    <p className="text-[12px] text-[#556158] mt-1">&nbsp;</p>
                  ) : (
                    <p className="text-[12px] text-[#556158] mt-1">
                      {plan.id === "free" ? "No credit card required" : ""}
                    </p>
                  )}
                </div>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-[#18211C]"
                    >
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-[#C3EE78] inline-flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      <span className="text-[#18211C]">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPro ? "primary" : "secondary"}
                  className={`mt-6 w-full ${isPro ? "" : "!bg-white"}`}
                  onClick={() => onSelectPlan(plan.name, billing)}
                  aria-label={`${plan.cta} - ${plan.name} ${billing}`}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[13px] text-[#556158]">
          Concept pricing for this demo. No payments are collected.
        </p>
      </Container>
    </section>
  );
}
