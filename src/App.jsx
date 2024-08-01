import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar.jsx';

function App() {
    return(
        <div className="App">
            <NavBar/>
            <div className='container'>
                <Outlet/>
            </div>

        </div>
    );      
}
/*<LoadingScreen/>*/
export default App
/*<InitialLogin/>*/

/*<Router>
            <NavBar/>
            
            <Routes>
                <Route exact path='/home' element={<Home/>}/>
            
                <Route path='/loading-screen' element={<LoadingScreen/>}/>
            
                <Route path='/login-screen' element={<InitialLogin/>}/>
        
            </Routes>
        </Router>*/
                     

       