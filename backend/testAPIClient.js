const axios = require("axios");

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

async function testAPI() {
  try {
    console.log("Testing GET /properties...");
    const response = await apiClient.get("/properties");
    console.log("Response structure:");
    console.log("  - response.data:", typeof response.data);
    console.log(
      "  - response.data.properties:",
      Array.isArray(response.data.properties),
    );
    console.log("  - properties count:", response.data.properties.length);
    console.log("  - First property:", response.data.properties[0]?.title);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

testAPI();
