import { makeAutoObservable, reaction, runInAction } from "mobx";
import { history } from "..";
import shelfAgent from "../api/shelfAgent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";


export default class UserStore {
    user: User | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    get isLoggedIn () {
        return !!this.user;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    login = async (credentials: UserFormValues)  => {
        try {
            const user = await shelfAgent.Account.login(credentials);
            this.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/books');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        this.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await shelfAgent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (credentials: UserFormValues)  => {
        try {
            const user = await shelfAgent.Account.register(credentials);
            this.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/books');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}
