require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

exports.sendAdminEmail = async (data) => {
  try {
    console.log("Sending Admin Email via EmailJS...");
    console.log("Service ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("Template ID:", process.env.EMAILJS_TEMPLATE_ADMIN);

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

    console.log("EmailJS Admin Params:", params);

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ADMIN,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      }
    );

    console.log("Admin EmailJS Response:", result);
    console.log("Admin Email Sent via EmailJS Successfully");

  } catch (error) {
    console.log("Admin EmailJS Error FULL:", error);
  }
};

exports.sendClientEmail = async (data) => {
  try {
    console.log("Sending Client Email via EmailJS...");
    console.log("Service ID:", process.env.EMAILJS_SERVICE_ID);
    console.log("Template ID:", process.env.EMAILJS_TEMPLATE_CLIENT);

    const params = {
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      mode: data.mode,
    };

    console.log("EmailJS Client Params:", params);

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CLIENT,
      params,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      }
    );

    console.log("Client EmailJS Response:", result);
    console.log("Client Email Sent via EmailJS Successfully");

  } catch (error) {
    console.log("Client EmailJS Error FULL:", error);
  }
};
