import { createContext, useContext } from "react";
import BookStore from "./bookStore";
import UserStore from "./userStore";


interface Store {
    bookStore: BookStore,
    userStore: UserStore,
}

export const store: Store = {
    bookStore: new BookStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
