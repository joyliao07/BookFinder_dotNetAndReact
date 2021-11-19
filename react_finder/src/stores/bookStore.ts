import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import shelfAgent from "../api/shelfAgent";
import ShelvedBook from "../models/shelvedBook";
import SearchedBook from "../models/searchedBook";

export default class BookStore {
    bookRegistry = new Map<string, ShelvedBook>();
    selectedBookFromShelf: ShelvedBook | undefined = undefined;
    selectedBookToAdd: SearchedBook | undefined = undefined;
    searchedBooks: SearchedBook[] | undefined = undefined;
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
            }, {} as {[key: string]: ShelvedBook[]})
        )
    }

    private setBookToRegistry = (book: ShelvedBook) => {
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

    updateBookFromShelf = async (book: ShelvedBook) => {
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
        var formattedbooks = [];
        this.loadingInitial = true;
        try {
            await axios.get<SearchedBook[]>("http://localhost:5000/api/search").then((res: any) => {
            // customImageLink:
            // books.forEach(book => {
            //     let imageLink = '';
            //     if (book.volumeInfo.hasOwnProperty('imageLinks')) {
            //     if (book.volumeInfo.imageLinks.hasOwnProperty('thumbnail')) {
            //         imageLink = book.volumeInfo.imageLinks.thumbnail;
            //     }
            //     }
            //     book.customImageLink = imageLink;
            // })
            formattedbooks = this.formatSearchResults(res.data.items);
            this.searchedBooks = formattedbooks;
            this.setLoadingInitial(false);
        });
        } catch (error) {
            console.log(error); 
            this.setLoadingInitial(false);
        }
        return formattedbooks;
    }

    private formatSearchResults = (searchResult) => {
        var formattedBooks: SearchedBook[] = [];
        for (var bookInfo in searchResult) {
            console.log(searchResult[bookInfo]);
            var id: string = searchResult[bookInfo].id;
            var title: string = searchResult[bookInfo].volumeInfo.title;
            var subtitle: string = searchResult[bookInfo].volumeInfo.subtitle;
            var author: string = searchResult[bookInfo].volumeInfo.authors[0];
            var bookUrl: string = searchResult[bookInfo].selfLink;
            var thumbnail: string = '';
            if (searchResult[bookInfo].volumeInfo.hasOwnProperty('imageLinks')) {
                if (searchResult[bookInfo].volumeInfo.imageLinks.hasOwnProperty('thumbnail')) {
                    thumbnail = searchResult[bookInfo].volumeInfo.imageLinks.thumbnail;
                }
            }
            var book: SearchedBook = {
                id: id,
                title: title,
                subtitle: subtitle,
                author: author,
                thumbnail: thumbnail,
                bookUrl: bookUrl,

                publishedDate: '',
                publisher: '',
                category: '', 
                description: '',
                averageRating: '',
                ratingsCount: '',
                pageCount: '',
                industryIdentifiersType: '',
                industryIdentifiersIdentifier: '',
                buyLink: ''
            }
            formattedBooks.push(book);
        }
        console.log("formattedBooks:");
        console.log(formattedBooks);
        return formattedBooks;
    }

    setBookToAdd = (info: any) => {
        console.log("bookStore: setBookToAdd");
        

    }

    addBookToShelf = async (book: ShelvedBook) => {
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