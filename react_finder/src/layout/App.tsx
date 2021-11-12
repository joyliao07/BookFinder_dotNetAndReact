import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import Book from '../models/book';
import NavBar from './NavBar';
import BookDashboard from '../features/BookDashboard';

function App() {
  let [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    axios.get<Book[]>("http://localhost:5000/api/books").then((res: any) => {
      console.log(res.data);
      setBooks(res.data);
    })
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <Container style={{marginTop: '7em'}}>
        <BookDashboard books={books}/>
      </Container>
    </>
  );
}

export default App;
