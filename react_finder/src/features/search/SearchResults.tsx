import { useEffect } from 'react';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import SearchDetails from './SearchDetails';
import { useStore } from '../../stores/store';
import LoadingComponent from '../../layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

function SearchResults() {
  const {bookStore, modalStore} = useStore();
  const {searchBooks, searchedBooks, loadingInitial} = bookStore;
  const {keyWord} = useParams<{keyWord: string}>();

  useEffect(() => {
    searchBooks(keyWord);
  }, [searchBooks, keyWord]);

  const handleSeeBookDetails = (id: string) => {
    const book = searchedBooks.find(a => a.id === id);
    bookStore.selectedBookToAdd = book;
    modalStore.openModal(<SearchDetails />)
  }

  if (loadingInitial) return <LoadingComponent content='Loading search results' />

  return (
    <>
      <Container style={{marginTop: '7em'}}>
          <h3>Search results</h3>
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

export default observer(SearchResults);
