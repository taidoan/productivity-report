'use client';
import { useState, useEffect } from "react";
import { ServiceSummary, ProductivityData } from "@/types";
import { convertToHHMM, convertToMinutesSeconds } from "@/utilities/timeConverter";

type KSRSFormProps = {
  onSubmit: (data: [number | null, number | null, number, number, boolean, ServiceSummary, ProductivityData, string, string]) => void;
  initialValues: {
    sales: number | null;
    salesTarget: number | null;
    lateTarget: number;
    prepTarget: number;
    foodLift: boolean;
    copiedServiceData: string;
    copiedProdData: string;
  }
};

const KSRSForm = ({ onSubmit, initialValues}: KSRSFormProps) => {
  const [sales, setSales] = useState<number | null>(null);
  const [salesTarget, setSalesTarget] = useState<number | null>(null)
  const [lateTarget, setLateTarget] = useState<number>(25);
  const [prepTarget, setPrepTarget] = useState<number>(8);
  const [lift, setLift] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<string>('');
  const [prodData, setProdData] = useState<string>('');
  const [copiedServiceData, setCopiedServiceData] = useState<string>('');
  const [copiedProdData, setCopiedProdData] = useState<string>('');
  useEffect(() => {
    if (initialValues) {
      setSales(initialValues.sales);
      setSalesTarget(initialValues.salesTarget);
      setLateTarget(initialValues.lateTarget);
      setPrepTarget(initialValues.prepTarget);
      setLift(initialValues.foodLift);
      setServiceData(initialValues.copiedServiceData);
      setProdData(initialValues.copiedProdData);
      setCopiedServiceData(initialValues.copiedServiceData);
      setCopiedProdData(initialValues.copiedProdData);
    }
  }, [initialValues]); 
  
  const handleSalesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSales(value ? Number(value) : null);
  };

  const handleSalesTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSalesTarget(value ? Number(value) : null)
  }

  const handleLatesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLateTarget(Number(event.target.value));
  };

  const handlePrepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrepTarget(Number(event.target.value));
  };

  const handleLiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLift(event.target.checked);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCopiedServiceData(value);
    setServiceData(value);
  };
  
  const handleProdChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCopiedProdData(value);
    setProdData(value);
  };

  const parseServiceSummaryData = (data: string): ServiceSummary => {
    const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
    const firstLine = lines[0];
    const firstPeriodIndex = firstLine.indexOf(".");
    const siteName = firstLine.substring(0, firstPeriodIndex).trim();
    const cleanSiteName = siteName.replace(/\*\*(.*?)\*\*/, '$1').trim();
    const range = firstLine.substring(firstPeriodIndex + 1).trim();

    const site = cleanSiteName || firstLine.trim();
    lines.shift(); 
    
    const summary: ServiceSummary = {
      siteName: site,
      dateRange: range,
      averageDeliveryTime: { 
        starters: '0', 
        mains: '0', 
        desserts: '0', 
        total: '0' 
      },
      averageWaitTime: { 
        starters: '0', 
        mains: '0', 
        desserts: '0', 
        total: '0' 
      },
      averagePreparationTime: { 
        starters: '0', 
        mains: '0', 
        desserts: '0', 
        total: '0' 
      },
      numberOfOrders: 0,
      numberOfLateOrders: { 
        starters: { 
          count: 0, 
          percentage: 0 
        }, 
        mains: { 
          count: 0, 
          percentage: 0 
        }, 
        desserts: { 
          count: 0, 
          percentage: 0 
        },
        total: {
          count: 0,
          percentage: 0
        },
      },
      numberOfItems: 0,
      numberOfLateItems: { 
        starters: { 
          count: 0, 
          percentage: 0 
        }, 
        mains: { 
          count: 0, 
          percentage: 0 
        }, 
        desserts: { 
          count: 0, 
          percentage: 0 
        },
        total: {
          count: 0,
          percentage: 0,
        }
      },
      checksOnTime: { 
        onTime: 0, 
        early: 0, 
        late: 0 
      },
      chef1: { 
        averagePrepTime: '0', 
        numberOfOrders: 0, 
        ordersLate: 
          { 
            count: 0, 
            percentage: 0 
          }, 
        numberOfItems: 0, 
        itemsLate: 
          { 
            count: 0, 
            percentage: 0 
          }, 
        ordersBumped: 0, 
        manualHolds: 0 
      },
      dispense: { 
        averagePrepTime: '0', 
        numberOfOrders: 0, 
        ordersLate: { 
          count: 0, 
          percentage: 0 
        }, 
        numberOfItems: 0, 
        itemsLate: { 
          count: 0, 
          percentage: 0 
        }, 
        ordersBumped: 0, 
        manualHolds: 0 
      },
    };
  
    for (const line of lines) {
      const [key, ...values] = line.split('\t').map(v => v.trim());
  
      switch (key) {
        case 'Average Delivery Time':
          const Delivery = summary.averageDeliveryTime

          Delivery.starters = convertToMinutesSeconds(parseFloat(values[0]));
          Delivery.mains = convertToMinutesSeconds(parseFloat(values[1]));
          Delivery.desserts = convertToMinutesSeconds(parseFloat(values[2]));
          Delivery.total = convertToMinutesSeconds(parseFloat(values[3]));
          break;
  
        case 'Average Wait Time':
          const Wait = summary.averageWaitTime

          Wait.starters = convertToMinutesSeconds(parseFloat(values[0]));
          Wait.mains = convertToMinutesSeconds(parseFloat(values[1]));
          Wait.desserts = convertToMinutesSeconds(parseFloat(values[2]));
          Wait.total = convertToMinutesSeconds(parseFloat(values[3]));
          break;
  
        case 'Average Preparation Time':
          const Prep = summary.averagePreparationTime

          Prep.starters = convertToMinutesSeconds(parseFloat(values[0]));
          Prep.mains = convertToMinutesSeconds(parseFloat(values[1]));
          Prep.desserts = convertToMinutesSeconds(parseFloat(values[2]));
          Prep.total = convertToMinutesSeconds(parseFloat(values[3]));
          break;
  
        case 'No. of Orders':
          summary.numberOfOrders = parseInt(values[3], 10);
          break;
  
        case 'No. of Late Orders':
          const Orders = summary.numberOfOrders

          const Starters = summary.numberOfLateOrders.starters
          Starters.count = parseInt(values[0], 10);
          Starters.percentage = Math.round((Starters.count / Orders) * 100)

          const Mains = summary.numberOfLateOrders.mains
          Mains.count = parseInt(values[1], 10);
          Mains.percentage = Math.round((Mains.count / Orders) * 100)

          const Desserts = summary.numberOfLateOrders.desserts
          Desserts.count = parseInt(values[2], 10);
          Desserts.percentage = Math.round((Desserts.count / Orders) * 100)

          summary.numberOfLateOrders.total.count = parseInt(values[3], 10) 
          summary.numberOfLateOrders.total.percentage = Math.round((summary.numberOfLateOrders.total.count / Orders) * 100)
          break;
  
        case 'No. of Items':
          summary.numberOfItems = parseInt(values[3], 10);
          break;
  
        case 'No. of Late Items':
          const Items = summary.numberOfItems

          const StarterItems = summary.numberOfLateItems.starters
          StarterItems.count = parseInt(values[0], 10);
          StarterItems.percentage = Math.round((StarterItems.count / Items) * 100)

          const MainsItems = summary.numberOfLateItems.mains
          MainsItems.count = parseInt(values[1], 10);
          MainsItems.percentage = Math.round((MainsItems.count / Items) * 100)

          const DessertItems = summary.numberOfLateItems.desserts
          DessertItems.count = parseInt(values[2], 10);
          DessertItems.percentage = Math.round((DessertItems.count / Items) * 100)

          summary.numberOfLateItems.total.count = parseInt(values[3], 10)
          summary.numberOfLateItems.total.percentage = Math.round((summary.numberOfLateItems.total.count / Items) * 100)

          break;
  
        case 'Table/Meal Checks On-Time':
          summary.checksOnTime.onTime = parseInt(values[0], 10);
          summary.checksOnTime.early = parseInt(values[1], 10);
          summary.checksOnTime.late = parseInt(values[2], 10);
          break;
  
        case 'CHEF1':
          const Chef = summary.chef1

          Chef.averagePrepTime = convertToMinutesSeconds(parseFloat(values[0]));
          Chef.numberOfOrders = parseInt(values[1], 10);
          Chef.ordersLate.count = parseInt(values[2], 10);
          Chef.ordersLate.percentage = Math.round((Chef.ordersLate.count / Chef.numberOfOrders) * 100);

          Chef.numberOfItems = parseInt(values[3], 10);
          Chef.itemsLate.count = parseInt(values[4], 10);
          Chef.itemsLate.percentage = Math.round((Chef.itemsLate.count / Chef.numberOfItems) * 100);

          Chef.ordersBumped = parseInt(values[5], 10);
          Chef.manualHolds = parseInt(values[6], 10);
          break;
  
        case 'DISPENSE':
          const Dispense = summary.dispense

          Dispense.averagePrepTime = convertToMinutesSeconds(parseFloat(values[0]));
          Dispense.numberOfOrders = parseInt(values[1], 10);
          Dispense.ordersLate.count = parseInt(values[2], 10);
          Dispense.ordersLate.percentage = Math.round((Dispense.ordersLate.count / Dispense.numberOfOrders) * 100)
          Dispense.numberOfItems = parseInt(values[3], 10);
          Dispense.itemsLate.count = parseInt(values[4], 10);
          Dispense.itemsLate.percentage = Math.round((Dispense.itemsLate.count / Dispense.numberOfItems) * 100)
          Dispense.ordersBumped = parseInt(values[5], 10);
          Dispense.manualHolds = parseInt(values[6], 10);
          break;
  
        default:
          break;
      }
    }
  
    return summary;
  };

  const parseProductivityData = (data: string): ProductivityData => {
    const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');

    const firstLine = lines[0];
    const firstPeriodIndex = firstLine.indexOf(".");
    const range = firstLine.substring(firstPeriodIndex + 1).trim();

    lines.shift()
    lines.shift()

    const productivity: ProductivityData = {
      range: range,
      staffMembers: []
    }
    
    for (const line of lines) {
      const [station, name, avgTime, noOrders, noItems, ordersLate, longestOrder, hoursWorked] = line.split('\t').map(v => v.trim());

      if (station && name) {
        const lateOrdersCount = parseInt(ordersLate, 10);
        const totalOrders = parseInt(noOrders, 10);
  
        productivity.staffMembers.push({
          name,
          prepTime: convertToMinutesSeconds(avgTime),
          orders: totalOrders,
          items: parseInt(noItems, 10),
          lateOrders: lateOrdersCount,
          lateOrdersPercentage: (totalOrders > 0) ? Math.round((lateOrdersCount / totalOrders) * 100) : 0,
          longestOrder: convertToMinutesSeconds(longestOrder),
          hoursWorked: convertToHHMM(hoursWorked),
        });
      }
    }
  
    return productivity;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedServiceSummary = parseServiceSummaryData(serviceData);
    const parsedProductivityData = parseProductivityData(prodData)
    onSubmit([sales, salesTarget, lateTarget, prepTarget, lift, parsedServiceSummary, parsedProductivityData, copiedServiceData, copiedProdData]);
    console.log(copiedServiceData)
    console.log(copiedProdData)
  };

  const formFieldClass = `rounded-lg bg-grey-100 p-4 px-4 grow flex flex-col gap-2 gap-y-3 dark:bg-grey-700`
  const labelClass = `font-bold leading-4 content-center text-left`
  const fieldClass = `rounded-lg p-3 py-3 shadow-md text-grey-600 dark:bg-grey-900 dark:shadow-none dark:text-grey-200 placeholder:text-grey-300 dark:placeholder:text-grey-400 focus:outline-2 focus:outline-primary-600 focus:ring-inset focus:outline-none focus:shadow-none focus:outline-offset-0 `

  return (
    <div className={``}>
        <p className="text-center mt-0 mb-4">
          Please set your targets, select optional information and enter data{" "}
          <strong>copied directly</strong> KSRS into the boxes below.
        </p>
      <form onSubmit={handleSubmit} className={`flex flex-wrap gap-4 md:grid grid-cols-4`}>
      <div className={`${formFieldClass} col-span-2`}>
        <label htmlFor="salesTarget" className={`${labelClass}`}>Sales Forecast: <span className="text-sm font-normal text-grey-400">(Optional)</span></label>
        <input 
          type="number"
          id="salesTarget"
          value={salesTarget !== null ? salesTarget : ''}
          onChange={handleSalesTargetChange} 
          className={`${fieldClass}`}
        />
      </div>

      <div className={`${formFieldClass} col-span-2`}>
        <label htmlFor="actualSales" className={`${labelClass}`}>Actual Sales: <span className="text-sm font-normal text-grey-400">(Optional)</span></label>
        <input 
          type="number"
          id="actualSales"
          value={sales !== null ? sales : ''} 
          onChange={handleSalesChange} 
          className={`${fieldClass}`}
        />
      </div>

      <div className={`flex flex-col gap-4 flex-wrap w-full md:flex-row md:col-span-4`}>
        <div className={`${formFieldClass} gap-x-3`}>
          <label htmlFor="latesTarget" className={`${labelClass}`}>Lates Target: <span className="text-sm font-normal text-grey-400">(Required<span className="text-red-600">*</span>)</span></label>
          <select value={lateTarget} id="latesTarget" onChange={handleLatesChange} className={`${fieldClass} grow`}>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
            <option value={20}>20%</option>
            <option value={25}>25%</option>
            <option value={30}>30%</option>
          </select>
        </div>

        <div className={`${formFieldClass}  gap-x-3`}>
          <label htmlFor="prepTarget" className={`${labelClass}`}>Prep Target: <span className="text-sm font-normal text-grey-400">(Required<span className="text-red-600">*</span>)</span></label>
          <select value={prepTarget} id="prepTarget" onChange={handlePrepChange} className={`${fieldClass} grow`}>
            <option value={6}>6:00</option>
            <option value={7}>7:00</option>
            <option value={8}>8:00</option>
            <option value={9}>9:00</option>
          </select>
        </div>

        <div className={`${formFieldClass} !flex-row gap-x-3 justify-center`}>
          <label htmlFor="foodLift" className={`${labelClass}`}>Food Lift: <span className="text-sm font-normal text-grey-400">(Optional)</span></label>
          <input 
            type="checkbox"
            id="foodLift"
            checked={lift} 
            onChange={handleLiftChange}
            className="accent-primary-600 focus:accent-primary-600"
          />
        </div>
      </div>

      <div className={`${formFieldClass} col-span-4`}>
        <label htmlFor="serviceSummaryData" className={`${labelClass}`}>Service Summary Data: <span className="text-sm font-normal text-grey-400">(Required<span className="text-red-600">*</span>)</span></label>
        <textarea id="serviceSummaryData" value={serviceData} onChange={handleServiceChange} rows={13} placeholder="Copy and paste the service summary report here" className={`${fieldClass}`}></textarea>
      </div>

      <div className={`${formFieldClass} col-span-4`}>
        <label htmlFor="prodData" className={`${labelClass}`}>Productivity Data: <span className="text-sm font-normal text-grey-400">(Required<span className="text-red-600">*</span>)</span></label>
        <textarea id="prodData" value={prodData} onChange={handleProdChange} placeholder="Copy and paste productivity report here" rows={6}className={`${fieldClass}`}></textarea>        
      </div>

      <button type="submit" className="font-bold rounded-lg px-5 py-3 text-grey-500 bg-grey-100 hover:bg-slate-600 ease-in-out duration-300 hover:text-white mx-auto block full-width col-span-4 my-2 dark:bg-grey-500 dark:text-grey-900 dark:hover:bg-primary-600 dark:hover:text-white">Submit</button>
    </form>
    </div>
  );
};

export default KSRSForm;
