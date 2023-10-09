import { formatTime, formatTimeNumber } from "./numberFunctions";
const Table = ({ data, service, takings }) => {
  return (
    <div className="report printableArea" id="printableArea">
      <h1>{data.Pub} Kitchen Report</h1>
      <p>{data.Range}</p>
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
                    formatTime(item.Prep) <= "07:59"
                      ? "lime"
                      : formatTime(item.Prep) <= "08:59"
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
                    Math.round((item.Late / item.Orders) * 100) <= 20
                      ? "lime"
                      : Math.round((item.Late / item.Orders) * 100) <= 24
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
            <th>Prep Time</th>
            <th>Wait Time</th>
            <th>Delivery Time</th>
            <th>Orders</th>
            <th>Late Orders</th>
            <th>Items</th>
            <th>Manual Holds</th>
            {takings && <th>Takings</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor:
                  formatTimeNumber(service.Prep) <= "07:59"
                    ? "green"
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
                  formatTimeNumber(service.Wait) < "01:00"
                    ? "lime"
                    : formatTimeNumber(service.Wait) <= "01:30"
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
                  Math.round((service.Late / service.Orders) * 100) <= 20
                    ? "lime"
                    : Math.round((service.Late / service.Orders) * 100) <= 24
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
            {takings && <td>£ {takings}</td>}
          </tr>
        </tbody>
      </table>

      <div className="productivity-key">
        <span className="productivity-comment">
          The floor team need at least a minute to take food out.
        </span>
        <div className="productivity-prep">
          <span className="green">Under 8 mins prep</span>
          <span className="orange">Over 8 mins prep</span>
          <span className="red">Over 9 mins prep</span>
        </div>
        <div className="productivity-wait">
          <span className="green">Under 1 min wait</span>
          <span className="orange">Under 1:30 min wait</span>
          <span className="red">Over 1:30 min wait</span>
        </div>
        <div className="productivity-delivery">
          <span className="green">Under 10 mins delivery</span>
          <span className="red">Over 10 mins delivery</span>
        </div>
        <div className="productivity-lates">
          <span className="green">Under 25% late orders</span>
          <span className="orange">Over 25% late orders</span>
          <span className="red">Over 30% late orders</span>
        </div>
      </div>
    </div>
  );
};

export default Table;
