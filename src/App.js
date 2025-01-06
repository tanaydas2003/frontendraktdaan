import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/Dashboard/Donar";
import Hospital from "./pages/Dashboard/Hospital";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";
import Hospitals from "./pages/Dashboard/Hospitals";
import HomePage from "./pages/HomePage";
import OrganizationPublic from "./pages/Dashboard/OrganizationPublic";

function App() {
  const externalHomePage = "https://rakdtdaann.netlify.app/"; // Replace with your friend's URL

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Route for iframe */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <iframe
                src={externalHomePage}
                title="Homepage"
                style={{
                  width: "100%",
                  height: "100vh",
                  border: "none",
                }}
              />
            </PublicRoute>
          }
        />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/organizations" element={<OrganizationPublic />} />
        <Route path="/donar" element={<ProtectedRoute><Donar /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/donar-list" element={<ProtectedRoute><DonarList /></ProtectedRoute>} />
        <Route path="/hospital-list" element={<ProtectedRoute><HospitalList /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/org-list" element={<ProtectedRoute><OrgList /></ProtectedRoute>} />
        <Route path="/consumer" element={<ProtectedRoute><Consumer /></ProtectedRoute>} />
        <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
        <Route path="/hospital" element={<ProtectedRoute><Hospital /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/organisation" element={<ProtectedRoute><Organisation /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </>
  );
}

export default App;
