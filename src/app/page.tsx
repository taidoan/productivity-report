'use client';
import DarkModeToggle from "@/components/DarkModeToggle";
import KSRSForm from "@/components/KSRSForm";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Roboto_Flex } from 'next/font/google';
import { Oswald } from "next/font/google";
import { ServiceSummary, ProductivityData } from "@/types";
import { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState<[number | null, number | null, number, number, boolean, ServiceSummary, ProductivityData, string, string] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dataEntry')
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  const handleFormSubmit = (data: [number | null, number | null, number, number, boolean, ServiceSummary, ProductivityData, string, string]) => {
    setFormData(data);
    setFormSubmitted(true)
    setActiveTab('result')
    console.log('Submitted Data:', data);
  };


  const [
    sales = null,
    salesTarget = null,
    lateTarget = 0,
    prepTarget = 0,
    foodLift = false,
    serviceSummary = {} as ServiceSummary, 
    productivityData = {} as ProductivityData,
    copiedServiceData = '',
    copiedProdData = '',
  ] = formData || [];

  return (
    <div className="w-10/12 lg:w-11/12 xl:w-3/5 mx-auto">
      <Header />
      <main className={`${roboto.variable} ${oswald.variable} rounded-xl p-6 bg-gray-50 text-center shadow-lg dark:bg-grey-900`}>
        <button onClick={() => setActiveTab('dataEntry')}>Data Entry</button>
        <button onClick={() => {if(formSubmitted) {setActiveTab('result')}}} disabled={!formSubmitted}>Result</button>
        <button disabled={activeTab !== 'result'}></button>
        {activeTab === "dataEntry" ? 
          <KSRSForm onSubmit={handleFormSubmit} initialValues={{sales, salesTarget, lateTarget, prepTarget, foodLift, copiedServiceData, copiedProdData} } /> 
          :  
          <ProductivityResult 
            sales={sales} 
            salesTarget={salesTarget}
            lateTarget={lateTarget} 
            prepTarget={prepTarget} 
            foodLift={foodLift} 
            serviceSummary={serviceSummary} 
            productivity={productivityData} 
          />
        }
        
        <DarkModeToggle />
      </main>
      <Footer />
    </div>
  );
}
