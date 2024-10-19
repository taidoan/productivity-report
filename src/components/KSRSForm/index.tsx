'use client';
import { useState } from "react";
import { ServiceSummary } from "@/types";
import { convertToMinutesSeconds } from "@/utilities/timeConverter";

type KSRSFormProps = {
  onSubmit: (data: [number | null, number, number, boolean, string, string, ServiceSummary]) => void;
};

const KSRSForm = ({ onSubmit }: KSRSFormProps) => {
  const [sales, setSales] = useState<number | null>(null);
  const [lateTarget, setLateTarget] = useState<number>(25);
  const [prepTarget, setPrepTarget] = useState<number>(8);
  const [lift, setLift] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState<string>('');
  const [prodData, setProdData] = useState<string>('');

  const handleSalesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSales(value ? Number(value) : null);
  };

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
    setServiceData(event.target.value);
  };

  const handleProdChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProdData(event.target.value);
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
        } 
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedServiceSummary = parseServiceSummaryData(serviceData);
    onSubmit([sales, lateTarget, prepTarget, lift, serviceData, prodData, parsedServiceSummary]);
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>Week Sales:</label>
    <input 
      type="number" 
      value={sales !== null ? sales : ''} 
      onChange={handleSalesChange} 
    />

    <label>Lates Target:</label>
    <select value={lateTarget} onChange={handleLatesChange}>
      <option value={10}>10%</option>
      <option value={15}>15%</option>
      <option value={20}>20%</option>
      <option value={25}>25%</option>
      <option value={30}>30%</option>
    </select>

    <label>Prep Target:</label>
    <select value={prepTarget} onChange={handlePrepChange}>
      <option value={6}>6:00</option>
      <option value={7}>7:00</option>
      <option value={8}>8:00</option>
      <option value={9}>9:00</option>
    </select>

    <label>Food Lift:</label>
    <input 
      type="checkbox" 
      checked={lift} 
      onChange={handleLiftChange}
    />

    <label>Service Summary Data:</label>
    <textarea name="" id="" value={serviceData} onChange={handleServiceChange}></textarea>

    <label htmlFor="">Productivity Data:</label>
    <textarea name="" id="" value={prodData} onChange={handleProdChange}></textarea>        

    <button type="submit">Submit</button>
  </form>
  );
};

export default KSRSForm;
