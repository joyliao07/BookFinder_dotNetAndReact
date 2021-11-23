import { useState } from 'react';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import SearchDetails from './SearchDetails';
import { useStore } from '../../stores/store';

function SearchResults() {
  const [showModal, setShowModal] = useState(false);
  const {bookStore} = useStore();
  const {searchedBooks} = bookStore;

  const handleSeeBookDetails = (id: string) => {
    const book = searchedBooks.find(a => a.id === id);
    // Update locally to show detailed modal:
    setShowModal(true);
    // Update store:
    bookStore.selectedBookToAdd = book;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <>
      {showModal && <SearchDetails handleCloseModal={handleCloseModal}/>}

      <Container style={{marginTop: '7em'}}>
          <h3>List of search results</h3>
          {searchedBooks.map( book => {
              return(
                  <Card fluid key={book.id}>
                    <Card.Content>
                      <Image src={book.thumbnail} size='tiny' floated='left'/>
                      <h3>{book.bookTitle}</h3>
                      <h5>{book.bookSubtitle}</h5>
                    </Card.Content>
                    <Card.Content>
                      {(book.author !== '') && <p>By {book.author}</p>}
                      {(book.publishedDate !== '') && <p>Publish date: {book.publishedDate}</p>}
                      <Button color='blue' 
                              floated='right'
                              onClick={() => handleSeeBookDetails(book.id)}>More Details</Button>
                    </Card.Content>
                  </Card>
              )
          })}
      </Container>
    </>
  );
}

export default SearchResults;
