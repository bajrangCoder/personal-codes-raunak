import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Navbar(props){
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token')
        props.showAlert("bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4","Success","Logout Successfull");
        navigate("/login");
    }
    
    return(
        <>
        <nav className="sticky top-0 z-50 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-white text-3xl font-bold">Royal<span className="text-pink-400">Blog</span></h1>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                      >
                        Home
                      </NavLink>
    
                      <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                      >
                        About
                      </NavLink>
    
                      <NavLink
                        to="/blog"
                        className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                      >
                        Blog
                      </NavLink>
    
                      <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}
                      >
                        Contact
                      </NavLink>
                      <div className="absolute right-0 flex pr-2 space-x-4">
                      {!Cookies.get('token') ?
                        <>
                        <Link to="/login"><button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mx-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-3">Login</button></Link>
                        <Link to="/register"><button className="inline-flex items-center bg-pink-500 border-0 py-1 px-3 text-white focus:outline-none hover:bg-pink-200 rounded text-base mr-4 mt-3">Register</button></Link>
                        </>
                      :
                        <>
                        <div>
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-base font-medium leading-none text-white">{`${props.userData.first_name} ${props.userData.last_name}`}</div>
                                  <div className="text-sm font-medium leading-none text-gray-400">{props.userData.email}</div>
                                </div>
                            </div>
                        </div>
                        </>
                      }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
    
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <div className="md:hidden" id="mobile-menu">
                  <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                    >
                      Home
                    </NavLink>
    
                    <NavLink
                      to="/about"
                      className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                    >
                      About
                    </NavLink>
    
                    <NavLink
                      to="/blog"
                      className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                    >
                      Blogs
                    </NavLink>
    
                    <NavLink
                      to="/contact"
                      className={({ isActive }) => isActive ? 'bg-gray-900 hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}
                    >
                      Contact
                    </NavLink>
                    <div className="flex pr-2 w-full space-x-4">
                    {!Cookies.get('token') ?
                        <>
                        <Link to="/login"><button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mx-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-3">Login</button></Link>
                        <Link to="/register"><button className="inline-flex items-center bg-pink-500 border-0 py-1 px-3 text-white focus:outline-none hover:bg-pink-200 rounded text-base mr-4 mt-3">Register</button></Link>
                        </>
                    :
                        <>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-base font-medium leading-none text-white">{`${props.userData.first_name} ${props.userData.last_name}`}</div>
                                  <div className="text-sm font-medium leading-none text-gray-400">{props.userData.email}</div>
                                </div>
                            </div>
                        </div>
                        </>
                    }
                    </div>
                  </div>
                </div>
              )}
            </Transition>
        </nav>
        {Cookies.get('token') ?
            <>
            <nav className="flex flex-row items-center md:justify-center lg:justify-center mx-auto overflow-x-auto border-0 max-w-full bg-gradient-to-r from-pink-600 to-pink-500 shadow-md">
              {props.userData.is_staff ? <NavLink className={({ isActive }) => isActive ? 'py-4 px-3 m-0 mx-4 font-bold border-t-4 border-pink-600 bg-white hover:border-t-4 hover:border-pink-600 hover:bg-white' : 'py-4 px-3 m-0 mx-4 text-white font-bold hover:border-t-4 hover:border-pink-600 hover:bg-white hover:text-gray-800'} to="/dashboard">Dashboard</NavLink> : ''}
              <NavLink className={({ isActive }) => isActive ? 'py-4 px-3 m-0 mx-4 font-bold border-t-4 border-pink-600 bg-white hover:border-t-4 hover:border-pink-600 hover:bg-white' : 'py-4 px-3 m-0 mx-4 text-white font-bold hover:border-t-4 hover:border-pink-600 hover:bg-white hover:text-gray-800'} to="/profile">Profile</NavLink>
              <button className="py-4 px-3 m-0 mx-4 text-white font-bold hover:border-t-4 hover:border-pink-600 hover:bg-white hover:text-red-700" onClick={handleLogout}>Logout</button>
            </nav>
            </>
        :
            ''
        }
        </>
    );
}

export default Navbar;