const http = require("http");

http
  .get("http://localhost:3000", (res) => {
    console.log("Frontend is UP! Status:", res.statusCode);
    if (res.statusCode === 200) {
      console.log("✅ React dev server running on port 3000");
    }
  })
  .on("error", (err) => {
    console.error("❌ Frontend server not responding:", err.message);
    process.exit(1);
  });

setTimeout(() => {
  console.log("⏱️ Timeout waiting for frontend...");
  process.exit(1);
}, 5000);
