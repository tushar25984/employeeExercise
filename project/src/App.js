import './App.css'
import "bootstrap/dist/css/bootstrap.css";
import EmployeeDetails from './frontend/pages/EmployeeDetails'
import { EmployeeProvider } from './frontend/context/EmployeeContext'

function App() {
  return (
    <>
      <EmployeeProvider>
        <EmployeeDetails />
      </EmployeeProvider>

    </>
  );
}

export default App;
