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
    <div className="bg-zinc-50 rounded-2xl p-6 shadow-lg w-full">
      <nav className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center mb-6">
        <button
          className={`border font-semibold rounded-lg px-2 py-2 pl-4 pr-4  ${
            activeTab === "dataEntry"
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-zinc-500 border-2 text-zinc-500 bg-transparent hover:bg-slate-900 hover:border-slate-900 hover:text-white ease-in-out duration-300"
          }`}
          onClick={() => setActiveTab("dataEntry")}
        >
          Data Entry
        </button>
        <button
          className={`border font-semibold rounded-lg px-2 py-2 pl-4 pr-4  border-2 disabled:text-zinc-300 disabled:border-zinc-200 disabled:bg-transparent   ${
            activeTab === "result"
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-zinc-500 border-2 text-zinc-500 bg-transparent hover:bg-slate-900 hover:border-slate-900 hover:text-white ease-in-out duration-300  "
          }`}
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
          className="border font-semibold rounded-lg px-2 py-2 pl-4 pr-4 disabled:border-zinc-200 border-2 disabled:text-zinc-300 disabled:bg-transparent disabled:text-zinc-300 hover:bg-slate-900 hover:border-slate-900 hover:text-white border-zinc-500 text-zinc-500 ease-in-out duration-300"
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
      {activeTab === "dataEntry" ? (
        <p className="text-center mt-0 mb-6">
          Please set your targets, select optional information and enter data{" "}
          <strong>copied directly</strong> KSRS into the boxes below.
        </p>
      ) : (
        ""
      )}
      <div className="">
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
