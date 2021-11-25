import axios, { AxiosResponse } from 'axios';
import ShelvedBook from '../models/shelvedBook';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.userStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    delete: (id: string) => axios.delete<void>(`/books/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('account/login', user),
    register: (user: UserFormValues) => requests.post('/account/register', user)
}

const shelfAgent = {
    Books,
    Account
}

export default shelfAgent;
