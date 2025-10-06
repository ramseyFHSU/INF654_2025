// Promises Example
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
}

fetchData()
  .then((result) => {
    console.log(result); // Logs "Data fetched"
    return "Processing data";
  })
  .then((nextResult) => {
    console.log(nextResult); // Logs "Processing data"
  })
  .catch((error) => {
    console.error("Error:", error);
  });
