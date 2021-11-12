import { Card } from "semantic-ui-react";
import Book from "../models/book";

interface Props {
    book: Book;
    // funCancelSelectActivity: () => void;
    // funFormOpen: (id: string) => void;
}

const BookDetails = ({book}: Props) => {
    return(
        <Card fluid>
            <p>Book Image</p>
            <Card.Content>
                <Card.Header>{book.bookUrl}</Card.Header>
                <Card.Meta>
                    <span>{book.date}</span>
                </Card.Meta>
                <Card.Description>
                    {book.status}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default BookDetails;