import { useState } from 'react';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SearchTextInput from './SearchTextInput';
import SearchDetails from './SearchDetails';
import { useStore } from '../../stores/store';
import { Redirect } from 'react-router-dom';

function SearchBooks() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [selectedBookFromSearch, setSelectedBookFromSearch] = useState(null);
  const {bookStore} = useStore();
  const [redirect, setRedirect] = useState(null);

  const validationSchema = Yup.object({
    keyWord: Yup.string().required('Please enter a keyword to search.').nullable(),
  })

  const [keyWord, setKeyWord] = useState({
    keyWord: '',
  });

  const handleSearch = async (searchWord) => {
    console.log(searchWord);
    var books = await bookStore.searchBooks(searchWord);
    console.log(books);
    setSearchedBooks(books);
    setKeyWord(searchWord);
    setRedirect(searchWord);
    // route the page?
    return <Redirect to='/'/>
  }

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
        <h3>Keyword Search</h3>
        <Formik 
          validationSchema={validationSchema}
          enableReinitialize 
          initialValues={keyWord} 
          onSubmit={keyWord => handleSearch(keyWord)}>
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  <SearchTextInput name='keyWord' placeholder='Search Word'/>
                  <Button 
                      disabled={isSubmitting || !dirty || !isValid}
                      floated='right' 
                      positive type='submit' content='Search' />
              </Form>
          )}
        </Formik>
      </Container>

      <Container style={{marginTop: '7em'}}>
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

export default SearchBooks;
