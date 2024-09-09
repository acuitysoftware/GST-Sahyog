import HttpClient from "../Utils/HttpClient"
import MainStorage from "../Utils/MainStorage";

const getAccount = async () => {
    return MainStorage.get('account');
}

const setAccount = async (data) => {
    return MainStorage.set('account', data);
}
async function setToken(data) {
    return await MainStorage.set('token', data);
}
async function getToken() {
    return await MainStorage.get('token');
}

const setSignUp = async (data) => {
    return HttpClient.post('/registration.php', data);
}
const setSignUpDetails = async (data) => {
    return HttpClient.post('/user_update.php', data);
}
const setLogin = async (data) => {
    return HttpClient.post('/auth.php', data);
}
async function uploadimage(data) {
    let endpoint = '/upload.php';
    return HttpClient.upload(endpoint, 'POST', data, {});
};


const AuthService = {
    getAccount,
    setAccount,
    setToken,
    getToken,
    setSignUp,
    setSignUpDetails,
    setLogin,
    uploadimage
}

export default AuthService;