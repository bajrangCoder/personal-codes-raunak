import React, {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    
    
    let loginFun = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "email":email,
                    "password":password
                }),
            });
            let content = await res.json();
            if (res.status === 200) {
                setEmail("");
                setPassword("");
                Cookies.set("token",content.jwt,{ sameSite: 'strict', secure: true });
                props.showAlert("bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4","Success","Login Successfull");
                navigate("/");
            } else if(content.detail === "WrongPass"){
                props.showAlert("bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4","Error","Incorrect password!");
            } else if(content.detail === "InvalidUser"){
                props.showAlert("bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4","Error","You are not registered, first register then login.");
            } else {
                props.showAlert("bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4","Error","Some error occurred. Try again after sometime.");
            }
        } catch (err) {
          console.log(err);
        }
    };
    
    return(
        <>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap justify-center">
          <div className="w-full max-w-xs">
              <form onSubmit={loginFun} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-gray-800 text-center text-3xl mb-3">Sign In</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="password" type="password" placeholder="******************" minLength={6} onChange={e => setPassword(e.target.value)} />
                  {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-pink-300" type="submit">
                    Sign In
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-800" href="/">
                    Forgot Password?
                  </a>
                </div>
                <p class="text-center text-gray-500 text-sm mt-3">Don't have account? <Link to="/register" className="align-baseline font-bold text-sm text-pink-500 hover:text-pink-800">Sign Up</Link></p>
              </form>
            </div>
          </div>
        </section>
        </>
    )
}
export default Login;