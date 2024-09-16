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
async function getCustomerSingle(data) {
    return await HttpClient.post('/customer/fetch_customer.php', data);
}
async function setUpdateCustomer(data) {
    return await HttpClient.post('/customer/update_cutomer.php', data);
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
async function addProductHNSCode(data) {
    return await HttpClient.post('/products/fetch_hsn_code.php', data);
}
async function setAllProduct(data) {
    return await HttpClient.post('/products/all_products.php', data);
}
async function deleteProduct(data) {
    return await HttpClient.post('/products/delete_product.php', data);
}
async function getSingleProduct(data) {
    return await HttpClient.post('/products/fetch_product.php', data);
}
async function setUpdateProduct(data) {
    return await HttpClient.post('/products/update_product.php', data);
}
async function setUserProfile(data) {
    return await HttpClient.post('/fetch_user.php', data);
}
async function UpdateUserProfile(data) {
    return await HttpClient.post('/update_user_profile.php', data);
}
async function getState(data) {
    return await HttpClient.post('/invoice/fetch_state.php', data);
}
async function createInvoice(data) {
    return await HttpClient.post('/invoice/create_invoice.php', data);
}
async function FetchInvoiceList(data) {
    return await HttpClient.post('/invoice/all_invoice.php', data);
}
async function FetchFullInvoiceData(data) {
    return await HttpClient.post('/invoice/fetch_invoice.php', data);
}
async function setGstDatafatch(data) {
    return await HttpClient.post('/dashboard/all_data_count.php', data);
}
async function sethnsCode(data) {
    return await HttpClient.post('/dashboard/add_fsn_code.php', data);
}

async function genaratePDF(data) {
    return await HttpClient.post('/invoice/generate_invoice.php', data);
}


const HomeService = {
    getAccount,
    setAccount,
    setToken,
    setUpdateUseracc,
    setAddCustomer,
    getCustomerSingle,
    setUpdateCustomer,
    setAllAccount,
    deleteAccount,
    addProduct,
    setAllProduct,
    addProductHNSCode,
    deleteProduct,
    getSingleProduct,
    setUpdateProduct,
    setUserProfile,
    UpdateUserProfile,
    getState,
    createInvoice,
    FetchInvoiceList,
    FetchFullInvoiceData,
    setGstDatafatch,
    sethnsCode,
    genaratePDF
}

export default HomeService;