const http = require("http");

http
  .get("http://localhost:5000/api/properties", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        console.log("Full response:");
        console.log(JSON.stringify(parsed, null, 2).substring(0, 2000));
      } catch (e) {
        console.error("Parse error:", e.message);
        console.log("Raw data:", data.substring(0, 500));
      }
    });
  })
  .on("error", (err) => {
    console.error("Connection error:", err.message);
  });
