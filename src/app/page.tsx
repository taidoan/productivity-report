'use client';
import DarkModeToggle from "@/components/DarkModeToggle";
import KSRSForm from "@/components/KSRSForm";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Roboto_Flex } from 'next/font/google';
import { Oswald } from "next/font/google";
import { ServiceSummary } from "@/types";

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto', 
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const handleFormSubmit = (data: [number | null, number, number, boolean, string, string, ServiceSummary]) => {
  console.log('Sales:', data[0]);
  console.log('Late Target:', data[1]);
  console.log('Prep Target:', data[2]);
  console.log('Food Lift:', data[3]);
  const serviceSummary = data[6];
  console.log('Parsed Service Summary:', serviceSummary);
  console.log('Delivery Time:', serviceSummary.averageDeliveryTime.total)
  console.log('Prep Time:', serviceSummary.averagePreparationTime.total)
  console.log('Wait Time:', serviceSummary.averageWaitTime.total)
  console.log('Total Orders:', serviceSummary.numberOfOrders)
  console.log('Manual Holds:', serviceSummary.chef1.manualHolds)
};

export default function Home() {
  return (
    <div className="w-10/12 lg:w-11/12 xl:w-3/5 mx-auto">
      <Header />
      <main className={`${roboto.variable} ${oswald.variable}`}>
        <KSRSForm onSubmit={handleFormSubmit} />
        <DarkModeToggle />
      </main>
      <Footer />
    </div>
  );
}
