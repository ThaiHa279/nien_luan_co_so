import { Routes, Route} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home"
import {HomePageAdmin} from "./admin/home";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/seller" element={<HomePageAdmin/>} />
          {/* <Route path="/tables" element={<Tables/>} />
          <Route path="/billing" element={<Billing/>} />
          <Route path="/rtl" element={<Rtl/>} />
          <Route path="/profile" element={<Profile/>} /> */}
      </Routes>
    </div>
  );
}
