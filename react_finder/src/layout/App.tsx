import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ShelfDashboard from '../features/bookshelf/ShelfDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ShelfBookDetails from '../features/bookshelf/ShelfBookDetails';
import EditBookForm from '../features/form/EditBookForm';
import SearchEngine from '../features/search/SearchEngine';
import SearchResults from '../features/search/SearchResults';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/books' component={ShelfDashboard} />
              <Route path='/books/:id' component={ShelfBookDetails} />
              <Route exact path='/search' component={SearchEngine} />
              <Route path='/search/:keyWord' component={SearchResults} />
              <Route key={location.key} path={['/addBook', '/manage/:id']} component={EditBookForm} />
            </Container>
          </>
        )}/>
    </>
  );
}

export default observer(App);
