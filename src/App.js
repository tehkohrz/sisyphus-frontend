import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Journal, Login } from './components/pages';
// import { QuillContainer } from './components/molecules';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/journal' element={<Journal />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

