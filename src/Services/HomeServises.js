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
// async function uploadimage(data) {
//     let endpoint = '/business-account/upload-image';
//     return HttpClient.upload(endpoint, 'POST', data, {});
// };
async function setUpdateUseracc(data) {
    return await HttpClient.post('/update_user_profile.php', data);
}
async function setAddCustomer(data) {
    return await HttpClient.post('/customer/add_customer.php', data);
}
async function setAllAccount(data) {
    return await HttpClient.post('/customer/all_customers.php', data);
}
async function deleteAccount(data) {
    return await HttpClient.post('/customer/delete_customer.php', data);
}
async function addProduct(data) {
    return await HttpClient.post('/products/add_product.php', data);
}
async function addProduct(data) {
    return await HttpClient.post('/products/add_product.php', data);
}


const HomeService = {
    getAccount,
    setAccount,
    setToken,
    setUpdateUseracc,
    setAddCustomer,
    setAllAccount,
    deleteAccount,
    addProduct
  
}

export default HomeService;