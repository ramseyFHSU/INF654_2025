// Async/Await Example
async function fetchDataAsync() {
  try {
    const response = await fetchData();
    console.log(response); // Logs "Data fetched"
    const nextResult = "Processing data";
    console.log(nextResult); // Logs "Processing data"
  } catch (error) {
    console.error("Error:", error);
  }
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
}

fetchDataAsync();
