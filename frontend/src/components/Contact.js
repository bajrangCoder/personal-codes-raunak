import React, { useState } from 'react';

function Contact(props){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name":name,
                    "email":email,
                    "subject":subject,
                    "message":message
                }),
              });
            //let resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
                props.showAlert("bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4","Success","Your feedback submitted. We will talk with you very soon.");
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
          <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe width="100%" height="100%" className="absolute inset-0" frameBorder={0} title="map" marginHeight={0} marginWidth={0} scrolling="no" src="https://www.google.com/maps/place/672R%2B8FW+D.A.V.+Public+School,+Kanti,+Bihar+843102/@26.2072023,85.2932688,15z/data=!4m2!3m1!1s0x39ed18602651c0fd:0x5f2c0a5254f52959" style={{"filter":"grayscale(1) contrast(1.2) opacity(0.4)"}} />
              <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                  <p className="mt-1">Kanti, Muzafarpur, Bihar, India</p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                  <a href="/" className="text-pink-500 leading-relaxed">coder@royalblog.me</a>
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                  <p className="leading-relaxed">Not Available</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-4">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
              <p className="leading-relaxed mb-5 text-gray-600">Let's talk with me! If you have any idea or suggestions, you can drop it in below form.</p>
              <form onSubmit={handleSubmit}>
                  <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="subject" className="leading-7 text-sm text-gray-600">Subject</label>
                    <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} name="subject" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} name="message" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                  </div>
                  <button type="submit" className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Send 📩</button>
              </form>
              <p className="text-xs text-gray-500 mt-3">If you are facing any difficulty or error on this site, immediately send it to me.</p>
            </div>
          </div>
        </section>
        </>
    )
}

export default Contact;