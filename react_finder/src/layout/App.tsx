import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import Book from '../models/book';
import NavBar from './NavBar';
import BookDashboard from '../features/BookDashboard';
import BookSearch from '../features/BookSearch';

function App() {
  let [books, setBooks] = useState<Book[]>([]);
  let [selectedBook, setselectedBook] = useState<Book | undefined>();
  let [editMode, setEditMode] = useState(false);

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
        <BookDashboard books={books} selectedBook={selectedBook} editMode={editMode}/>
      </Container>
      <Container style={{marginTop: '7em'}}>
        <BookSearch/>
      </Container>
    </>
  );
}

export default App;
