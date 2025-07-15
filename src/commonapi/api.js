import axios from "axios";


export  const Api = axios.create({
    baseURL:"http://localhost:3000"
})


// https://json-serevr-shoe.onrender.com           --  webserver url