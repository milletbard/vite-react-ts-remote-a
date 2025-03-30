import Count from "./views/Count";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function RemoteApp() {
  return (
    <Routes>
      <Route path="/" element={<div>App Remote A</div>} />
      <Route path="/count" element={<Count />} />
    </Routes>
  );
}

export default RemoteApp;
