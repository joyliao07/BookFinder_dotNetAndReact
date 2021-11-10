import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  let [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/books").then((res: any) => {
      setBooks(res.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {books.map( (item: any) => (
            <List.Item key={item.id}>
              <p>{item.bookUrl}</p>
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
