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
      <p className="productivity-intro text-center">
        Please enter your weekly sales and data <strong>copied directly</strong>{" "}
        and as it is from KSRS into the boxes below.
      </p>
      <fieldset className="fields">
        <label for="sales" className="font-bold">
          Week Sales: <span className="font-normal text-sm">(Optional)</span>
        </label>
        <input
          type="number"
          value={takings}
          onChange={(e) => setTakings(e.target.value)}
          placeholder="0000"
          name="sales"
          id="sales"
          className="shadow appearance-none border rounded-xl w-full p-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="font-bold">
          Late Target: <span className="font-normal text-sm">(*Required)</span>
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
        <label className="font-bold">
          Prep Target: <span className="font-normal text-sm">(*Required)</span>
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
        <label className="font-bold">
          Food Lift: <span className="font-normal text-sm">(*Required)</span>
        </label>
        <input
          type="checkbox"
          checked={foodLift}
          onChange={(e) => setFoodLift(e.target.checked)}
        />
        <label className="font-bold">
          Kitchen Lates <span className="font-normal text-sm">(Optional)</span>
        </label>
        <input
          type="checkbox"
          checked={kitchenLate}
          onChange={(e) => setKitchenLate(e.target.checked)}
        />

        <label className="font-bold">
          Delivery Lates <span className="font-normal text-sm">(Optional)</span>
        </label>
        <input
          type="checkbox"
          checked={deliveryLate}
          onChange={(e) => setDeliveryLate(e.target.checked)}
        />
      </fieldset>
      <label className="font-bold">
        Productivity Data:{" "}
        <span className="font-normal text-sm">(*Required)</span>
      </label>
      <textarea
        value={copiedProdData}
        onChange={(e) => setCopiedProdData(e.target.value)}
        placeholder="Copy and paste productivity report here"
        rows="7"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label className="font-bold">
        Service Summary:{" "}
        <span className="font-normal text-sm">(*Required)</span>
      </label>
      <textarea
        value={copiedServiceData}
        onChange={(e) => setCopiedServiceData(e.target.value)}
        placeholder="Copy and paste the service summary report here"
        rows="13"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        className="font-semibold rounded-lg px-2 py-2 pl-4 pr-4  text-zinc-600 bg-zinc-300 hover:bg-emerald-600 ease-in-out duration-300 hover:text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default KSRSForm;
