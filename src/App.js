import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import NotFound from "./pages/NotFound";
import DataCriteria from "./pages/DataCriteria";
import DataSubcriteria from "./pages/DataSubcriteria";
import DataScore from "./pages/DataScore";
import DataCalculation from "./pages/DataCalculation";
import AhpCalculator from "./pages/AhpCalculator";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criteria" element={<DataCriteria />} />
          <Route path="/subcriteria" element={<DataSubcriteria />} />
          <Route path="/score" element={<DataScore />} />
          <Route path="/calculation" element={<DataCalculation />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/edit/:id" element={<EditEmployee />} />
          <Route path="/ahp/calculator" element={<AhpCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
