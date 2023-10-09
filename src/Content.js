import { useState } from "react";
import Table from "./Table";
import productivityData, { serviceData } from "./Parse";
import KSRSForm from "./Form";

const Content = () => {
  const [parsedData, setParsedData] = useState(null);
  const [servicesData, setServiceData] = useState(null);
  const [takings, setTakings] = useState(null);
  const [activeTab, setActiveTab] = useState("dataEntry");
  const [submittedData, setSubmittedData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = ([copiedProdData, copiedServiceData, takings]) => {
    const productivity = productivityData(copiedProdData);
    const service = serviceData(copiedServiceData);

    try {
      setParsedData(productivity);
      setServiceData(service);
      setTakings(takings);
      setActiveTab("result");
      setSubmittedData([copiedProdData, copiedServiceData, takings]);
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
      </nav>
      <div className="content">
        {activeTab === "dataEntry" ? (
          <KSRSForm onSubmit={handleFormSubmit} initialData={submittedData} />
        ) : (
          <Table data={parsedData} service={servicesData} takings={takings} />
        )}
      </div>
    </div>
  );
};

export default Content;
