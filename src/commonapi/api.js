import axios from "axios";


export  const  Api = axios.create({
    // baseURL:"http://localhost:3000"
    baseURL:"https://json-serevr-shoe.onrender.com"
})


// https://json-serevr-shoe.onrender.com           --  webserver url