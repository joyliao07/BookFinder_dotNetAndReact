import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
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
            <Image
                src='https://books.google.com/books/publisher/content?id=q47sDwAAQBAJ&printsec=frontcover&img=1&zoom=2'
                size='small'/>
            <Card.Content>
                <Card.Header>{book.bookTitle}</Card.Header>
                <Card.Meta>
                    <span>{format(book.date, 'MMMM dd, yyyy')}</span>
                </Card.Meta>
                <Card.Description>
                    {book.bookUrl}
                </Card.Description>
                <Card.Description>
                    {book.status}
                </Card.Description>
            </Card.Content>
            <Button as={Link} to={`/manage/${book.id}`} color='olive' floated='right'>
                Edit Book Status
            </Button>
        </Card>
    )
}

export default observer(ShelfBookDetails);

