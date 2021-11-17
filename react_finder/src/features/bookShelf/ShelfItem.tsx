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
                        <Item.Image size='tiny' circular  src='http://books.google.com/books/publisher/content?id=IYWmAgAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE717zcEdSOe31uWVZaf-_8yUDczMDKbgyMOSzjAMcUHpW3e95l9d89E8ru-feziaUBklsa5gFGi6ODbOqWLVwMwsMdhu_EpIfMlIpHO0WooO_79VrStDVEr6Zt59n8-6kvgdo2JS&source=gbs_api' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/books/${book.id}`}>
                                {book.bookTitle}
                            </Item.Header>
                            <Item.Description>By ...</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='calendar'/> Book added {format(book.date, 'MMMM dd, yyyy')}
                </span>
            </Segment>
            <Segment secondary>
                <Icon name='book' /> {book.status}
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
