import React, {useState,useEffect} from 'react';
import Cookies from 'js-cookie';

export default function Profile(){
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
    return (
        <>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1>Name : {userData.first_name+" "+userData.last_name}</h1>
                <h1>Email : {userData.email}</h1>
                <h1>Username : {userData.username}</h1>
            </div>
        </section>
        </>
    )
}