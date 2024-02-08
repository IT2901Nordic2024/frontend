import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SensorData from '../Pages/SensorPage/index';
//  other pages as created

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SensorData />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;