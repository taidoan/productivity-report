'use client';
import { useState } from "react";

type ServiceSummary = {
  averageDeliveryTime: {
    starters: number;
    mains: number;
    desserts: number;
    total: number;
  };
  averageWaitTime: {
    starters: number;
    mains: number;
    desserts: number;
    total: number;
  };
  averagePreparationTime: {
    starters: number;
    mains: number;
    desserts: number;
    total: number;
  };
  numberOfOrders: number;
  numberOfLateOrders: {
    starters: { count: number; percentage: number };
    mains: { count: number; percentage: number };
    desserts: { count: number; percentage: number };
  };
  numberOfItems: number;
  numberOfLateItems: {
    starters: { count: number; percentage: number };
    mains: { count: number; percentage: number };
    desserts: { count: number; percentage: number };
  };
  checksOnTime: {
    onTime: number;
    early: number;
    late: number;
  };

    chef1: {
      averagePrepTime: number;
      numberOfOrders: number;
      ordersLate: { count: number; percentage: number };
      numberOfItems: number;
      itemsLate: { count: number; percentage: number };
      ordersBumped: number;
      manualHolds: number;
    };
    dispense: {
      averagePrepTime: number;
      numberOfOrders: number;
      ordersLate: { count: number; percentage: number };
      numberOfItems: number;
      itemsLate: { count: number; percentage: number };
      ordersBumped: number;
      manualHolds: number;
    };

};

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
    const lines = data.split('\n').map(line => line.trim());
    
    const summary: ServiceSummary = {
      averageDeliveryTime: { starters: 0, mains: 0, desserts: 0, total: 0 },
      averageWaitTime: { starters: 0, mains: 0, desserts: 0, total: 0 },
      averagePreparationTime: { starters: 0, mains: 0, desserts: 0, total: 0 },
      numberOfOrders: 0,
      numberOfLateOrders: { starters: { count: 0, percentage: 0 }, mains: { count: 0, percentage: 0 }, desserts: { count: 0, percentage: 0 } },
      numberOfItems: 0,
      numberOfLateItems: { starters: { count: 0, percentage: 0 }, mains: { count: 0, percentage: 0 }, desserts: { count: 0, percentage: 0 } },
      checksOnTime: { onTime: 0, early: 0, late: 0 },
      chef1: { averagePrepTime: 0, numberOfOrders: 0, ordersLate: { count: 0, percentage: 0 }, numberOfItems: 0, itemsLate: { count: 0, percentage: 0 }, ordersBumped: 0, manualHolds: 0 },
      dispense: { averagePrepTime: 0, numberOfOrders: 0, ordersLate: { count: 0, percentage: 0 }, numberOfItems: 0, itemsLate: { count: 0, percentage: 0 }, ordersBumped: 0, manualHolds: 0 },
    };
  
    // Parse the lines to fill the summary object
    for (const line of lines) {
      const [key, ...values] = line.split('\t').map(v => v.trim());
  
      switch (key) {
        case 'Average Delivery Time':
          summary.averageDeliveryTime.starters = parseFloat(values[0]);
          summary.averageDeliveryTime.mains = parseFloat(values[1]);
          summary.averageDeliveryTime.desserts = parseFloat(values[2]);
          summary.averageDeliveryTime.total = parseFloat(values[3]);
          break;
  
        case 'Average Wait Time':
          summary.averageWaitTime.starters = parseFloat(values[0]);
          summary.averageWaitTime.mains = parseFloat(values[1]);
          summary.averageWaitTime.desserts = parseFloat(values[2]);
          summary.averageWaitTime.total = parseFloat(values[3]);
          break;
  
        case 'Average Preparation Time':
          summary.averagePreparationTime.starters = parseFloat(values[0]);
          summary.averagePreparationTime.mains = parseFloat(values[1]);
          summary.averagePreparationTime.desserts = parseFloat(values[2]);
          summary.averagePreparationTime.total = parseFloat(values[3]);
          break;
  
        case 'No. of Orders':
          summary.numberOfOrders = parseInt(values[3], 10);
          break;
  
        case 'No. of Late Orders':
          summary.numberOfLateOrders.starters.count = parseInt(values[0], 10);
          summary.numberOfLateOrders.starters.percentage = parseFloat(values[1]);
          summary.numberOfLateOrders.mains.count = parseInt(values[2], 10);
          summary.numberOfLateOrders.mains.percentage = parseFloat(values[3]);
          summary.numberOfLateOrders.desserts.count = parseInt(values[4], 10);
          summary.numberOfLateOrders.desserts.percentage = parseFloat(values[5]);
          break;
  
        case 'No. of Items':
          summary.numberOfItems = parseInt(values[3], 10);
          break;
  
        case 'No. of Late Items':
          summary.numberOfLateItems.starters.count = parseInt(values[0], 10);
          summary.numberOfLateItems.starters.percentage = parseFloat(values[1]);
          summary.numberOfLateItems.mains.count = parseInt(values[2], 10);
          summary.numberOfLateItems.mains.percentage = parseFloat(values[3]);
          summary.numberOfLateItems.desserts.count = parseInt(values[4], 10);
          summary.numberOfLateItems.desserts.percentage = parseFloat(values[5]);
          break;
  
        case 'Table/Meal Checks On-Time':
          summary.checksOnTime.onTime = parseInt(values[0], 10);
          summary.checksOnTime.early = parseInt(values[1], 10);
          summary.checksOnTime.late = parseInt(values[2], 10);
          break;
  
        case 'CHEF1':
          summary.chef1.averagePrepTime = parseFloat(values[0]);
          summary.chef1.numberOfOrders = parseInt(values[1], 10);
          summary.chef1.ordersLate.count = parseInt(values[2], 10);
          summary.chef1.ordersLate.percentage = parseFloat(values[3]);
          summary.chef1.numberOfItems = parseInt(values[4], 10);
          summary.chef1.itemsLate.count = parseInt(values[5], 10);
          summary.chef1.itemsLate.percentage = parseFloat(values[6]);
          summary.chef1.ordersBumped = parseInt(values[7], 10);
          summary.chef1.manualHolds = parseInt(values[8], 10);
          break;
  
        case 'DISPENSE':
          summary.dispense.averagePrepTime = parseFloat(values[0]);
          summary.dispense.numberOfOrders = parseInt(values[1], 10);
          summary.dispense.ordersLate.count = parseInt(values[2], 10);
          summary.dispense.ordersLate.percentage = parseFloat(values[3]);
          summary.dispense.numberOfItems = parseInt(values[4], 10);
          summary.dispense.itemsLate.count = parseInt(values[5], 10);
          summary.dispense.itemsLate.percentage = parseFloat(values[6]);
          summary.dispense.ordersBumped = parseInt(values[7], 10);
          summary.dispense.manualHolds = parseInt(values[8], 10);
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
