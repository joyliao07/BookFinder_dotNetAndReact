import { Link } from "react-router-dom";
import { Button, Card, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";

interface Props {
    handleCloseModal: () => void
}

const SearchDetails = (props :Props) => {
    const {bookStore} = useStore();
    const {selectedBookToAdd: book} = bookStore;

    const handleCloseModal = () => {
        props.handleCloseModal();
    }

    return(
        <Card fluid>
            <Card.Content>
                <Image
                    src={book.thumbnail}
                    size='tiny'
                    floated='left'/>
                <Card.Header>{book.bookTitle}</Card.Header>
                <Card.Meta>{book.bookSubtitle}</Card.Meta>
                <p>By {book.author}</p>
                <p>Published {book.publishedDate}</p>
                <p>{book.publisher}</p>

                <Segment.Group>
                    <Segment>Category: {book.category}</Segment>
                    <Segment.Group>
                        <p>Description:</p>
                        <Segment>{book.description}</Segment>
                    </Segment.Group>
                </Segment.Group>

                <Segment.Group>
                    <Segment>
                        <p>Average Rating: {book.averageRating} </p>
                        <p>By {book.ratingsCount} votes</p>
                    </Segment>
                </Segment.Group>

                <Segment.Group>
                    <Segment>
                        Page Count: {book.pageCount}
                    </Segment>
                    <Segment>
                        {book.industryIdentifiersType} {book.industryIdentifier}
                    </Segment>
                    <Segment>
                        <p>Purchase Link:</p> 
                        <a href={book.buyLink}>{book.buyLink}</a>
                    </Segment>
                    <Segment>
                        {book.bookUrl}
                    </Segment>
                </Segment.Group>

            </Card.Content>
            <Button as={Link} to={`/addBook/${book.id}`} color='olive' floated='right'>
                Add To Shelf
            </Button>
            <Button color='grey' floated='right' onClick={handleCloseModal}>
                Close
            </Button>

        </Card>
    )
}

export default SearchDetails;
