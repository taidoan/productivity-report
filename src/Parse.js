const productivityData = (copiedProdData) => {
  if (typeof copiedProdData !== "string") {
    return [];
  }

  const lines = copiedProdData.trim().split("\n");
  const firstLine = lines[0];
  const regex = /\*\*(.*?)\*\*/g;
  const matches = firstLine.match(regex);
  const parts = firstLine.split("**.");
  const dateRange = parts[parts.length - 1].trim();

  const prodObjects = [];
  Object.assign(prodObjects, {
    Range: dateRange,
  });

  if (matches) {
    for (const match of matches) {
      const pubName = match.replace(/\*\*/g, "");
      Object.assign(prodObjects, {
        Pub: pubName,
      });
    }
  }

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

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    const values = line.split(/\t/);

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

  const chefStats = lines[11].split("\t");
  const chefValues = chefStats.slice(1).map((value) => parseFloat(value));

  Object.assign(serviceTimes, {
    Orders: statsValues[1],
    Late: statsValue2[3],
    Items: statsValues[3],
    Holds: statsValues[6],
    ChefLates: chefValues[2],
  });

  return serviceTimes;
};

export { serviceData };
