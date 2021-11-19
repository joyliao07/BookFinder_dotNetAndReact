interface SearchedBook {
    id: string,
    title: string,
    subtitle: string,
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
    industryIdentifiersIdentifier: string,
    buyLink: string
}

export default SearchedBook;
