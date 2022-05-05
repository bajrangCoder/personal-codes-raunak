import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Dashboard(props){
    const [blogData, setBlogData] = useState([])
    let i = 0;
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/author/post/${props.userData.id}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setBlogData(data.data)
          })
    }
    fetchData()
    
    return(
        <>
        <section className="text-gray-600 body-font">
            <div className="container grid px-6 mx-auto">
                <h2 className="my-5 text-2xl font-semibold text-gray-700">
                  Author's Dashboard
                </h2>
                <h2 className="py-4 text-xl text-gray-900 font-bold">Your Blog Posts</h2>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 bg-gray-50 text-gray-400 bg-gray-800">
                                    <th className="px-4 py-3">S.No.</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Published</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-700 bg-gray-800">
                                {blogData.map(item => (
                                    <tr className="text-gray-400">
                                        <td className="px-4 py-3">{i=i+1}</td>
                                        <td className="px-4 py-3 text-sm">{item.title}</td>
                                        <td className="px-4 py-3 text-xs">
                                            {item.publish ?
                                                <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-green-700 text-green-100">
                                                  Yes
                                                </span>
                                            :
                                                <span className="px-2 py-1 font-semibold leading-tight rounded-full bg-red-700 text-red-100">
                                                  Not
                                                </span>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {moment(item.time_upload).format("Do MMM YYYY")}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                    <svg
                                                      className="w-5 h-5"
                                                      aria-hidden="true"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <path
                                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                      ></path>
                                                    </svg>
                                                </button>
                                                <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-pink-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                                    <svg
                                                      className="w-5 h-5"
                                                      aria-hidden="true"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <path
                                                        fill-rule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                        clip-rule="evenodd"
                                                      ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}