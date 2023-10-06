const productivityData = (copiedProdData) => {
  if (typeof copiedProdData !== "string") {
    // Handle the case where copiedProdData is not a valid string
    return []; // Return an empty array or handle the error as needed
  }

  const lines = copiedProdData.trim().split("\n");
  const prodHeaders = [
    "Station",
    "Name",
    "Prep",
    "Orders",
    "Items",
    "Late",
    "Longest",
    "Hours",
  ];
  let idCounter = 1;
  const prodObjects = [];

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    const values = line.split(/\s+/);
    for (let j = 0; j < values.length - 1; j++) {
      values[j] = values[j];
    }

    const object = {};
    object["ID"] = idCounter++;

    values.forEach((value, index) => {
      const header = prodHeaders[index];
      object[header] = value;
    });

    prodObjects.push(object);
  }
  return prodObjects;
};

export default productivityData;

const serviceData = (copiedServiceData) => {
  const lines = copiedServiceData.trim().split("\n");
  let serviceTimes = {};

  const propertyMapping = {
    "Average Delivery Time": "Delivery",
    "Average Wait Time": "Wait",
    "Average Preparation Time": "Prep",
  };

  for (let i = 2; i < 5; i++) {
    const line = lines[i].split("\t");
    const category = propertyMapping[line[0].trim()];
    const values = line.slice(1).map((value) => parseFloat(value));

    if (typeof values[3] === "number") {
      serviceTimes[category] = values[3];
    }
  }

  const statsLine = lines[11].split("\t");
  const statsValues = statsLine.slice(1).map((value) => parseFloat(value));

  const statsLine2 = lines[6].split("\t");
  const statsValue2 = statsLine2.slice(1).map((value) => parseFloat(value));

  Object.assign(serviceTimes, {
    Orders: statsValues[1],
    Late: statsValue2[3],
    Items: statsValues[3],
    Holds: statsValues[6],
  });

  console.log(serviceTimes);

  return serviceTimes;
};

export { serviceData };
