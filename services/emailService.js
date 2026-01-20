require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

// ----------- GLOBAL DEBUG INFO -------------
console.log("===== EMAILJS DEBUG INFO =====");
console.log("SERVICE ID:", process.env.EMAILJS_SERVICE_ID || "NOT FOUND");
console.log("TEMPLATE ADMIN:", process.env.EMAILJS_TEMPLATE_ADMIN || "NOT FOUND");
console.log("TEMPLATE CLIENT:", process.env.EMAILJS_TEMPLATE_CLIENT || "NOT FOUND");
console.log("PUBLIC KEY:", process.env.EMAILJS_PUBLIC_KEY ? "EXISTS" : "NOT FOUND");
console.log("PRIVATE KEY:", process.env.EMAILJS_PRIVATE_KEY ? "EXISTS" : "NOT FOUND");
console.log("================================");

exports.sendAdminEmail = async (data) => {
  try {
    console.log("\n--- ADMIN EMAIL PROCESS START ---");

    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_TEMPLATE_ADMIN ||
      !process.env.EMAILJS_PUBLIC_KEY ||
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      console.log("❌ EMAILJS ENV VARIABLES MISSING FOR ADMIN EMAIL");
      return;
    }

    console.log("Sending Admin Email via EmailJS...");
    console.log("Using Service ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("Using Template ID:", process.env.EMAILJS_TEMPLATE_ADMIN);

    const params = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company || "N/A",
      city: data.city || "N/A",
      category: data.category || "N/A",
      quantity: data.quantity || "N/A",
      budget: data.budget || "N/A",
      date: data.date,
      time: data.time,
      mode: data.mode,
    };

    console.log("Admin EmailJS Params Being Sent:", JSON.stringify(params, null, 2));

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ADMIN,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log("✅ Admin EmailJS Response:", result);
    console.log("Admin Email Sent via EmailJS Successfully");

  } catch (error) {
    console.log("❌ ADMIN EMAILJS ERROR DETAILS:");
    console.log(error);
    if (error?.text) console.log("Error Text:", error.text);
    if (error?.status) console.log("Status:", error.status);
  }
};

exports.sendClientEmail = async (data) => {
  try {
    console.log("\n--- CLIENT EMAIL PROCESS START ---");

    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_TEMPLATE_CLIENT ||
      !process.env.EMAILJS_PUBLIC_KEY ||
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      console.log("❌ EMAILJS ENV VARIABLES MISSING FOR CLIENT EMAIL");
      return;
    }

    console.log("Sending Client Email via EmailJS...");
    console.log("Using Service ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("Using Template ID:", process.env.EMAILJS_TEMPLATE_CLIENT);

    const params = {
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      mode: data.mode,
    };

    console.log("Client EmailJS Params Being Sent:", JSON.stringify(params, null, 2));

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CLIENT,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log("✅ Client EmailJS Response:", result);
    console.log("Client Email Sent via EmailJS Successfully");

  } catch (error) {
    console.log("❌ CLIENT EMAILJS ERROR DETAILS:");
    console.log(error);
    if (error?.text) console.log("Error Text:", error.text);
    if (error?.status) console.log("Status:", error.status);
  }
};
