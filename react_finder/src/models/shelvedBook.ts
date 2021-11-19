interface ShelvedBook {
    id: string,
    bookTitle: string,
    bookSubtitle: string,
    author: string,
    thumbnail: string,
    notes: string,
    bookUrl: string,
    date: Date | null,
    userName: string,
    status: string,
    favorite: boolean
}

export default ShelvedBook;
