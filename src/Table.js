import { formatTime, formatTimeNumber } from "./numberFunctions";
const Table = ({ data, service, takings }) => {
  return (
    <div>
      <h1>{data.Pub} Kitchen Report</h1>
      <p>Product report</p>
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

      <br />

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
            <th>Takings</th>
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
                    : formatTimeNumber(service.Wait) < "01:29"
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
            <td>{service ? service.Late : "-"}</td>
            <td>{service ? service.Items : "-"}</td>
            <td>{service ? service.Holds : "-"}</td>
            <td>£ {takings}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
