import { Link } from "react-router-dom";
import { Button, Card, Image, Segment } from "semantic-ui-react";

interface Props {
    book: any,
    handleAddBook: (bookId) => void;
}

const SearchDetails = ({book, handleAddBook}: Props) => {

    const handleAddBookClick = (bookId: string) => {
        console.log("handleAddBookClick called");
        // handleAddBook(bookId);
    }

    // <Button color='orange' 
    //         floated='right' 
    //         onClick={() => handleAddBookClick(book.id)}>
    //     Add Book
    // </Button>

    return(
        <Card fluid>
            <Card.Content>
                <Image
                    src={book.customImageLink}
                    size='tiny'
                    floated='left'/>
                <Card.Header>{book.volumeInfo.title}</Card.Header>
                <Card.Meta>{book.volumeInfo.subtitle}</Card.Meta>
                <p>By {book.volumeInfo.authors[0]}</p>
                <p>Published {book.volumeInfo.publishedDate}</p>
                <p>{book.volumeInfo.publisher}</p>

                <Segment.Group>
                    <Segment>Category: {book.volumeInfo.categories[0]}</Segment>
                    <Segment.Group>
                        <Segment>{book.volumeInfo.description}</Segment>
                    </Segment.Group>
                </Segment.Group>

                <Segment.Group>
                    <Segment>
                        <p>Average Rating: {book.volumeInfo.averageRating} </p>
                        <p>By {book.volumeInfo.ratingsCount} votes</p>
                    </Segment>
                </Segment.Group>

                <Segment.Group>
                    <Segment>
                        Page Count: {book.volumeInfo.pageCount}
                    </Segment>
                    <Segment>
                        {book.volumeInfo.industryIdentifiers[0].type} {book.volumeInfo.industryIdentifiers[0].identifier}
                    </Segment>
                    <Segment>
                        <p>Purchase Link:</p> 
                        <a href={book.saleInfo.buyLink}>{book.saleInfo.buyLink}</a>
                    </Segment>
                    <Segment>
                        {book.selfLink}
                    </Segment>
                </Segment.Group>

            </Card.Content>
            <Button 
                as={Link} 
                to='/addBook' 
                color='olive' 
                floated='right'>
                Add Book
            </Button>
        </Card>
    )
}

export default SearchDetails;
