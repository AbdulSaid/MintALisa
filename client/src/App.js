import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MonaNft from './pages/MonaNft';

function App() {
  return (
    <div className="App">

      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mona/:id" element={<MonaNft />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
