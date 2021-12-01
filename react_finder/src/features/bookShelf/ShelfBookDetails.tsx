import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";
import LoadingComponent from "../../layout/LoadingComponent";
import { useStore } from "../../stores/store";
import { format } from 'date-fns';


const ShelfBookDetails = () => {
    const {bookStore} = useStore();
    const {selectedBookFromShelf: book, loadBookFromShelf, loadingInitial} = bookStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadBookFromShelf(id);
    }, [id, loadBookFromShelf]);

    if (loadingInitial || !book) return <LoadingComponent />;

    return(
        <Card fluid>
            <Card.Content>
                <Image
                    src={book.thumbnail}
                    size='small' floated='left'/>
                <Card.Header>{book.bookTitle}</Card.Header>
                <Card.Meta>{book.bookSubtitle}</Card.Meta>
                {(book.author !== '') && <p>By {book.author}</p>}
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    {(book.favorite) && 
                        <><Icon name='favorite'/>Favorite</>
                    }
                    {(!book.favorite) && 
                        <><Icon name='dont'/>Not favorite</>
                    }
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <Icon name='calendar'/>Last updated on {format(book.date, 'MMM dd, yyyy')}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <Icon name='book'/> {book.status}
                </Card.Description>
                <Segment>
                    <h4>Notes:</h4>
                    <p>{book.notes}</p>
                    {(book.notes === '') && 
                        <p>(Currently no notes for this book)</p>
                    }
                </Segment>
                
                <Button as={Link} to={`/manage/${book.id}`} color='olive' floated='right'>
                    Edit Book Status
                </Button>
                <Button as={Link} to={`/books`} color='grey' floated='right'>
                    Cancel
                </Button>
            </Card.Content>
        </Card>
    )
}

export default observer(ShelfBookDetails);

