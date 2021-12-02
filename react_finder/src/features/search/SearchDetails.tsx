import { Link } from "react-router-dom";
import { Button, Card, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";


const SearchDetails = () => {
    const {bookStore} = useStore();
    const {selectedBookToAdd: book} = bookStore;

    return(
        <Card fluid>
            <Card.Content>
                <div style={{'height': '140px'}}>
                    <Image
                        src={book.thumbnail}
                        size='tiny'
                        floated='left'/>
                    <h3>{book.bookTitle}</h3>
                    <Card.Meta>{book.bookSubtitle}</Card.Meta>
                    {(book.author !== '') && <p>By {book.author}</p>}
                    {(book.publisher !== '') && <p>Publisher: {book.publisher}</p>}
                    {(book.publishedDate !== '') && <p>Publish date: {book.publishedDate}</p>}
                </div>
                {(book.category !== '') && 
                    <Segment.Group>
                        <Segment>Category: {book.category}</Segment>
                    </Segment.Group>}

                {(book.description !== undefined) &&
                    <Segment.Group>
                            <Segment>Description:</Segment>
                            <Segment>{book.description}</Segment>
                    </Segment.Group>}
                
                {(book.averageRating !== undefined) &&
                    <Segment.Group>
                        <Segment>
                            <p>Rating: {book.averageRating} out of 5 stars</p>
                            {(book.ratingsCount !== undefined) && <p>Number of votes: {book.ratingsCount}</p>}
                        </Segment>
                    </Segment.Group>}

                <Segment.Group>
                    {(book.pageCount !== undefined) &&
                        <Segment>
                            Page Count: {book.pageCount}
                        </Segment>}
                    {(book.industryIdentifiersType !== undefined) &&
                        <Segment>
                            <p>Industry Identifier:</p>
                            {book.industryIdentifiersType}. {book.industryIdentifier}
                        </Segment>}
                    {(book.buyLink !== '') &&
                        <Segment>
                            <h5>Purchase Link:</h5> 
                            <a href={book.buyLink} target="_blank" rel="noopener noreferrer">{book.buyLink}</a>
                        </Segment>}
                </Segment.Group>
            </Card.Content>
            <Button as={Link} to={`/addBook/${book.id}`} color='olive' floated='right'>
                Add To Bookshelf
            </Button>
        </Card>
    )
}

export default SearchDetails;
