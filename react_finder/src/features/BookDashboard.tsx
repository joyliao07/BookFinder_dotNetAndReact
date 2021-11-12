import { Grid } from "semantic-ui-react";
import Book from "../models/book";
import BookDetails from "./BookDetails";
import BookForm from "./BookForm";
import BookList from "./BookList";


interface Props {
    books: Book[];
    selectedBook: Book | undefined;
    // funSelectBook: (id: string) => void;
    // funCancelSelectBook: () => void;
    editMode: boolean;
    // funFormOpen: (id: string) => void;
    // funFormClose: () => void;
    // funCreateOrEditBook: (book: Book) => void;
    // funDeleteBook: (id: string) => void;
}

var BookDashboard = ({books, selectedBook, editMode}: Props) => {
    return(
        <Grid>
            <Grid.Column width='10'>
                <BookList 
                    books={books}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedBook && !editMode &&
                    <BookDetails 
                        book={selectedBook}/>
                }
                {editMode &&
                    <BookForm
                        book={selectedBook}/>
                }
            </Grid.Column>
        </Grid>
    )
}

export default BookDashboard;
