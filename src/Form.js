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
      <div className="grid gap-x-4 gap-y-4 grid-cols-3">
        <div className="flex flex-col gap-y-2 rounded-xl p-4 bg-opacity-70 bg-zinc-200">
          <label for="sales" className="font-bold leading-4">
            Week Sales: <span className="font-normal text-sm">(Optional)</span>
          </label>
          <input
            type="number"
            value={takings}
            onChange={(e) => setTakings(e.target.value)}
            placeholder="0000"
            name="sales"
            id="sales"
            className="shadow appearance-none border rounded-lg w-full p-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col gap-y-2 rounded-xl p-4 bg-opacity-70 bg-zinc-200">
          <label className="font-bold leading-4">
            Late Target:{" "}
            <span className="font-normal text-sm">(*Required)</span>
          </label>
          <div className="inline-block relative w-full">
            <select
              value={lateTarget}
              onChange={(e) => setLateTarget(parseFloat(e.target.value, 10))}
              className="block appearance-none w-full bg-white border text-zinc-700  hover:border-gray-500 p-3 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class=" fill-zinc-400 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 rounded-xl p-4 bg-opacity-70 bg-zinc-200">
          <label className="font-bold leading-4">
            Prep Target:{" "}
            <span className="font-normal text-sm">(*Required)</span>
          </label>
          <div className="inline-block relative w-full">
            <select
              value={prepTarget}
              onChange={(e) => setPrepTarget(parseFloat(e.target.value))}
              className="block appearance-none w-full bg-white border text-zinc-700  hover:border-gray-500 p-3 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="2">2:00</option>
              <option value="3">3:00</option>
              <option value="4">4:00</option>
              <option value="5">5:00</option>
              <option value="6">6:00</option>
              <option value="7">7:00</option>
              <option value="8">8:00</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class=" fill-zinc-400 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-xl p-4 bg-opacity-70 bg-zinc-200 flex justify-between items-center">
          <label className="font-bold leading-4">
            Food Lift:
            <span className="font-normal text-sm ml-1">(*Required)</span>
          </label>
          <input
            type="checkbox"
            checked={foodLift}
            onChange={(e) => setFoodLift(e.target.checked)}
            className="ml-3"
          />
        </div>
        <div className="rounded-xl p-4 bg-opacity-70 bg-zinc-200 flex justify-between items-center">
          <label className="font-bold leading-4">
            Kitchen Lates:
            <span className="font-normal text-sm ml-1">(Optional)</span>
          </label>
          <input
            type="checkbox"
            checked={kitchenLate}
            onChange={(e) => setKitchenLate(e.target.checked)}
            className="ml-3"
          />
        </div>
        <div className="rounded-xl p-4 bg-opacity-70 bg-zinc-200 flex justify-between items-center">
          <label className="font-bold leading-4">
            Delivery Lates:
            <span className="font-normal text-sm ml-1">(Optional)</span>
          </label>
          <input
            type="checkbox"
            checked={deliveryLate}
            onChange={(e) => setDeliveryLate(e.target.checked)}
            className="ml-3"
          />
        </div>
        <div className="flex flex-col gap-y-2 col-span-3 rounded-xl p-4 pb-4 bg-opacity-70 bg-zinc-200">
          <label className="font-bold leading-4">
            Productivity Data:{" "}
            <span className="font-normal text-sm">(*Required)</span>
          </label>
          <textarea
            value={copiedProdData}
            onChange={(e) => setCopiedProdData(e.target.value)}
            placeholder="Copy and paste productivity report here"
            rows="6"
            required
            className="shadow appearance-none border rounded-lg w-full p-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col gap-y-2 col-span-3 rounded-xl p-4 pb-4 bg-opacity-70 bg-zinc-200">
          <label className="font-bold leading-4">
            Service Summary:{" "}
            <span className="font-normal text-sm">(*Required)</span>
          </label>
          <textarea
            value={copiedServiceData}
            onChange={(e) => setCopiedServiceData(e.target.value)}
            placeholder="Copy and paste the service summary report here"
            rows="13"
            required
            className="shadow appearance-none border rounded-lg w-full p-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <button
        className="font-semibold rounded-lg px-2 py-2 pl-4 pr-4  text-zinc-600 bg-zinc-200 hover:bg-blue-500 ease-in-out duration-300 hover:text-white mx-auto block mt-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default KSRSForm;
