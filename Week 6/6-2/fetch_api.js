// Fetch API Example
async function fetchUserData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse JSON data
    console.log("User Data:", data); // Logs the fetched user data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchUserData();
