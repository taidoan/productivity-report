import { useState } from "react";
import Table from "./Table";
import productivityData, { serviceData } from "./Parse";
import KSRSForm from "./Form";

const Content = () => {
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
    <div className="container">
      <nav className="tab-nav">
        <button className="tab tab--active">Data Entry</button>
        <button className="tab">Result</button>
      </nav>
      <div className="content">
        <KSRSForm onSubmit={handleFormSubmit} />
        {parsedData && (
          <Table data={parsedData} service={servicesData} takings={takings} />
        )}
      </div>
    </div>
  );
};

export default Content;
