import "antd/dist/antd.min.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/cart/NavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes/Protected";
import Home from "./components/cart/Home";
import Cart from "./components/cart/Cart";
import Verify from "./components/Verify";
import SignIn from "./components/Sign_in";

import PatientTable from "./components/table/Table";
import PatientModal from "./components/modal/PatientModal";
import Profile from "./components/inside/Profile";
import ResetPass from "./components/inside/ResetPassword";
import AppointmentsTable from "./components/table/AppointmentsTable";
import BookAppointmentModal from "./components/modal/BookAppointmentModal";

function App() {
  const { showNav, auth } = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      {showNav && <NavBar />}
      <Routes>
        <Route
          exact
          path="/"
          element={auth ? <Navigate to="/home" /> : <SignUp />}
        />

        <Route
          exact
          path="/sign_in"
          element={auth ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/verify"
            element={auth ? <Navigate to="/home" /> : <Verify />}
          />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/table" element={<PatientTable />} />
          <Route path="/modal" element={<PatientModal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointmentsTable" element={<AppointmentsTable />} />
          <Route
            path="/bookAppointmentModal"
            element={<BookAppointmentModal />}
          />
          <Route path="/changePass" element={<ResetPass />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
