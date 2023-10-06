const Table = ({ data, service, takings }) => {
  function formatTime(timeString) {
    // Split the time string into minutes and seconds
    const [minutesPart, secondsPart] = timeString.split(".");

    // Parse minutes and seconds as integers
    const minutes = parseInt(minutesPart, 10);
    const seconds = parseInt(secondsPart, 10);

    if (!isNaN(minutes) && !isNaN(seconds)) {
      // Use padStart to ensure two-digit format for minutes and seconds
      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      return formattedTime;
    } else {
      return "Invalid Time";
    }
  }

  function formatTimeNumber(timeNumber) {
    if (typeof timeNumber === "number" && !isNaN(timeNumber)) {
      const timeString = timeNumber.toFixed(2); // Convert to string with two decimal places
      const [minutes, seconds] = timeString.split("."); // Split minutes and seconds
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padEnd(2, "0"); // Ensure two digits for seconds
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return "Invalid Time";
    }
  }

  return (
    <div>
      {/* Table for data */}
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

      {/* Table for serviceObject */}
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
