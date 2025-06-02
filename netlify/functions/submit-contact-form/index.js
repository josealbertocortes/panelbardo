// netlify/functions/submit-contact-form/index.js

const nodemailer = require('nodemailer');

// CORS configuration (optional, Netlify handles some automatically, but good to have explicit control)
// This part might not be strictly necessary if your frontend is on the same Netlify domain
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*', // Replace with your frontend domain(s) in production
   'Access-Control-Allow-Headers': 'Content-Type',
   'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Netlify Function handler
exports.handler = async (event, context) => {
  // Handle preflight OPTIONS requests for CORS
   if (event.httpMethod === 'OPTIONS') {
     return {
       statusCode: 200,
       headers: corsHeaders,
       body: 'OK',
     };
   }

  // Ensure it's a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      // headers: corsHeaders,
      body: JSON.stringify({ message: 'Method Not Allowed. Only POST requests are accepted.' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        // headers: corsHeaders,
        body: JSON.stringify({ message: 'Missing required fields (name, email, message).' }),
      };
    }

    // Get email credentials from Netlify Environment Variables
    const senderEmail = process.env.EMAIL_USER;
    const senderPassword = process.env.EMAIL_PASS; // Use an App Password for Gmail
    const receiverEmail = process.env.RECEIVER_EMAIL;

    if (!senderEmail || !senderPassword || !receiverEmail) {
      console.error('Error: Email credentials not configured in environment variables.');
      return {
        statusCode: 500,
        // headers: corsHeaders,
        body: JSON.stringify({ message: 'Server configuration error (email credentials missing).' }),
      };
    }

    // Create a Nodemailer transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // For Gmail
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'saborespaso2024@gmail.com',
        pass: senderPassword, // App Password
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`, // Display sender's name
      to: 'saborespaso2024@gmail.com',
      subject: `Nuevo mensaje de contacto de ${name} - Pan El Bardo`,
      html: `
        <html>
        <body>
            <h2>Nuevo mensaje de contacto desde el sitio web</h2>
            <p><strong>De:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
            <br>
            <small>Este mensaje fue enviado desde el formulario de contacto de Pan El Bardo.</small>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully from: ${email}`);
    return {
      statusCode: 200,
      // headers: corsHeaders,
      body: JSON.stringify({ message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    // Handle specific errors (e.g., JSON parsing error, Nodemailer error)
    if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
        return {
            statusCode: 400,
            // headers: corsHeaders,
            body: JSON.stringify({ message: 'Invalid JSON payload.' }),
        };
    }
    return {
      statusCode: 500,
      // headers: corsHeaders,
      body: JSON.stringify({ message: `Hubo un problema al enviar tu mensaje: ${error.message || 'Error desconocido.'}` }),
    };
  }
};