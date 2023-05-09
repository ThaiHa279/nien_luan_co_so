import { Routes, Route} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import Cart from "./pages/Cart/Cart";
import HomePageAdmin from "./admin/home";
import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Order from "./admin/order";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/sign-up" element={<SignUp/>} />
        <Route exact path="/sign-in" element={<SignIn/>} />
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/seller" element={<HomePageAdmin/>}>
          <Route
            path="order"
            element={<Order/>}
          />
        </Route>
        <Route exact path="/item" element={<Items/>} />
        <Route exact path="/cart" element={<Cart/>} />
      </Routes>
    </div>
  );
}
