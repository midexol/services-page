import Navigation from "@/components/Hero/navbar";
import ServicesPage from "@/components/Services/ServicesPage";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services - Web3Nova",
  description: "Web3 development, DApp design, smart contract auditing, and blockchain integration services by Web3Nova.",
};

export default function ServicesRoute() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navigation />
      <main className="flex-grow">
        <ServicesPage />
      </main>
      <Footer />
    </div>
  );
}
