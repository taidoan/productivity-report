import { useState } from "react";
import Table from "./Table";
import productivityData, { serviceData } from "./Parse";
import KSRSForm from "./Form";
import printResult from "./Print";

const Content = () => {
  const [parsedData, setParsedData] = useState(null);
  const [servicesData, setServiceData] = useState(null);
  const [takings, setTakings] = useState(null);
  const [lateTarget, setLateTarget] = useState(null);
  const [kitchenLate, setKitchenLate] = useState(null);
  const [deliveryLate, setDeliveryLate] = useState(null);
  const [activeTab, setActiveTab] = useState("dataEntry");
  const [submittedData, setSubmittedData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [foodLift, setFoodLift] = useState(null);
  const [prepTarget, setPrepTarget] = useState(null);
  const handleFormSubmit = ([
    copiedProdData,
    copiedServiceData,
    takings,
    lateTarget,
    kitchenLate,
    deliveryLate,
    foodLift,
    prepTarget,
  ]) => {
    const productivity = productivityData(copiedProdData);
    const service = serviceData(copiedServiceData);

    try {
      setParsedData(productivity);
      setServiceData(service);
      setTakings(takings);
      setLateTarget(lateTarget);
      setFoodLift(foodLift);
      setKitchenLate(kitchenLate);
      setDeliveryLate(deliveryLate);
      setActiveTab("result");
      setPrepTarget(prepTarget);
      setSubmittedData([
        copiedProdData,
        copiedServiceData,
        takings,
        lateTarget,
        kitchenLate,
        deliveryLate,
        foodLift,
        prepTarget,
      ]);
      setFormSubmitted(true);
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="container">
      <nav className="tab-nav">
        <button
          className={`tab ${activeTab === "dataEntry" ? "tab--active" : ""}`}
          onClick={() => setActiveTab("dataEntry")}
        >
          Data Entry
        </button>
        <button
          className={`tab ${activeTab === "result" ? "tab--active" : ""}`}
          onClick={() => {
            if (formSubmitted) {
              setActiveTab("result");
            }
          }}
          disabled={!formSubmitted}
        >
          Result
        </button>
        <button
          className="tab"
          onClick={() => {
            if (activeTab === "result") {
              printResult("printableArea");
            }
          }}
          disabled={activeTab !== "result"}
        >
          Print
        </button>
      </nav>
      <div className="content">
        {activeTab === "dataEntry" ? (
          <KSRSForm onSubmit={handleFormSubmit} initialData={submittedData} />
        ) : (
          <Table
            data={parsedData}
            service={servicesData}
            takings={takings}
            lateTarget={lateTarget}
            kitchenLate={kitchenLate}
            deliveryLate={deliveryLate}
            foodLift={foodLift}
            prepTarget={prepTarget}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
