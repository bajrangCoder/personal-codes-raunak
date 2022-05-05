import React,{useState,useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import SinglePost from './components/SinglePost';
import Page404 from './components/Page404';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import { HashRouter, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import Cookies from 'js-cookie';

function App() {
    const [alert, setAlert] = useState(null);
    
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchData = () => {
            let token = Cookies.get('token');
            fetch(`${process.env.REACT_APP_API_URL}/api/user/${token}`)
              .then(response => {
                return response.json()
              })
              .then(data => {
                setUserData(data)
              })
        }
        fetchData();
    });
    
    const showAlert = (classNme,title,message)=>{
        setAlert({
            classNme: classNme,
            title: title,
            msg: message
        })
        setTimeout(() => {
            setAlert(null);
        }, 2500);
    }
    
    return (
        <HashRouter>
            <div>
                <Navbar showAlert={showAlert} userData={userData} />
                <Alert alert={alert}/>
                <Routes>
                    <Route exact path="/" element={ <Home/> } />
                    <Route exact path="/about" element={ <About/> } />
                    <Route exact path="/blog" element={ <Blog/> } />
                    <Route exact path="/blog/:postSlug" element={ <SinglePost/> } />
                    <Route exact path="/contact" element={ <Contact showAlert={showAlert}/> } />
                    {!Cookies.get("token") ?
                    <>
                    <Route exact path="/login" element={ <Login showAlert={showAlert}/> } />
                    <Route exact path="/register" element={ <Register showAlert={showAlert} /> } />
                    </>
                    :
                    <>
                    <Route exact path="/profile" element={<Profile/>} />
                    {userData.is_staff ? <Route exact path="/dashboard" element={<Dashboard userData={userData} />} /> : ''}
                    </>
                    }
                    <Route exact path="*" element={ <Page404/> } />
                </Routes>
                <Footer/>
            </div>
        </HashRouter>
    );
}

export default App;
