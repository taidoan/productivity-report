export type ServiceSummary = {
  siteName: string;
  dateRange: string;
  averageDeliveryTime: {
    starters: string;
    mains: string;
    desserts: string;
    total: string;
  };
  averageWaitTime: {
    starters: string;
    mains: string;
    desserts: string;
    total: string;
  };
  averagePreparationTime: {
    starters: string;
    mains: string;
    desserts: string;
    total: string;
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
    averagePrepTime: string;
    numberOfOrders: number;
    ordersLate: { count: number; percentage: number };
    numberOfItems: number;
    itemsLate: { count: number; percentage: number };
    ordersBumped: number;
    manualHolds: number;
  };
  dispense: {
    averagePrepTime: string;
    numberOfOrders: number;
    ordersLate: { count: number; percentage: number };
    numberOfItems: number;
    itemsLate: { count: number; percentage: number };
    ordersBumped: number;
    manualHolds: number;
  };
};
