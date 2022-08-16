import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { HeaderBanner, SideBar, QuillEditor } from './components/organisms';
import { Journal } from './components/pages';
// import { QuillContainer } from './components/molecules';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Journal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

