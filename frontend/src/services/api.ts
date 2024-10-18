// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:1337', // StrapiのベースURL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
