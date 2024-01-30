import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Dashboard from "./component/Dashboard";
import SendMoney from "./component/SendMoney";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
