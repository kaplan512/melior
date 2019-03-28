import axios from 'axios'
// import server from '../../server'

const http = axios.create({
    headers: {
        "x-auth-token": "bad18eba1ff45jk7858b8ae88a77fa30"
    }
});


const api = (name, method, data) =>
{

    return http({
        baseURL: 'http://localhost:3004/' + name,
        method: method,
        data: data
    }).then(response => response.data).catch(error => Promise.reject(error.response));
};


export { http, api }