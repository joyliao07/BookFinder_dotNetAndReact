interface Book {
    id: string,
    bookTitle: string,
    bookUrl: string,
    date: Date | null,
    userName: string,
    status: string,
    favorite: boolean
}
// to add subtitle, author, thumbnail link, and myNotes
export default Book;
