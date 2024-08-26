import AuthService from '../Services/Auth';
import MainStorage from '../Utils/MainStorage';
import { MAIN_BASE_URL } from './EnvVariables';

const BASE_URL = `https://acuitysoftware.co/digi-help-app/api`;
const MAINIMAGEURL = "https://acuitysoftware.co/digi-help-app/api";

function get(endpoint, params) {
    return request(endpoint, params);
}

function post(endpoint, params) {
    return request(endpoint, params, "POST");
}

function put(endpoint, params) {
    return request(endpoint, params, "PUT");
}

function Delete(endpoint, params) {
    return request(endpoint, params, "DELETE");
}

async function request(endpoint, params = null, method = 'GET') {
    let token = await AuthService.getToken();
    let url = BASE_URL + endpoint;

    console.log('Usertoken:', token);
    console.log('URL:', url);

    return new Promise((resolve, reject) => {
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open(method, url, true);

        xmlRequest.setRequestHeader('Accept', '*/*');
        xmlRequest.setRequestHeader('Content-Type', 'application/json');
        xmlRequest.setRequestHeader('Authorization', `Bearer ${token}`);

        if (method === 'GET') {
            xmlRequest.send();
        } else {
            xmlRequest.send(JSON.stringify(params));
        }

        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                const responseText = xmlRequest.responseText;
                if (xmlRequest.status === 200) {
                    try {
                        resolve(JSON.parse(responseText));
                    } catch (err) {
                        console.error('JSON Parse Error:', err);
                        reject({ error: 'Invalid JSON response from server.', actError: err });
                    }
                } else {
                    try {
                        reject(JSON.parse(responseText));
                    } catch (err) {
                        console.error('Error Response:', responseText);
                        reject({ error: 'Server Error. Please try again later.', actError: err });
                    }
                }
            }
        };
    });
}

async function upload(endpoint, file, additionalData = {}, tokenCustom = null) {
    if (!file || !file.uri || !file.type || !file.name) {
        console.error('Invalid file object properties:', file);
        throw new Error('Invalid file object provided for upload.');
    }

    let token = tokenCustom || await AuthService.getToken();
    let apiUrl = MAINIMAGEURL + endpoint;

    console.log('File object:', file);
    console.log('File path:', file.uri);
    console.log('apiUrl', apiUrl);

    const data = new FormData();
    data.append('image_file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
    });

    Object.keys(additionalData).forEach(key => {
        data.append(key, additionalData[key]);
    });

    return fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error('Upload Error:', error);
        throw error;
    });
}


const HttpClient = {
    get,
    post,
    put,
    Delete,
    upload,
};

export default HttpClient;
