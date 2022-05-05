import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register(props){
    const [first_name, setFirstNme] = useState('');
    const [last_name, setLastNme] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    let navigate = useNavigate();
    
    let handleRegistration = async (e) => {
        e.preventDefault();
        try {
            let role_stf = false;
            if(role === "author"){
                role_stf = true;
            }else{
                role_stf = false;
            }
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "first_name":first_name,
                    "last_name":last_name,
                    "email":email,
                    "password":password,
                    "username":username,
                    "is_staff":role_stf
                }),
            });
            //let content = await res.json();
            if (res.status === 200) {
                setFirstNme("");
                setLastNme("");
                setUsername("");
                setEmail("");
                setPassword("");
                props.showAlert("bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4","Success","Registered successfully");
                navigate("/login");
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
              <form onSubmit={handleRegistration} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-gray-800 text-center text-3xl mb-3">Sign Up</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                    First Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="first_name" type="text" placeholder="Eg: Raunak" onChange={e => setFirstNme(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                    Last Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="last_name" type="text" placeholder="Eg: Raj" onChange={e => setLastNme(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="username" type="text" placeholder="Eg: Raunak415" onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="email" type="email" placeholder="Eg: coders@raunak.com" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" id="password" type="password" placeholder="******************" minLength={6} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Select Your Role
                  </label>
                  <select className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline hover:shadow-pink-300" onChange={e => setRole(e.target.value)}>
                    <option value="author">As a Author</option>
                    <option value="common_user" selected>Common User</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-pink-500 hover:bg-pink-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-pink-300" type="submit">
                    Sign Up
                  </button>
                </div>
                <p class="text-center text-gray-500 text-sm mt-3">Already have an account? <Link to="/login" className="align-baseline font-bold text-sm text-pink-500 hover:text-pink-800">Sign In</Link></p>
              </form>
            </div>
          </div>
        </section>
        </>
    )
}

export default Register;