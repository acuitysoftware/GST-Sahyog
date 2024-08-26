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
async function uploadimage(data) {
    let endpoint = '/business-account/upload-image';
    return HttpClient.upload(endpoint, 'POST', data, {});
};
const getBankAccList = async () => {
    return HttpClient.post('/bank-accounts-list');
}
const addBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/create', data);
}
const deleteBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/delete', data);
}
const updateBankAcc = async (data) => {
    return HttpClient.post('/bank-accounts/update', data);
}
const getUserProfile = async (data) => {
    return HttpClient.post('/get-user', data);
}
const getCategoryData = async () => {
    return HttpClient.post('/categories');
}
const getsub_CategoryData = async (data) => {
    return HttpClient.post('/sub-categories', data);
}
const fatchState_list = async () => {
    return HttpClient.post('/states');
}
const fatchDist_list = async (data) => {
    return HttpClient.post('/district-list', data);
}
const updateProfile = async (data) => {
    return HttpClient.post('/update-profile', data);
}
const setAboutUs = async (data) => {
    return HttpClient.post('/help/create', data);
}
const getMessage_list = async () => {
    return HttpClient.post('/help-list');
}
const fatchAboutUs = async () => {
    return HttpClient.post('/about-us');
}
const fatch_subscription_list = async () => {
    return HttpClient.post('/subscription-list');
}
const fatch_work_list = async () => {
    return HttpClient.post('/how-its-works');
}
const get_subcategory_list = async (data) => {
    return HttpClient.post('/get-profiles',data);
}
const get_profilefrom = async (data) => {
    return HttpClient.post('/get-profile-form',data);
}
const setOptionList = async (data) => {
    return HttpClient.post('/get-options-list',data);
}
const setOption_DisttrictList = async (data) => {
    return HttpClient.post('/get-options-child-list',data);
}
const submitFormData = async (data) => {
    return HttpClient.post('/business-account/create',data);
}
const submitSubscriptionData = async (data) => {
    return HttpClient.post('/subscription-purchase',data);
}
const setChangePassword = async (data) => {
    return HttpClient.post('/change-password',data);
}


const HomeService = {
    getAccount,
    setAccount,
    setToken,
    uploadimage,
    getBankAccList,
    addBankAcc,
    deleteBankAcc,
    updateBankAcc,
    getUserProfile,
    getCategoryData,
    getsub_CategoryData,
    fatchState_list,
    fatchDist_list,
    updateProfile,
    setAboutUs,
    getMessage_list,
    fatch_subscription_list,
    fatchAboutUs,
    fatch_work_list,
    get_subcategory_list,
    get_profilefrom,
    setOptionList,
    setOption_DisttrictList,
    submitFormData,
    submitSubscriptionData,
    setChangePassword
}

export default HomeService;