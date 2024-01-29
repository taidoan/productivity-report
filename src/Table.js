import { formatTime, formatTimeNumber } from "./numberFunctions";
const Table = ({
  data,
  service,
  takings,
  lateTarget,
  kitchenLate,
  deliveryLate,
  foodLift,
  prepTarget,
}) => {
  return (
    <div
      className=" bg-zinc-100 rounded-xl p-6 printableArea w-full flex flex-col gap-y-4"
      id="printableArea"
    >
      <div className="text-center text-slate-800" id="resultHeading">
        <h1 className="font-sans tracking-tight uppercase font-extrabold text-4xl leading-tight">
          {data.Pub} Kitchen Report
        </h1>
        <p>{data.Range} </p>
        {takings && (
          <p>
            We've taken <strong>£{takings}</strong> in food sales this week.
          </p>
        )}
      </div>

      <table className="bg-white  w-full border border-slate-800 text-center border-collapse">
        <thead className="bg-slate-800 text-white font-bold">
          <tr>
            <th className="p-1.5">Name</th>
            <th className="p-1.5">Prep Time</th>
            <th className="p-1.5">Orders</th>
            <th className="p-1.5">Items</th>
            <th className="p-1.5">Late Orders</th>
            <th className="p-1.5">Late Percentage</th>
            <th className="p-1.5">Longest Order</th>
            <th className="p-1.5">Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID}>
              <td className="p-1.5 border border-slate-800">{item.Name}</td>
              <td
                className={`p-1.5 border border-slate-800 ${
                  item.Prep <= prepTarget
                    ? "bg-lime-500"
                    : item.Prep <= prepTarget + 1
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              >
                {formatTime(item.Prep)}
              </td>
              <td className="p-1.5 border border-slate-800">{item.Orders}</td>
              <td className="p-1.5 border border-slate-800">{item.Items}</td>
              <td className="p-1.5 border border-slate-800">{item.Late}</td>
              <td
                className={`p-1.5 border border-slate-800 ${
                  Math.round((item.Late / item.Orders) * 100) <= lateTarget
                    ? "bg-lime-500"
                    : Math.round((item.Late / item.Orders) * 100) <=
                      lateTarget + 4
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              >
                {Math.round((item.Late / item.Orders) * 100)}%
              </td>
              <td className="p-1.5 border border-slate-800">
                {formatTime(item.Longest)}
              </td>
              <td className="p-1.5 border border-slate-800">{item.Hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="bg-white  w-full border border-slate-800 text-center border-collapse">
        <thead className="bg-slate-800 text-white font-bold">
          <tr>
            <th className="p-1.5">Prep</th>
            <th className="p-1.5">Wait</th>
            <th className="p-1.5">Delivery</th>
            <th className="p-1.5">Orders</th>
            <th className="p-1.5">Lates</th>
            <th className="p-1.5">Items</th>
            <th className="p-1.5">Holds</th>
            {kitchenLate && <th className="p-1.5">Kitchen Lates</th>}
            {deliveryLate && <th className="p-1.5">Floor Lates</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={`p-1.5 border border-slate-800 ${
                service.Prep <= prepTarget
                  ? "bg-lime-500"
                  : service.Prep <= prepTarget + 1
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            >
              {service ? formatTimeNumber(service.Prep) : "-"}
            </td>
            <td
              className={`p-1.5 border border-slate-800 ${
                formatTimeNumber(service.Wait) < (foodLift ? "01:30" : "01:00")
                  ? "bg-lime-500"
                  : formatTimeNumber(service.Wait) <=
                    (foodLift ? "2:00" : "01:30")
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            >
              {service ? formatTimeNumber(service.Wait) : "-"}
            </td>
            <td
              className={`p-1.5 border border-slate-800 ${
                formatTimeNumber(service.Delivery) >= "10:00"
                  ? "bg-red-500"
                  : "bg-lime-500"
              }`}
            >
              {formatTimeNumber(service.Delivery)}
            </td>
            <td className="p-1.5 border border-slate-800">
              {service ? service.Orders : "-"}
            </td>

            <td
              className={`p-1.5 border border-slate-800 ${
                Math.round((service.Late / service.Orders) * 100) <= lateTarget
                  ? "bg-lime-500"
                  : Math.round((service.Late / service.Orders) * 100) <=
                    lateTarget + 4
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            >
              {service
                ? `${service.Late} (${(
                    (service.Late / service.Orders) *
                    100
                  ).toFixed(0)}%)`
                : "-"}
            </td>

            <td className="p-1.5 border border-slate-800">
              {service ? service.Items : "-"}
            </td>
            <td className="p-1.5 border border-slate-800">
              {service ? service.Holds : "-"}
            </td>
            {kitchenLate && (
              <td className="p-1.5 border border-slate-800">
                {service.ChefLates} (
                {service.Orders > 0
                  ? Math.floor((service.ChefLates / service.Orders) * 100)
                  : 0}
                %)
              </td>
            )}
            {deliveryLate && (
              <td className="p-1.5 border border-slate-800">
                {service.Late - service.ChefLates} (
                {(
                  ((service.Late - service.ChefLates) / service.Orders) *
                  100
                ).toFixed(0)}
                %)
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="flex flex-wrap gap-y-4 gap-x-10 justify-center">
        <span className="grow w-full text-center">
          {foodLift
            ? "The floor team need at least a minute and a half to take food out."
            : "The floor team need at least a minute to take food out."}
        </span>
        {prepTarget === 8 ? (
          <div className="flex flex-col">
            <span>
              <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>
              Under {prepTarget} mins prep
            </span>
            <span>
              <span className="bg-amber-500 inline-block w-3 h-3 mr-2"></span>
              Under {prepTarget + 1} mins prep
            </span>
            <span>
              <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over{" "}
              {prepTarget + 1} mins prep
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>
              <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>
              Under {prepTarget} mins prep
            </span>
            <span>
              <span className="bg-amber-500 inline-block w-3 h-3 mr-2"></span>
              Over {prepTarget} mins prep
            </span>
            <span>
              <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over{" "}
              {prepTarget + 1} mins prep
            </span>
          </div>
        )}
        {foodLift ? (
          <div className="flex flex-col">
            <span>
              <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>
              Under 1:30 min wait
            </span>
            <span>
              <span className="bg-amber-500 inline-block w-3 h-3 mr-2"></span>
              Under 2:00 min wait
            </span>
            <span>
              <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over
              2:00 min wait
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span>
              <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>
              Under 1:00 min wait
            </span>
            <span>
              <span className="bg-amber-500 inline-block w-3 h-3 mr-2"></span>
              Under 1:30 min wait
            </span>
            <span>
              <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over
              1:30 min wait
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <span>
            <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>Under
            10 mins delivery
          </span>
          <span>
            <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over
            10 mins delivery
          </span>
        </div>
        {lateTarget && (
          <div className="flex flex-col">
            <span>
              <span className="bg-lime-500 inline-block w-3 h-3 mr-2"></span>{" "}
              Under {lateTarget}% late orders
            </span>
            <span>
              <span className="bg-amber-500 inline-block w-3 h-3 mr-2"></span>
              Over {lateTarget}% late orders
            </span>
            <span>
              <span className="bg-red-500 inline-block w-3 h-3 mr-2"></span>Over{" "}
              {lateTarget + 5}% late orders
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
