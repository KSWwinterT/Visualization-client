import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./MainPage";
import PieChart from "./PieChart";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <header className="App-header">
      </header>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/pie" element={<PieChart/>}/>
        </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
