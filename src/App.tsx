import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SignIn from "./components/auth/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
