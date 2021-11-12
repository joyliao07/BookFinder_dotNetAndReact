import { Grid } from "semantic-ui-react";
import Book from "../models/book";
import BookList from "./BookList";


interface Props {
    books: Book[]
}

var BookDashboard = ({books}: Props) => {
    return(
        <Grid>
            <Grid.Column width='10'>
                <BookList books={books}/>
            </Grid.Column>
        </Grid>
    )
}

export default BookDashboard;
