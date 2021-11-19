import { useState } from 'react';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import SearchDetails from './SearchDetails';
import { useStore } from '../../stores/store';
import { Redirect } from 'react-router-dom';

function SearchResults() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [selectedBookFromSearch, setSelectedBookFromSearch] = useState(null);
  const {bookStore} = useStore();
  const [redirect, setRedirect] = useState(null);

  const handleSeeBookDetails = (id: string) => {
    const book = searchedBooks.find(a => a.id === id);
    // local to show detailed component:
    setSelectedBookFromSearch(book);
    // in store:
    bookStore.setBookToAdd(book);
  }

  const handleAddBook = (bookId: string) => {
    console.log("add bookID to database: " + bookId);
    setSelectedBookFromSearch(null);
  }


  if (redirect) {
    return <Redirect to={redirect}/>
  }
  return (
    <>
      {selectedBookFromSearch !== null && <SearchDetails book={selectedBookFromSearch} handleAddBook={handleAddBook}/>}

      <Container style={{marginTop: '7em'}}>
          <h3>List of search results</h3>
          {searchedBooks.map( book => {
              return(
                  <Card fluid key={book.id}>
                    <Card.Content>
                      <Image src={book.customImageLink} size='tiny' floated='left'/>
                      <h3>{book.volumeInfo.title}</h3>
                      <Card.Meta>{book.volumeInfo.subtitle}</Card.Meta>
                    </Card.Content>
                    <Card.Content>
                      <p>Written by {book.volumeInfo.authors[0]}</p>
                      <p>Published on {book.volumeInfo.publishedDate}</p>
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
