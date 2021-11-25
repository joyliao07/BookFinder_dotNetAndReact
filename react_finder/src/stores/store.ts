import { createContext, useContext } from "react";
import BookStore from "./bookStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";


interface Store {
    bookStore: BookStore,
    userStore: UserStore,
    modalStore: ModalStore,
}

export const store: Store = {
    bookStore: new BookStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
