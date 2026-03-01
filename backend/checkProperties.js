const mongoose = require("mongoose");
const Property = require("./models/Property");

async function checkProperties() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/houserent");

    const total = await Property.countDocuments();
    console.log("Total properties:", total);

    const approved = await Property.countDocuments({ status: "approved" });
    console.log("Approved properties:", approved);

    const statuses = await Property.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    console.log("Properties by status:");
    statuses.forEach((s) => console.log(`  ${s._id}: ${s.count}`));

    const properties = await Property.find().select("title status").lean();
    console.log("\nAll properties:");
    properties.forEach((p) => console.log(`  - ${p.title} (${p.status})`));

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkProperties();
