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
      const minutes = Math.floor(timeNumber);
      const seconds = Math.round((timeNumber - minutes) * 60); // Convert decimal part to seconds and round

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
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
            <th>Longest Order</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID}>
              <td>{item.Name}</td>
              <td>{formatTime(item.Prep)}</td>
              <td>{item.Orders}</td>
              <td>{item.Items}</td>
              <td>{item.Late}</td>
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
            <td>{service ? formatTimeNumber(service.Prep) : "-"}</td>
            <td>{service ? formatTimeNumber(service.Wait) : "-"}</td>
            <td
              style={{
                backgroundColor:
                  formatTimeNumber(service.Delivery) > "05:00"
                    ? "red"
                    : "transparent",
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
