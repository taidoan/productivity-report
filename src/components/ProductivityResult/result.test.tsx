import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceSummary, ProductivityData } from "@/types";
import '@testing-library/jest-dom';
import ProductivityResult from './'; 

const mockServiceSummary: ServiceSummary = {
  siteName: "Test Kitchen Kitchen Report",
  dateRange: "October 1, 2024 - October 21, 2024",
  averageDeliveryTime: {
    starters: "10 min",
    mains: "20 min",
    desserts: "15 min",
    total: "45 min",
  },
  averageWaitTime: {
    starters: "5 min",
    mains: "10 min",
    desserts: "8 min",
    total: "23 min",
  },
  averagePreparationTime: {
    starters: "8 min",
    mains: "12 min",
    desserts: "6 min",
    total: "26 min",
  },
  numberOfOrders: 150,
  numberOfLateOrders: {
    starters: { count: 5, percentage: 3.33 },
    mains: { count: 10, percentage: 6.67 },
    desserts: { count: 3, percentage: 2.00 },
    total: { count: 18, percentage: 12.00 },
  },
  numberOfItems: 400,
  numberOfLateItems: {
    starters: { count: 7, percentage: 4.67 },
    mains: { count: 15, percentage: 10.00 },
    desserts: { count: 4, percentage: 2.67 },
    total: { count: 26, percentage: 6.50 },
  },
  checksOnTime: {
    onTime: 120,
    early: 20,
    late: 10,
  },
  chef1: {
    averagePrepTime: "10 min",
    numberOfOrders: 75,
    ordersLate: { count: 5, percentage: 6.67 },
    numberOfItems: 200,
    itemsLate: { count: 10, percentage: 5.00 },
    ordersBumped: 2,
    manualHolds: 1,
  },
  dispense: {
    averagePrepTime: "12 min",
    numberOfOrders: 75,
    ordersLate: { count: 8, percentage: 10.67 },
    numberOfItems: 200,
    itemsLate: { count: 5, percentage: 2.50 },
    ordersBumped: 1,
    manualHolds: 0,
  },
};

const mockProductivity: ProductivityData = {
  range: 'Last week',
  staffMembers: [
    {
      name: 'John Doe',
      prepTime: '06:00',
      orders: 20,
      items: 50,
      lateOrders: 3,
      lateOrdersPercentage: 15,
      longestOrder: '00:12',
      hoursWorked: '8',
    },
    // Add more staff member mocks if needed
  ],
};

describe('ProductivityResult Component', () => {
  test('renders without crashing', () => {
    render(
      <ProductivityResult
        sales={200}
        salesTarget={250}
        lateTarget={10}
        prepTarget={9}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );

    expect(screen.getByText(/Test Kitchen Kitchen Report/i)).toBeInTheDocument();
    expect(screen.getByText(/£200/i)).toBeInTheDocument();
  });

  test('renders sales performance correctly', () => {
    render(
      <ProductivityResult
        sales={200}
        salesTarget={250}
        lateTarget={10}
        prepTarget={9}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );

    expect(screen.getByText(/We've taken/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
    expect(screen.getByText(/below the target of/i)).toBeInTheDocument();
  });

  test('does not render sales performance if sales are null', () => {
    render(
      <ProductivityResult
        sales={null}
        salesTarget={250}
        lateTarget={10}
        prepTarget={9}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );

    expect(screen.queryByText(/We&apos;ve taken/i)).not.toBeInTheDocument();
  });

  test('renders performance keys correctly', async () => {
    render(
      <ProductivityResult
        sales={200}
        salesTarget={250}
        lateTarget={10}
        prepTarget={9}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );
  
    const prepTimeKeys = await screen.findAllByText(/Prep Time/i);
    const waitTimeKeys = await screen.findAllByText(/Wait Time/i);
    const deliveryTimeKeys = await screen.findAllByText(/Delivery Time/i);
    const lateOrdersKeys = await screen.findAllByText(/Late Orders/i);
  
    expect(prepTimeKeys.length).toBeGreaterThan(0);
    expect(waitTimeKeys.length).toBeGreaterThan(0);
    expect(deliveryTimeKeys.length).toBeGreaterThan(0);
    expect(lateOrdersKeys.length).toBeGreaterThan(0);
  });

  test('calculates preparation time class correctly', () => {
    const { container, rerender } = render(
      <ProductivityResult
        sales={200}
        salesTarget={250}
        lateTarget={10}
        prepTarget={5}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );
  
    const prepTimeCell = container.querySelector('td[data-cell="Prep Time: "]');
    expect(prepTimeCell).toHaveClass('!bg-red-500');
  
    rerender(
      <ProductivityResult
        sales={200}
        salesTarget={250}
        lateTarget={10}
        prepTarget={9}
        foodLift={false}
        serviceSummary={mockServiceSummary}
        productivity={mockProductivity}
      />
    );
  
    const updatedPrepTimeCell = container.querySelector('td[data-cell="Prep Time: "]');
    expect(updatedPrepTimeCell).toHaveClass('!bg-lime-500');
  });
  
  
});
