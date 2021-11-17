import { useState } from 'react';
import axios from 'axios';
import { Button, Container, Card, Image } from 'semantic-ui-react';
import Book from '../../models/book';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SearchTextInput from './SearchTextInput';
import SearchDetails from './SearchDetails';

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const validationSchema = Yup.object({
    keyWord: Yup.string().required('A search keyword is required').nullable(),
  })

  const [keyWord, setKeyWord] = useState({
    keyWord: '',
  });

  const handleSearch = (keyWord) => {
    // use keyWord in API call...
    axios.get<Book[]>("http://localhost:5000/api/search").then((res: any) => {
      var books = res.data.items;  
      // create imageLink:
      books.forEach(book => {
        let imageLink = '';
        if (book.volumeInfo.hasOwnProperty('imageLinks')) {
          if (book.volumeInfo.imageLinks.hasOwnProperty('thumbnail')) {
            imageLink = book.volumeInfo.imageLinks.thumbnail;
          }
        }
        book.customImageLink = imageLink;
      })
      setBooks(books);
    });
    setKeyWord(keyWord);
  }

  const handleSeeBookDetails = (id) => {
    const book = books.find(a => a.id === id);
    setSelectedBook(book);
  }

  const handleAddBook = (bookId) => {
    console.log("add bookID to database: " + bookId);
    setSelectedBook(null);
  }

  return (
    <>
      {selectedBook !== null && <SearchDetails book={selectedBook} handleAddBook={handleAddBook}/>}
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
          {books.map( book => {
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
                      <Button color='blue' floated='right' onClick={() => handleSeeBookDetails(book.id)}>More Details</Button>
                    </Card.Content>
                  </Card>
              )
          })}
      </Container>
    </>
  );
}

export default SearchBooks;
