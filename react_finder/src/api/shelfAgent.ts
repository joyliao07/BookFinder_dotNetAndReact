import axios, { AxiosError, AxiosResponse } from 'axios';
import ShelvedBook from '../models/shelvedBook';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';
import { history } from '..';
import { toast } from 'react-toastify';

// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay)
//     })
// }

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.userStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    // await sleep(2500);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.bookStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Books = {
    list: () => requests.get<ShelvedBook[]>('/books'),
    details: (id: string) => requests.get<ShelvedBook>(`/books/${id}`),
    create: (book: ShelvedBook) => axios.post<void>('/books', book),
    update: (book: ShelvedBook) => axios.put<void>(`/books/${book.id}`, book),
    delete: (id: string) => axios.delete<void>(`/books/${id}`),
    search: (keyword: string) => axios.get(`/search/${keyword}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const shelfAgent = {
    Books,
    Account
}

export default shelfAgent;
