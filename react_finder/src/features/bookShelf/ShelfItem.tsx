import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment, Image } from 'semantic-ui-react';
import ShelvedBook from '../../models/shelvedBook';
import { useStore } from '../../stores/store';

interface Props {
    book: ShelvedBook
}

const ShelfItem = ({ book }: Props) => {
    const {bookStore} = useStore();
    const {deleteBook} = bookStore;

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
                            {(book.author !== "") &&
                            <Item.Description>By {book.author}</Item.Description>}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                {(book.favorite) && 
                    <>
                        <Icon name='favorite'/>Favorite
                    </>}
                {(!book.favorite) && 
                    <>
                        <Icon name='dont'/>Not favorite
                    </>}
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
                    color='blue'
                    floated='right'
                    content='View'/>
                <Button 
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => deleteBook(book.id)}/>
            </Segment>
        </Segment.Group>
    )
}

export default ShelfItem;
