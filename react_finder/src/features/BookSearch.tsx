import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import Book from '../models/book';

function BookSearch() {

  let [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get<Book[]>(`https://www.googleapis.com/books/v1/volumes?q=constellation&key=myKey`).then((res: any) => {
      console.log(res.data.items);
      setBooks(res.data.items);
    })
  }, [])

  return (
    <>
      <Container style={{marginTop: '7em'}}>
        {books.map( book => {
            return(
                <>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.selfLink}</p>
                </>
            )
        })}
      </Container>
    </>
  );
}

export default BookSearch;
