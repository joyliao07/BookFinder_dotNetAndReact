import { createContext, useContext } from "react";
import BookStore from "./bookStore";


interface Store {
    bookStore: BookStore
}

export const store: Store = {
    bookStore: new BookStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
