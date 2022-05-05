import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Blog(){
    const [blogData, setBlogData] = useState([])

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/post`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setBlogData(data.data)
          })
    }
    useEffect(() => {
        fetchData()
    });
    return(
        <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
            {blogData.map(item => (
                <div className="p-4 lg:w-1/3 w-full md:w-1/3">
                  <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                    <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{item.title}</h1>
                    <p className="leading-relaxed mb-3 break-all" dangerouslySetInnerHTML={{__html: item.content.slice(0,100)+"..."}} />
                    <Link className="text-pink-500 inline-flex items-center" to={`/blog/${item.slug}`}>Read More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </section>
        </>
    )
}

export default Blog;