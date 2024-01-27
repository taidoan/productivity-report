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
    <div className="report printableArea" id="printableArea">
      <h1>{data.Pub} Kitchen Report</h1>
      <p>{data.Range} </p>
      {takings && (
        <p>
          We've taken <strong>£{takings}</strong> in food sales this week.
        </p>
      )}

      <table className="productivity-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Prep Time</th>
            <th>Orders</th>
            <th>Items</th>
            <th>Late Orders</th>
            <th>Late Percentage</th>
            <th>Longest Order</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID}>
              <td>{item.Name}</td>
              <td
                style={{
                  backgroundColor:
                    item.Prep <= prepTarget
                      ? "lime"
                      : item.Prep <= prepTarget + 1
                      ? "orange"
                      : "red",
                }}
              >
                {formatTime(item.Prep)}
              </td>
              <td>{item.Orders}</td>
              <td>{item.Items}</td>
              <td>{item.Late}</td>
              <td
                style={{
                  backgroundColor:
                    Math.round((item.Late / item.Orders) * 100) <= lateTarget
                      ? "lime"
                      : Math.round((item.Late / item.Orders) * 100) <=
                        lateTarget + 4
                      ? "orange"
                      : "red",
                }}
              >
                {Math.round((item.Late / item.Orders) * 100)}%
              </td>
              <td>{formatTime(item.Longest)}</td>
              <td>{item.Hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="productivity-table">
        <thead>
          <tr>
            <th>Prep</th>
            <th>Wait</th>
            <th>Delivery</th>
            <th>Orders</th>
            <th>Lates</th>
            <th>Items</th>
            <th>Holds</th>
            {kitchenLate && <th>Kitchen Lates</th>}
            {deliveryLate && <th>Floor Lates</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor:
                  formatTimeNumber(service.Prep) <= "07:59"
                    ? "lime"
                    : formatTimeNumber(service.Prep) <= "08:59"
                    ? "orange"
                    : "red",
              }}
            >
              {service ? formatTimeNumber(service.Prep) : "-"}
            </td>
            <td
              style={{
                backgroundColor:
                  formatTimeNumber(service.Wait) <
                  (foodLift ? "01:30" : "01:00")
                    ? "lime"
                    : formatTimeNumber(service.Wait) <=
                      (foodLift ? "2:00" : "01:30")
                    ? "orange"
                    : "red",
              }}
            >
              {service ? formatTimeNumber(service.Wait) : "-"}
            </td>
            <td
              style={{
                backgroundColor:
                  formatTimeNumber(service.Delivery) >= "10:00"
                    ? "red"
                    : "lime",
              }}
            >
              {formatTimeNumber(service.Delivery)}
            </td>
            <td>{service ? service.Orders : "-"}</td>

            <td
              style={{
                backgroundColor:
                  Math.round((service.Late / service.Orders) * 100) <=
                  lateTarget
                    ? "lime"
                    : Math.round((service.Late / service.Orders) * 100) <=
                      lateTarget + 4
                    ? "orange"
                    : "red",
              }}
            >
              {service
                ? `${service.Late} (${(
                    (service.Late / service.Orders) *
                    100
                  ).toFixed(0)}%)`
                : "-"}
            </td>

            <td>{service ? service.Items : "-"}</td>
            <td>{service ? service.Holds : "-"}</td>
            {kitchenLate && (
              <td>
                {service.ChefLates} (
                {service.Orders > 0
                  ? Math.floor((service.ChefLates / service.Orders) * 100)
                  : 0}
                %)
              </td>
            )}
            {deliveryLate && (
              <td>
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

      <div className="productivity-key">
        <span className="productivity-comment">
          {foodLift
            ? "The floor team need at least a minute and a half to take food out."
            : "The floor team need at least a minute to take food out."}
        </span>
        {prepTarget === 8 ? (
          <div className="productivity-prep">
            <span className="green">Under {prepTarget} mins prep</span>
            <span className="orange">Under {prepTarget + 1} mins prep</span>
            <span className="red">Over {prepTarget + 1} mins prep</span>
          </div>
        ) : (
          <div className="productivity-prep">
            <span className="green">Under {prepTarget} mins prep</span>
            <span className="orange">Over {prepTarget} mins prep</span>
            <span className="red">Over {prepTarget + 1} mins prep</span>
          </div>
        )}
        {foodLift ? (
          <div className="productivity-wait">
            <span className="green">Under 1:30 min wait</span>
            <span className="orange">Under 2:00 min wait</span>
            <span className="red">Over 2:00 min wait</span>
          </div>
        ) : (
          <div className="productivity-wait">
            <span className="green">Under 1:00 min wait</span>
            <span className="orange">Under 1:30 min wait</span>
            <span className="red">Over 1:30 min wait</span>
          </div>
        )}
        <div className="productivity-delivery">
          <span className="green">Under 10 mins delivery</span>
          <span className="red">Over 10 mins delivery</span>
        </div>
        {lateTarget && (
          <div className="productivity-lates">
            <span className="green">Under {lateTarget}% late orders</span>
            <span className="orange">Over {lateTarget}% late orders</span>
            <span className="red">Over {lateTarget + 5}% late orders</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
