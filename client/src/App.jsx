import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import "tailwindcss/tailwind.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Categories from "./Components/Categories";
import InfoCard from "./Components/InfoCard";
import HomePage from "./Components/Homepage";
import ChatPage from "./pages/ChatPage";
import Labourjob from "./pages/Labourjob";
import Authentication from "./Components/Signup";
import ProfileForm from "./Components/Profileform";
import Dashboard from "./pages/Dashboardfree";
import Labourfilter from "./Components/Labourfilter";
import WelcomePage from "./Components/WelcomePage";
import Hello from "./Components/freelancer.jsx";
import Navlabour from "./Components/Navlabour";
import Labour from "./Components/LabourHomeSection";
import LabourSignup from "./Components/LabourSignup";
import Profile from "./Components/Profile";
import LabourEmployhome from "./pages/LabourEmployhome";
import PaymentInitPage from "./Components/PaymentInitPage";
import PaymentInitAgency from "./Components/PaymentInitAgency";
import JobForm from "./Components/JobForm";
import InsurancePage from "./pages/Insurance";
import MainContainer from "./Components/Collaboration/MainContainer";
import Welcome from "./Components/Collaboration/Welcome";
import CreateGroups from "./Components/Collaboration/CreateGroups";
import ChatArea from "./Components/Collaboration/ChatArea";
import User_Groups from "./Components/Collaboration/User_Groups";
import Groups_G from "./Components/Collaboration/Groups_G";
import CheckOut from "./Components/CheckOut";
import TableComponent from "./Components/TableComponent";
import ApprovalLabour from "./Components/ApprovalLabour";
import ModifyJob from "./pages/ModifyJob";
import JobList from "./pages/JobList";
import PaymentTrack from "./Components/PaymentTrack";
import Bid from "./pages/biddingpage";
import DisputeF from "./Components/DashBoard/DisputeF";
import ExistingDisputeF from "./Components/DashBoard/ExistingDisputeF";
import LabourDispute from "./pages/LabourDispute";
import LabourDisputeList from "./pages/LabourDisputeList";
import LabourEditDispute from "./pages/LabourEditDispute";
import FEditDispute from "./Components/DashBoard/FEditDispute";
import Labourempjob from "./pages/Labourempjob";
import FreelanceDash from "./pages/FreelanceDash";
import RequirementsPage from "./Components/RequirementsPage";
import Displayrequirements from "./Components/displayrequirements";
import { AuthProvider } from "./AuthContext";
import Bidregister from "./Components/Bidregister";
import Employerpage from "./Components/Employerpage";
import AgencyHome from "./pages/AgencyHome";
import Allbidsview from "./Components/Allbidsview";
import FEmployerDash from "./Components/FEmployerDash";
import FEmployerStatus from "./Components/FEmployerStatus";
import FEmployerPay from "./Components/FEmployerPay";
import FEmployerBefore from "./Components/FEmployerBefore";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/freelancehome" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/infogrid/:category" element={<InfoCard />} />
          <Route path="/Signin" element={<Authentication />} />
          <Route path="/Signin/form" element={<ProfileForm />} />
          <Route path="/dashboard" element={<FreelanceDash />} />
          <Route path="/profile/chat" element={<ChatPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/labourjobs" element={<Labourjob />} />
          <Route path="/information/:jobId" element={<Hello />} />
          <Route path="/labourhomepage" element={<Labour />} />
          <Route path="/labour-signin" element={<LabourSignup />} />
          <Route path="/labour-Profile" element={<Profile />} />
          <Route path="/labour-employer-home" element={<LabourEmployhome />} />
          <Route path="/payment-init" element={<PaymentInitPage />} />
          <Route path="/payment-agency" element={<PaymentInitAgency />} />
          <Route path="/modify-jobs" element={<JobForm />} />
          <Route path="/labourhomepage/insurance" element={<InsurancePage />} />
          <Route path="/collab" element={<MainContainer />} />
          <Route path="/collab/welcome" element={<Welcome />} />
          <Route path="/collab/chat" element={<ChatArea />} />
          <Route path="/collab/creategroups" element={<CreateGroups />} />
          <Route path="/collab/usergroups" element={<User_Groups />} />
          <Route path="/collab/groups_g" element={<Groups_G />} />
          <Route path="/categories/infogrid/Checkout" element={<CheckOut />} />
          <Route path="/addworker" element={<TableComponent />} />
          <Route path="/approval" element={<ApprovalLabour />} />
          <Route path="/modify" element={<ModifyJob />} />
          <Route path="/joblist" element={<JobList />} />
          <Route path="/paytrack" element={<PaymentTrack />} />
          <Route path="/freelance/bid" element={<Bid />} />
          <Route path="/employerjobs" element={<Labourempjob />} />
          <Route path="/freelance/dispute" element={<DisputeF />} />
          <Route
            path="/freelance/existed-dispute"
            element={<ExistingDisputeF />}
          />
          <Route path="/labour/dispute" element={<LabourDispute />} />
          <Route path="/labour/disputelist" element={<LabourDisputeList />} />
          <Route path="/labour/dispute/edit" element={<LabourEditDispute />} />
          <Route path="/freelance/dispute/edit" element={<FEditDispute />} />
          <Route path="/freelancedash" element={<Dashboard />} />
          <Route path="/requirements/:jobId" element={<RequirementsPage />} />
          <Route
            path="/displayreq/:TrackId"
            element={<Displayrequirements />}
          />
          <Route path="/bidregister" element={<Bidregister />} />
          <Route path="/employerpage" element={<Employerpage />} />
          <Route path="/agencyhome" element={<AgencyHome />} />
          <Route path="/allbids/:bidId" element={<Allbidsview />} />
          <Route path="/freelance/employer/dash" element={<FEmployerDash />} />
          <Route
            path="/freelance/employer/dash/status"
            element={<FEmployerStatus />}
          />
          <Route
            path="/freelance/employer/dash/pay"
            element={<FEmployerPay />}
          />
          <Route
            path="/freelance/employer/dash/before"
            element={<FEmployerBefore />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
