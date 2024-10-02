const BASE_URL = 'http://192.168.0.5:5269/api';

let API_URLS = {
    GET_EMPLOYEES: `${BASE_URL}/Employees/`,
    GET_POSITIONS: `${BASE_URL}/Position/`,
    GET_STATUSES: `${BASE_URL}/Status/`,
    SAVE_EMPLOYEE: `${BASE_URL}/Employees/SaveEmployee`,
}

export { API_URLS };