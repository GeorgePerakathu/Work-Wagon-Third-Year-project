// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import twilio from 'twilio';

// Additional imports
import 'express-async-errors';
import AddDataModel from './models/add_data.js';
import Routes from 'twilio/lib/rest/Routes.js';
//import AddDetailsModel from '../models/DetailsModel.js';
//import AddDetailsModel from '../src/models/DetailsModel.js';

//import addDetails from '../controllers/detailController.js';

//import { addDetails } from '../controllers/detailController.js';

// Dot ENV config
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

// Define Twilio credentials
const accountSid = 'AC45855434f6f5a579353147b109c706fc';
const authToken = '15eb8f42786ea0eea5efc0ca78d12f28';
const client = twilio(accountSid, authToken);

// Store generated OTP in memory (you might want to use a database for this in a production environment)
let storedOTP;

// Endpoint to generate and send OTP
app.post('/send-sms', async (req, res) => {
  try {
    // Validate that 'to' is present
    const { to } = req.body;
    if (!to) {
      return res.status(400).json({ error: 'Missing required parameter: to' });
    }

    // Generate a random 6-digit OTP
    storedOTP = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP via SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${storedOTP}`,
      from: '+19477770547',
      to,
    });

    console.log(`OTP sent to ${to}: ${storedOTP}`);

    // Return success response
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(`Error generating/sending OTP: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate/send OTP' });
  }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  try {
    const { otp } = req.body;

    if (otp && otp.toString() === storedOTP.toString()) {
      // OTP is correct
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      // Incorrect OTP
      res.status(400).json({ error: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error(`Error verifying OTP: ${error.message}`);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.post('/api/store-payment', async (req, res) => {
  try {
    const { Name, UIN, Job, Payment } = req.body;

    // Validate input (you can add more validation as needed)
    if (!Name || !UIN || !Job || !Payment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new instance of the model
    const newPayment = new AddDataModel({
      Name,
      UIN,
      Job,
      Payment,
    });

    // Save the data to the database
    await newPayment.save();

    // Check if the payment is successful (you can add your own criteria here)
    const isPaymentSuccessful = /* Add your logic here, e.g., check against a payment gateway response */ true;

    if (isPaymentSuccessful) {
      // Update the payment status to "success" in the database
      newPayment.PaymentStatus = 'success';
      await newPayment.save();
      res.status(200).json({ message: 'Payment successful' });
    } else {
      // Update the payment status to "failure" in the database
      newPayment.PaymentStatus = 'failure';
      await newPayment.save();
      res.status(200).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error storing payment data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//app.post('/api/AddDetails', addDetails);

//const paymentRoutes = require('./detailsRoutes');
//app.use('/api', paymentRoutes);
// Endpoint for storing payment dat

// Define mongoose schema and model
const addDetailsSchema = new mongoose.Schema({
  Name: String,
  UIN: String,
  Phone: String,
});

const AddDetailsModel = mongoose.model('AddDetails', addDetailsSchema);

// Define a route to handle GET requests for fetching data
app.get('/api/AddDetails', async (req, res) => {
  try {
    // Fetch all details from the database
    const details = await AddDetailsModel.find();
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define route to handle POST request for adding details
app.post('/api/AddDetails', async (req, res) => {
  try {
    const { Name, UIN, Phone } = req.body;
    const newMember = new AddDetailsModel({ Name, UIN, Phone });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to handle GET request for fetching details


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set the port number
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Node Server is running on ${process.env.DEV_MODE} Node on port no ${PORT}`);
});
