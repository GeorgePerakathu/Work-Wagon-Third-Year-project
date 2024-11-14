import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import authRouterflp from "./flp/routes/authRouter.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import userfreeRouter from "./flp/routes/userfreeRouter.js";
import AddDataModel from "./models/AddDataModel.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import User from "./models/UserModel.js";
import { authenticatefreeUser } from "./flp/middleware/authMiddleware.js";
import bodyParser from "body-parser";
import Job from "./models/JobModel.js";
import twilio from "twilio";
import Update from "./models/freelancerupdate.js";
import JobApplicants from "./models/JobApplicant.js";
import finalApplicants from "./models/finallist.js";
import Dispute from "./models/disputemodel.js";
import RequirementModel from "./flp/models/Requirement.js";
import BidRegisterModel from "./flp/models/BidRegisterModel.js"
import EmpRegisterModel from "./flp/models/EmployerRegisterModel.js";
import BidModel from "./flp/models/BidModel.js";
import CheckModel from "./flp/models/checkout.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/flp/users", authenticatefreeUser, userfreeRouter);
app.use("/api/v1/flp/auth", authRouterflp);
app.post("/api/v1/store-payment", async (req, res) => {
  try {
    const { Name, UIN, Job_Id, Job_Name, Job_Role, Payment } = req.body;

    // Validate input (you can add more validation as needed)
    if (!Name || !UIN || !Payment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new instance of the model
    const newPayment = new AddDataModel({
      Name,
      UIN,
      Job_Id,
      Job_Name,
      Job_Role,
      Payment,
    });

    // Save the data to the database
    await newPayment.save();

    // Check if the payment is successful (you can add your own criteria here)
    const isPaymentSuccessful = /* Add your logic here, e.g., check against a payment gateway response */ true;

    if (isPaymentSuccessful) {
      // Update the payment status to "success" in the database
      newPayment.PaymentStatus = "success";
      await newPayment.save();
      res.status(200).json({ message: "Payment successful" });
    } else {
      // Update the payment status to "failure" in the database
      newPayment.PaymentStatus = "failure";
      await newPayment.save();
      res.status(200).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error storing payment data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define Twilio credentials
const accountSid = "AC7dd7b12b548fb56e86434aba12dced49";
const authToken = "ef71e9066c3ebbd25fe4ea58a3825476";
const client = twilio(accountSid, authToken);

// Store generated OTP in memory (you might want to use a database for this in a production environment)
let storedOTP;

// Endpoint to generate and send OTP
app.post("/api/v1/send-sms", async (req, res) => {
  try {
    // Validate that 'to' is present
    const { to } = req.body;
    if (!to) {
      return res.status(400).json({ error: "Missing required parameter: to" });
    }

    // Generate a random 6-digit OTP
    storedOTP = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP via SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${storedOTP}`,
      from: "+12055905182 ",
      to,
    });

    console.log(`OTP sent to ${to}: ${storedOTP}`);

    // Return success response
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(`Error generating/sending OTP: ${error.message}`);
    res.status(500).json({ error: "Failed to generate/send OTP" });
  }
});

// Endpoint to verify OTP
app.post("/api/v1/verify-otp", (req, res) => {
  try {
    const { otp } = req.body;

    if (otp && otp.toString() === storedOTP.toString()) {
      // OTP is correct
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      // Incorrect OTP
      res.status(400).json({ error: "Incorrect OTP" });
    }
  } catch (error) {
    console.error(`Error verifying OTP: ${error.message}`);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const addDetailsSchema = new mongoose.Schema({
  Name: String,
  UIN: String,
  AgencyId: Number,
});

const AddDetailsModel = mongoose.model("AddDetails", addDetailsSchema);

app.get("/api/v1/AddDetails",authenticateUser, async (req, res) => {
  try {
    const {uin}=req.user;
    const details = await AddDetailsModel.find({ AgencyId: uin });
    res.status(200).json(details);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/User", authenticateUser, (req, res) => {
  try {
    const { userId, role, account, uin } = req.user;
    const userInfo = { userId, role, account, uin };
    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/AddDetails",authenticateUser, async (req, res) => {
  try {
    const {uin}=req.user;
    const AgencyId  = uin;
    const { Name, UIN} = req.body;
    const newMember = new AddDetailsModel({ Name, UIN, AgencyId });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/AddData", authenticateUser, async (req, res) => {
  try {
    const { uin } = req.user;
    if (!uin) {
      return res.status(400).json({ error: "User UIN is required" });
    }
    const userData = await AddDataModel.find({ UIN: uin });
    if (!userData) {
      return res.status(404).json({ error: "Data not found for the user UIN" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/Job", async (req, res) => {
  try {
    let filters = {};

    if (req.query.sitename) {
      filters.sitename = req.query.sitename;
    }

    if (req.query.jobPincode) {
      filters.jobPincode = req.query.jobPincode;
    }

    const jobs = await Job.find(filters).exec();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//app.get("/User", authenticateUser, (req, res) => {
// Fetch user data from your database
//const userData = {
//name: req.user.name, // Replace with the actual field in your user model
//uin: req.user.uin,   // Replace with the actual field in your user model
// ... other user data fields
//};

// Return the user data in the response
//res.json({ account: userData });
//});
app.post("/api/v1/JobApplicants", async (req, res) => {
  try {
    const { name, uin, jobId, jobName, jobRole, status } = req.body;

    // Create a new user using the User model
    const newUser = new JobApplicants({
      name,uin,jobId,jobName,jobRole,status,
    });
    // Save the user to the database
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/v1/JobApplicants/update", async (req, res) => {
  try {
    const { id, status } = req.body;

    const jobApplicant = await JobApplicants.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!jobApplicant) {
      return res.status(404).json({ error: "Job Applicant not found" });
    }

    res
      .status(200)
      .json({ message: "Job Applicant updated successfully", jobApplicant });
  } catch (error) {
    console.error("Error updating Job Applicant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/jobsearch", authenticateUser, async (req, res) => {
  try {
    const userabc = req.user.userId;
    //console.log(userabc);
    const jobs = await Job.find({ createdBy: userabc });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ msg: `No jobs found for the user` });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Express route to fetch jobs by ID
/*
app.get('/api/v1/jobs/:id', async (req, res) => {
  try {
    const jobId = mongoose.Types.ObjectId(req.params.id);
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
app.get("/api/v1/empjob/:id", async (req, res) => {
  const empId = req.params.id;
  //console.log('Received jobId:', empId);
  try {
    const job = await Job.findOne({ jobId: empId });
    //console.log(job);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
app.get("/api/v1/JobApplicants", async (req, res) => {
  try {
    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ error: "Missing jobId in the request" });
    }

    const applicants = await JobApplicants.find({ jobId, status: "Pending" });
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/JobApplicants/profile", authenticateUser, async (req, res) => {
  try {
    const { uin } = req.user;
    //console.log(uin);
    const applicants = await JobApplicants.find({ uin });
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/finalApplicants",authenticateUser, async (req, res) => {
  try {
    const { jobId, jobName, jobRole, price, name, uin } = req.body;
     const { userId } = req.user;
    if (!jobId || !jobName || !jobRole || !price || !name || !uin) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new user using the User model
    const newUser = new finalApplicants({
      jobId,
      jobName,
      jobRole,
      price,
      name,
      uin,
      createdBy: userId,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/v1/finalApplicants",authenticateUser, async (req, res) => {
  try {
    const{userId}=req.user;
    const apply = await finalApplicants
      .find({ createdBy: userId })
      .select("-price"); 
    res.status(200).json(apply);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/labour/dispute", async (req, res) => {
  try {
    const { uin, jobId, disputeReason, disputeDescription } = req.body;

    // Create a new dispute using the Dispute model
    const newDispute = new Dispute({
      uin,
      jobId,
      disputeReason,
      disputeDescription,
    });

    // Save the dispute to the database
    const savedDispute = await newDispute.save();

    res.status(201).json(savedDispute);
  } catch (error) {
    console.error("Error submitting dispute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/*
app.get("/api/v1/finalApplicants", async (req, res) => {
  try {
    const applicants = await finalApplicants.findOne({ }, { price: 0 }); // Exclude the "price" field
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
*/

//freelance API's
app.post("/api/v1/Update", authenticatefreeUser, async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      firstName,lastName,email,mobile,bio,interests,languages,socialMedia,skills,education,projects,projectPlans,profileImage,cardImage,jobtype,title,description,jobId,
    } = req.body;

    const newUpdate = new Update({
      firstName,lastName,email,mobile,bio,interests,languages,socialMedia,skills,education,projects,projectPlans,profileImage,cardImage,jobtype,title,description,jobId, createdBy: userId,
    });

    const savedUpdate = await newUpdate.save();
    res.status(201).json(savedUpdate);
  } catch (error) {
    console.error("Error saving event:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
app.get("/api/v1/Update", authenticatefreeUser, async (req, res) => {
  try {
    const { userId } = req.user;
    const details = await Update.find({ createdBy: userId });
    res.status(200).json(details);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/v1/Save",authenticatefreeUser, async (req, res) => {
  try {
    const { userId } = req.user;
    const updatedData = req.body;
    delete updatedData._id;
    const updateObject = { $set: updatedData };
    const result = await Update.updateOne({ createdBy: userId }, updateObject);
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Data updated successfully" });
    } else {
      console.error("Failed to update data:", result);
      res.status(500).json({ error: "Failed to update data" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/v1/projects/:category", async (req, res) => {
  try {
    const category = req.params.category; 
    const categoryWord = category.split("%20")[0];
    const updates = await Update.find(
      { jobtype: categoryWord },
      "jobId title description cardImage projectPlans -_id"
    );
    const projectsWithLeastCost = updates.map((update) => ({
      ...update.toObject(),
      projectPlans: update.projectPlans.sort((a, b) => a.cost)[0], // Sorting and taking the first element
    }));
    res.json(projectsWithLeastCost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/api/v1/job/:jobId', async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Update.findOne({ jobId: jobId });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
app.get("/api/v1/allData", async (req, res) => {
  try {
    const jobIds = req.query.jobId; 
    let query = {};
    if (jobIds) {
      query = { jobId: jobIds };
    }
    const allData = await Update.findOne(query);

    res.json(allData); 
  } catch (error) {
    console.error("Error fetching all data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post('/api/v1/Requirementsflps', authenticatefreeUser, async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      jobId,projectTitle, projectDescription, deadline, budget, designPreference, additionalInformation,
    } = req.body;

    // Create a new requirement instance
    const newRequirement = new RequirementModel({
      userId,
      jobId, 
      projectTitle,
      projectDescription,
      deadline,
      budget,
      designPreference,
      additionalInformation,
    });

    // Save the requirement to the database
    await newRequirement.save();

    res.status(201).json({ message: 'Requirement created successfully', requirement: newRequirement });
  } catch (error) {
    console.error('Error creating requirement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/v1/BidRegisterflps',authenticatefreeUser, async (req, res) => {
  try {
    const { userId, account } = req.user;

    if (account !== "Employer") {
      return res.status(403).json({ message: "Only employer can post" });
    }
    const {
      companyName,requirement,minThreshold,maxThreshold,amount,projectTitle,startDate,endDate,url,
    } = req.body;
    const newRequire = new BidRegisterModel({
      companyName,requirement,minThreshold,maxThreshold,amount,projectTitle,startDate,endDate,url,createdBy: userId,
    });
    await newRequire.save();
    res.status(201).json({ message: 'Requirement created successfully', requirement: newRequire });
  } catch (error) {
    console.error('Error creating requirement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/v1/EmpRegisterflps', async (req, res) => {
  try {
    const {
      name,companyName,preferences,companySize,phoneNo,bio,
    } = req.body;
    const newEmp = new EmpRegisterModel({
      name,companyName,preferences,companySize,phoneNo,bio,
    });
    // Save the requirement to the database
    await newEmp.save();
    res.status(201).json({ message: 'Requirement created successfully', requirement: newEmp });
  } catch (error) {
    console.error('Error creating requirement:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/v1/bid-register', async (req, res) => {
  try {
    const bids = await BidRegisterModel.find({}, 'url companyName projectTitle requirement bidId');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/v1/Bidflps',authenticatefreeUser, async (req, res) => {
  try {
    const { userId, account } = req.user;
    const { bidId, bidAmount } = req.body;
    if (account !== "Freelancer") {
      return res.status(403).json({ message: "Only freelancer can post bid" });
    }
    const newBid = new BidModel({ bidId, bidAmount, createdBy: userId });
    await newBid.save();
    res.status(201).json({ message: 'Bid created successfully', bid: newBid });
  } catch (error) {
    console.error('Error creating bid:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/v1/requirements', async (req, res) => {
  try {
    // Fetch only the required fields (userId, jobId, budget) from the database
    const requirements = await RequirementModel.findOne({}, 'userId jobId TrackId budget').sort({ createdAt: -1 });
    res.status(200).json(requirements);
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/v1/requirements/:TrackId", async (req, res) => {
  const { TrackId } = req.params; 
  try {
    const requirements = await RequirementModel.find({ TrackId: TrackId });
    if (requirements.length === 0) {
      return res.status(404).json({ message: "No requirements found for the given TrackId" });
    }
    res.json(requirements);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/v1/checkoutflps',authenticatefreeUser, async (req, res) => {
  try {
    const { userId, account } = req.user;
    const { TrackId, budget, jobId, Result } = req.body;
    if (account !== "Employer") {
      return res.status(403).json({ message: "Login through Employer account" });
    }
    const newCheck = new CheckModel({
      TrackId,
      jobId,
      budget,
      Result,
      createdBy: userId,
    });
    await newCheck.save();
    res.status(201).json({ message: 'Data stored successfully', check: newCheck });
  } catch (error) {
    console.error('Error creating check:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/api/v1/checks", async (req, res) => {
  try {
    // Fetch data from the database
    const checksData = await CheckModel.find({}, 'TrackId budget jobId Result'); // Fetching only specified fields
    res.json(checksData); // Send the fetched data as a JSON response
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/api/v1/jobIds', authenticatefreeUser, async (req, res) => {
  try {
    if (req.user) {
      const { userId } = req.user;
      const jobIds = await Update.find({ createdBy: userId }, 'jobId');
      res.status(200).json({ jobIds, currentUser: req.user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error fetching jobIds:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/v1/viewjobs', authenticatefreeUser, async (req, res) => {
  const { userId } = req.user;
  try {
    // Fetch jobs data
    const jobs = await BidRegisterModel.find({ createdBy: userId });

    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/v1/Bids/:bidId", async (req, res) => {
  try {
    const { bidId } = req.params;

    // Fetch all bids that match the given job ID (bidId)
    const bids = await BidModel.find({ bidId });

    if (bids.length === 0) {
      return res.status(404).json({ message: "No bids found for this job" });
    }

    res.status(200).json(bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5101;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

// bid display 
