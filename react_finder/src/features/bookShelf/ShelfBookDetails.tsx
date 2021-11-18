import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";
import LoadingComponent from "../../layout/LoadingComponent";
import { useStore } from "../../stores/store";
import { format } from 'date-fns';


const ShelfBookDetails = () => {
    const {bookStore} = useStore();
    const {selectedBook: book, loadBook, loadingInitial} = bookStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBook(id);
    }, [id, loadBook]);

    if (loadingInitial || !book) return <LoadingComponent />;

    return(
        <Card fluid>
            <Card.Content>
                <Image
                    src={book.thumbnail}
                    size='small' floated='left'/>
                <Card.Header>{book.bookTitle}</Card.Header>
                <Card.Meta>{book.bookSubtitle}</Card.Meta>
                <p>By {book.author}</p>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <Icon name='calendar'/>Last updated on {format(book.date, 'MMM dd, yyyy')}

                </Card.Description>
                <Card.Description>
                    <Icon name='book'/> {book.status}
                </Card.Description>
                <Segment>
                    <h4>Notes:</h4>
                    <p>{book.notes}</p>
                </Segment>
                <Card.Description>
                    {book.bookUrl}
                </Card.Description>
                
                <Button as={Link} to={`/manage/${book.id}`} color='olive' floated='right'>
                    Edit Book Status
                </Button>
            </Card.Content>
        </Card>
    )
}

export default observer(ShelfBookDetails);
