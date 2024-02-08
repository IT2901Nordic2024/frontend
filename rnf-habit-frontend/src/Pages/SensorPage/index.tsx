import { NavBar } from "../../Components/NavBar";
import './index.css';

function SensorPage() {
  return (
    <div className="sensor-page">
        <NavBar />
      <h1 className="sensor-type">Sensor Data</h1>
      <div className="sensor-data-box">
        <p className = "sensor-data">100</p>
        </div>
    </div>
  );
}

export default SensorPage;