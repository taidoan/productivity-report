'use client';
import DarkModeToggle from "@/components/DarkModeToggle";
import KSRSForm from "@/components/KSRSForm";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Roboto_Flex } from 'next/font/google';
import { Oswald } from "next/font/google";
import { ServiceSummary, ProductivityData } from "@/types";
import { useState } from "react";
import ProductivityResult from "@/components/ProductivityResult";

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

export default function Home() {
  const [formData, setFormData] = useState<[number | null, number | null, number, number, boolean, ServiceSummary, ProductivityData] | null>(null);

  const handleFormSubmit = (data: [number | null, number | null, number, number, boolean, ServiceSummary, ProductivityData]) => {
    setFormData(data);
    console.log('Submitted Data:', data);
  };

  const [
    sales = null,
    salesTarget = null,
    lateTarget = 0,
    prepTarget = 0,
    foodLift = false,
    serviceSummary = null,
    productivityData = null
  ] = formData || [];

  return (
    <div className="w-10/12 lg:w-11/12 xl:w-3/5 mx-auto">
      <Header />
      <main className={`${roboto.variable} ${oswald.variable}`}>
        <KSRSForm onSubmit={handleFormSubmit} />
        {formData && (
          <ProductivityResult 
            sales={sales} 
            salesTarget={salesTarget}
            lateTarget={lateTarget} 
            prepTarget={prepTarget} 
            foodLift={foodLift} 
            serviceSummary={serviceSummary} 
            productivity={productivityData} 
          />
        )}
        <DarkModeToggle />
      </main>
      <Footer />
    </div>
  );
}
