require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

exports.sendAdminEmail = async (data) => {
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ADMIN,
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: data.date,
        time: data.time,
        mode: data.mode,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      }
    );

    console.log("Admin Email Sent via EmailJS");

  } catch (error) {
    console.log("Admin EmailJS Error:", error);
  }
};

exports.sendClientEmail = async (data) => {
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CLIENT,
      {
        name: data.name,
        date: data.date,
        time: data.time,
        mode: data.mode,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      }
    );

    console.log("Client Email Sent via EmailJS");

  } catch (error) {
    console.log("Client EmailJS Error:", error);
  }
};
