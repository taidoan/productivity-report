import React, { useState } from "react";
import Table from "./Table";
import productivityData, { serviceData } from "./Parse";
import KSRSForm from "./Form";

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [servicesData, setServiceData] = useState(null);
  const [takings, setTakings] = useState(null);

  const handleFormSubmit = ([copiedProdData, copiedServiceData, takings]) => {
    const productivity = productivityData(copiedProdData);
    const service = serviceData(copiedServiceData);

    try {
      setParsedData(productivity);
      setServiceData(service);
      setTakings(takings);
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="App">
      <h1 className="title">Productivity Report Generator</h1>
      <p className="intro">
        This is a tool to generate a productivity report for your kitchens using
        data from KSRS.
      </p>
      <KSRSForm onSubmit={handleFormSubmit} />
      {parsedData && (
        <Table data={parsedData} service={servicesData} takings={takings} />
      )}
    </div>
  );
}

export default App;
