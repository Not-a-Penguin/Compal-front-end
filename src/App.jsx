import './App.css';
/*import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar.jsx';*/
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InitialLogin from './login/login-screen';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className='container'>
    <Router>
      <Routes>
        <Route path="/login" element={<InitialLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

/*<InitialLogin/>*/

/*<Router>
            <NavBar/>
            
            <Routes>
                <Route exact path='/home' element={<Home/>}/>
            
                <Route path='/loading-screen' element={<LoadingScreen/>}/>
            
                <Route path='/login-screen' element={<InitialLogin/>}/>
        
            </Routes>
        </Router>*/
                     

       /*import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar.jsx';*/

/*function App() {
    return(
        <div className="App">
            <NavBar/>
            <div className='container'>
                <Outlet/>
            </div>

        </div>*/