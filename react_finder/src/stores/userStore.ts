import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import shelfAgent from "../api/shelfAgent";
import { User, UserFormValues } from "../models/user";


export default class UserStore {
    user: User | null = null;
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn () {
        return !!this.user;
    }

    setToken = (token: string | null) => {
        if (token) window.localStorage.setItem('jwt', token);
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
            console.log(user);
            history.push('/books');
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

}
