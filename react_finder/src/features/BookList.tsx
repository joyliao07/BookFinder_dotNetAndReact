import { Label, Button, Item, Segment } from "semantic-ui-react";
import Book from "../models/book";

interface Props {
    books: Book[];
}

const BookList = ({books}: Props) => {
    return(
        <Segment>
            <Item.Group divided>
                {books.map(book => (
                    <Item key={book.id}>
                        <Item.Content>
                            <Item.Header as='a'>{book.bookUrl}</Item.Header>
                            <Item.Meta>{book.date}</Item.Meta>
                            <Item.Description>
                                <div>{book.status}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'/>
                                {book.favorite && <Label basic content="Favorite"/>}
                                {!book.favorite && <Label basic content="(normal)"/>}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default BookList;
