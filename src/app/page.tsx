import { ClientPage } from "@/components/ClientPage";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
export default function Page() {
  return <ClientPage features={<Features />} testimonials={<Testimonials />} />;
}
