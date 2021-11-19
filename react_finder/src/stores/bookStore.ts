import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import shelfAgent from "../api/shelfAgent";
import Book from "../models/book";

export default class BookStore {
    bookRegistry = new Map<string, Book>();
    selectedBookFromShelf: Book | undefined = undefined;
    selectedBookToAdd: Book | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    // Group books by status:
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

    private setBookToRegistry = (book: Book) => {
        book.date = new Date(book.date);
        this.bookRegistry.set(book.id, book);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadBooksFromShelf = async () => {
        this.loadingInitial = true;
        try {
            const books = await shelfAgent.Books.list();
            books.forEach(book => {
                this.setBookToRegistry(book);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error); 
            this.setLoadingInitial(false);
        }
    }

    loadBookFromShelf = async (id: string) => {
        let book = this.bookRegistry.get(id);
        if (book) {
            this.selectedBookFromShelf = book;
            return book;
        } else {
            this.loadingInitial = true;
            try {
                book = await shelfAgent.Books.details(id);
                this.setBookToRegistry(book);
                runInAction(() => {
                    this.selectedBookFromShelf = book;
                })
                this.setLoadingInitial(false);
                return book;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    updateBookFromShelf = async (book: Book) => {
        this.loading = true;
        try {
            await shelfAgent.Books.update(book);
            runInAction(() => {
                this.bookRegistry.set(book.id, book);
                this.selectedBookFromShelf = book;
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

    // here to add a new book!
    searchBooks = async (keyWord: string) => {
        var books;      
        this.loadingInitial = true;
        try {
            await axios.get<Book[]>("http://localhost:5000/api/search").then((res: any) => {
             books = res.data.items;  
            // set into "book" format:

            // customImageLink:
            books.forEach(book => {
                let imageLink = '';
                if (book.volumeInfo.hasOwnProperty('imageLinks')) {
                if (book.volumeInfo.imageLinks.hasOwnProperty('thumbnail')) {
                    imageLink = book.volumeInfo.imageLinks.thumbnail;
                }
                }
                book.customImageLink = imageLink;
            })
            this.setLoadingInitial(false);
        });
        } catch (error) {
            console.log(error); 
            this.setLoadingInitial(false);
        }
        return books;
    } 

    setBookToAdd = (info: any) => {
        console.log("bookStore: setBookToAdd");
        console.log(info);
        console.log("id " + info.id);
        console.log("bookTitle " + info.volumeInfo.title);
        console.log("bookSubtitle " + info.volumeInfo.subtitle);
        console.log("author " + info.volumeInfo.authors[0]);
        // console.log("thumbnail " + );
        // console.log("bookUrl " + );
        // console.log("userName " + );
        // console.log(" " + );

        var book: Book = {
            id: info.id,
            bookTitle: '',
            bookSubtitle: '',
            author: '',
            thumbnail: '',
            notes: '',
            bookUrl: '',
            date: null,
            userName: '',
            status: '',
            favorite: false
        }
    }

    addBookToShelf = async (book: Book) => {
        this.loading = true;
        try {
            await shelfAgent.Books.create(book);
            runInAction(() => {
                this.bookRegistry.set(book.id, book);
                this.selectedBookFromShelf = book;
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


}