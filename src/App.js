// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DashboardDetailView from "./DashboardDetailView";
import MainPage from "./MainPage";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <header className="App-header">
          <Routes>
              <Route path="/main" element={<DashboardDetailView/>}/>
              <Route path="/" element={<MainPage/>}/>
          </Routes>
      </header>
    </div>
      </BrowserRouter>
  );
}

export default App;
