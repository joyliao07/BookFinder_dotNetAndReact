interface SearchedBook {
    id: string,
    bookTitle: string,
    bookSubtitle: string,
    author: string,
    thumbnail: string,
    bookUrl: string,
    publishedDate: string, // Date?
    publisher: string,
    category: string, 
    description: string,
    averageRating: string,
    ratingsCount: string,
    pageCount: string,
    industryIdentifiersType: string,
    industryIdentifier: string,
    buyLink: string
}

export default SearchedBook;
