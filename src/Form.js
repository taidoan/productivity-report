import { useState, useEffect } from "react";

const KSRSForm = ({ onSubmit, initialData }) => {
  const [copiedProdData, setCopiedProdData] = useState("");
  const [copiedServiceData, setCopiedServiceData] = useState("");
  const [takings, setTakings] = useState("");
  const [lateTarget, setLateTarget] = useState(20);
  const [kitchenLate, setKitchenLate] = useState("");
  const [deliveryLate, setDeliveryLate] = useState("");
  const [foodLift, setFoodLift] = useState("");
  const [prepTarget, setPrepTarget] = useState("8");

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      const [
        initialCopiedProdData,
        initialCopiedServiceData,
        initialTakings,
        initialLateTarget,
        initialKitchenLate,
        initialDeliveryLate,
        initialFoodLift,
        initialPrepTarget,
      ] = initialData;
      setTakings(initialTakings);
      setCopiedProdData(initialCopiedProdData);
      setCopiedServiceData(initialCopiedServiceData);
      setLateTarget(initialLateTarget);
      setKitchenLate(!!initialKitchenLate); // Ensures it's a boolean
      setDeliveryLate(!!initialDeliveryLate); // Ensures it's a boolean
      setFoodLift(!!initialFoodLift);
      setPrepTarget(initialPrepTarget);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit([
      copiedProdData,
      copiedServiceData,
      takings,
      lateTarget,
      kitchenLate,
      deliveryLate,
      foodLift,
      prepTarget,
    ]);
    console.log(lateTarget);
  };

  return (
    <form onSubmit={handleSubmit} className="productivity-form">
      <p className="productivity-intro">
        Please enter your weekly sales and data <strong>copied directly</strong>{" "}
        and as it is from KSRS into the boxes below.
      </p>
      <fieldset className="fields">
        <label htmlFor="sales">
          Week Sales: <span className="optional">(Optional)</span>
        </label>
        <input
          type="number"
          value={takings}
          onChange={(e) => setTakings(e.target.value)}
          placeholder="0000"
          name="sales"
        />
        <label>
          Late Target: <span className="required">(*Required)</span>
        </label>
        <select
          value={lateTarget}
          onChange={(e) => setLateTarget(parseFloat(e.target.value, 10))}
        >
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
          <option value="30">30%</option>
        </select>
        <label>
          Prep Target: <span className="required">(*Required)</span>
        </label>
        <select
          value={prepTarget}
          onChange={(e) => setPrepTarget(parseFloat(e.target.value))}
        >
          <option value="2">2:00</option>
          <option value="3">3:00</option>
          <option value="4">4:00</option>
          <option value="5">5:00</option>
          <option value="6">6:00</option>
          <option value="7">7:00</option>
          <option value="8">8:00</option>
        </select>
      </fieldset>
      <fieldset>
        <label>
          Food Lift: <span className="required">(*Required)</span>
        </label>
        <input
          type="checkbox"
          checked={foodLift}
          onChange={(e) => setFoodLift(e.target.checked)}
        />
        <label>
          Kitchen Lates <span className="optional">(Optional)</span>
        </label>
        <input
          type="checkbox"
          checked={kitchenLate}
          onChange={(e) => setKitchenLate(e.target.checked)}
        />

        <label>
          Delivery Lates <span className="optional">(Optional)</span>
        </label>
        <input
          type="checkbox"
          checked={deliveryLate}
          onChange={(e) => setDeliveryLate(e.target.checked)}
        />
      </fieldset>
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
