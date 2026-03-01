// Test script to verify the API response matches what PropertyBrowse expects
const http = require("http");

function getJSON(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({
              status: res.statusCode,
              data: JSON.parse(data),
            });
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function testPropertyBrowseFlow() {
  console.log("Testing PropertyBrowse API flow...\n");

  try {
    // Simulate what PropertyBrowse does
    const response = await getJSON("http://localhost:5000/api/properties");

    console.log("1. API Response Structure:");
    console.log("   - Status:", response.status);
    console.log("   - response.data exists:", !!response.data);
    console.log("   - response.data.success:", response.data.success);
    console.log("   - response.data.count:", response.data.count);
    console.log(
      "   - response.data.properties is array:",
      Array.isArray(response.data.properties),
    );

    console.log("\n2. PropertyBrowse Access Pattern:");
    console.log("   - Accessing res.data.properties...");
    const properties = response.data.properties;
    console.log("   - Properties count:", properties.length);

    if (properties.length > 0) {
      console.log("   - First property:");
      console.log("     - title:", properties[0].title);
      console.log("     - price:", properties[0].price);
      console.log(
        "     - owner:",
        properties[0].owner.firstName,
        properties[0].owner.lastName,
      );
    }

    console.log("\n3. PropertyCard Data Check:");
    properties.forEach((p, i) => {
      console.log(`   Property ${i + 1}: ${p.title} - $${p.price}/month`);
    });

    console.log(
      "\n✅ PropertyBrowse should display all",
      properties.length,
      "properties!",
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testPropertyBrowseFlow();
