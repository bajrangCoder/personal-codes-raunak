import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function SinglePost(){
    const params = useParams();
    const [blogData, setBlogData] = useState([])
    
    useEffect(() => {
        const fetchData = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/post/${params.postSlug}`)
              .then(response => {
                return response.json()
              })
              .then(data => {
                setBlogData(data.data);
              })
        }
        fetchData();
    });
    return(
        <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="p-5 text-pink-600 semi-bold text-4xl">{blogData.title}</h1>
            <em>{"Published on "+moment(blogData.time_upload).format("Do MMM YYYY")}</em><br/>
            <strong>{"Author : "+blogData.author_full_name}</strong>
            <hr className="border-0 border-t-2"/>
            <div className="p-6 break-all" dangerouslySetInnerHTML={{__html: blogData.content}} />
          </div>
        </section>
        </>
    )
}

export default SinglePost;