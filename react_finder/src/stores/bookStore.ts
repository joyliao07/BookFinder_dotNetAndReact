import { makeAutoObservable, runInAction } from "mobx";
import shelfAgent from "../api/shelfAgent";
import Book from "../models/book";

export default class BookStore {
    bookRegistry = new Map<string, Book>();
    selectedBook: Book | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get booksByStatus() {
        return Array.from(this.bookRegistry.values())
                    .sort((a: any, b: any) => a.status - b.status);
    }

    get groupedBooks() {
        return Object.entries(
            this.booksByStatus.reduce((books, book) => {
                const status = book.status;
                books[status] = books[status] ? [...books[status], book] : [book];
                return books;
            }, {} as {[key: string]: Book[]})
        )
    }

    loadBooks = async () => {
        this.loadingInitial = true;
        try {
            const books = await shelfAgent.Books.list();
            books.forEach(book => {
                this.setBook(book);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBook = async (id: string) => {
        let book = this.getBook(id);
        if (book) {
            this.selectedBook = book;
            return book;
        } else {
            this.loadingInitial = true;
            try {
                book = await shelfAgent.Books.details(id);
                this.setBook(book);
                runInAction(() => {
                    this.selectedBook = book;
                })
                this.setLoadingInitial(false);
                return book;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setBook = (book: Book) => {
        book.date = new Date(book.date);
        this.bookRegistry.set(book.id, book);
    }

    private getBook = (id: string) => {
        return this.bookRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBook = async (book: Book) => {
        this.loading = true;
        try {
            await shelfAgent.Books.create(book);
            runInAction(() => {
                this.bookRegistry.set(book.id, book);
                this.selectedBook = book;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateBook = async (book: Book) => {
        this.loading = true;
        try {
            await shelfAgent.Books.update(book);
            runInAction(() => {
                this.bookRegistry.set(book.id, book);
                this.selectedBook = book;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteBook = async (id: string) => {
        this.loading = true;
        try {
            await shelfAgent.Books.delete(id);
            runInAction(() => {
                this.bookRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}