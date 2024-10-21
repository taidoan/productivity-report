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
    setFormSubmitted(true);
    setActiveTab('result');
  };

  const [
    sales = null,
    salesTarget = null,
    lateTarget = 25,
    prepTarget = 8,
    foodLift = false,
    serviceSummary = {} as ServiceSummary, 
    productivityData = {} as ProductivityData,
    copiedServiceData = '',
    copiedProdData = '',
  ] = formData || [];

const baseClass = `text-grey-500 rounded-lg p-3 px-5 font-bold border-2 ease-in-out duration-300`;

const disabledClass = `bg-grey-50 text-grey-200 border-grey-100 dark:border-grey-500 dark:bg-grey-500 dark:text-grey-700`;

const enabledClass = `bg-gradient-to-t from-grey-100 to-grey-200 border-grey-200 dark:bg-gradient-to-t dark:from-grey-500 dark:to-grey-700 dark:text-grey-100 dark:border-grey-500 dark:shadow-inner`;

const hoverClass = `hover:bg-gradient-to-b hover:from-slate-700 hover:to-slate-600 hover:text-white hover:border-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 dark:hover:border-slate-500`;

const buttonClass = (isDisabled: boolean) =>
  `${baseClass} ${isDisabled ? disabledClass : `${enabledClass} ${hoverClass}`}`;

const buttonActiveClass = `
  ${baseClass}
  !text-white 
  !bg-gradient-to-t !from-primary-500 !to-primary-700 !border-primary-500 
  dark:!from-primary-700 dark:!to-primary-900 dark:!border-primary-700
`;



  return (
    <div className="w-10/12 lg:w-11/12 xl:w-3/5 mx-auto">
      <Header />
      <main className={`${roboto.variable} ${oswald.variable} rounded-2xl p-6 bg-gray-50 text-center shadow-lg dark:bg-grey-900`}>
        <div className="flex justify-center gap-x-4 mb-4">
          <button 
            className={`${activeTab === 'dataEntry' ? buttonActiveClass : buttonClass(false)}`} 
            onClick={() => setActiveTab('dataEntry')}
          >
            Data Entry
          </button>

          <button 
            className={`${activeTab === "result" ? buttonActiveClass : buttonClass(!formSubmitted)}`} 
            onClick={() => { if(formSubmitted) { setActiveTab('result') }}} 
            disabled={!formSubmitted}
          >
            Result
          </button>
          
          <button 
            className={`${buttonClass(activeTab !== 'result')}`} 
            disabled={activeTab !== 'result'}
          >
            Print
          </button>
        </div>
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
        </main>
        <DarkModeToggle />
      <Footer />
    </div>
  );
}
