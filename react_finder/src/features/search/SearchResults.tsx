import { useState } from 'react';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import SearchDetails from './SearchDetails';
import { useStore } from '../../stores/store';

function SearchResults() {
  const [showModal, setshowModal] = useState(false);
  const {bookStore} = useStore();
  const {searchedBooks} = bookStore;

  const handleSeeBookDetails = (id: string) => {
    const book = searchedBooks.find(a => a.id === id);
    // Update locally to show detailed modal:
    setshowModal(true);
    // Update store:
    bookStore.selectedBookToAdd = book;
  }

  const handleCloseModal = () => {
    setshowModal(false);
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
                      <h3>{book.title}</h3>
                      <Card.Meta>{book.subtitle}</Card.Meta>
                    </Card.Content>
                    <Card.Content>
                      <p>Written by {book.author}</p>
                      <p>Published on ...</p>
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
