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

const getSendOtp = async (data) => {
    return HttpClient.post('/send-otp', data);
}

const AuthService = {
    getAccount,
    setAccount,
    getSendOtp,

}

export default AuthService;