import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import Book from '../../models/book';

interface Props {
    book: Book
}

const ShelfItem = ({ book }: Props) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={book.thumbnail} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/books/${book.id}`}>
                                {book.bookTitle}
                            </Item.Header>
                            <Item.Description>By {book.author}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='calendar'/>Last updated on {format(book.date, 'MMM dd, yyyy')}
            </Segment>
            <Segment secondary>
                <Icon name='book'/>{book.status}
            </Segment>
            <Segment clearing>
                <Button 
                    as={Link}
                    to={`/books/${book.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}

export default ShelfItem;
