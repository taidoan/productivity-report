import { useState, useEffect } from "react";

const KSRSForm = ({ onSubmit, initialData }) => {
  const [copiedProdData, setCopiedProdData] = useState("");
  const [copiedServiceData, setCopiedServiceData] = useState("");
  const [takings, setTakings] = useState("");

  useEffect(() => {
    if (initialData && Array.isArray(initialData) && initialData.length === 3) {
      const [initialCopiedProdData, initialCopiedServiceData, initialTakings] =
        initialData;
      setTakings(initialTakings);
      setCopiedProdData(initialCopiedProdData);
      setCopiedServiceData(initialCopiedServiceData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit([copiedProdData, copiedServiceData, takings]);
  };

  return (
    <form onSubmit={handleSubmit} className="productivity-form">
      <p className="productivity-intro">
        Please enter your weekly sales and data <strong>copied directly</strong>{" "}
        and as it is from KSRS into the boxes below.
      </p>
      <label>
        Week Sales: <span className="optional">(Optional)</span>
      </label>
      <input
        type="number"
        value={takings}
        onChange={(e) => setTakings(e.target.value)}
        placeholder="0000"
      />
      <label>
        Productivity Data: <span className="required">(*Required)</span>
      </label>
      <textarea
        value={copiedProdData}
        onChange={(e) => setCopiedProdData(e.target.value)}
        placeholder="Copy and paste productivity report here"
        rows="7"
        required
      />
      <label>
        Service Summary: <span className="required">(*Required)</span>
      </label>
      <textarea
        value={copiedServiceData}
        onChange={(e) => setCopiedServiceData(e.target.value)}
        placeholder="Copy and paste the service summary report here"
        rows="13"
        required
      />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default KSRSForm;
