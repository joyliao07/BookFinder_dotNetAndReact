import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ShelfDashboard from '../features/bookshelf/ShelfDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ShelfBookDetails from '../features/bookshelf/ShelfBookDetails';
import BookForm from '../features/form/BookForm';
import SearchEngine from '../features/search/SearchEngine';
import SearchResults from '../features/search/SearchResults';
import LoginForm from '../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../modals/ModalContainer';

function App() {
  const location = useLocation();
  const {userStore} = useStore();

  useEffect(() => {
    if (userStore.token) {
      userStore.getUser().finally(() => userStore.setAppLoaded());
    } else {
      userStore.setAppLoaded();
    }
  }, [userStore]);

  if (!userStore.appLoaded) return <LoadingComponent/>
  
  return (
    <>
      <ModalContainer/>
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
              <Route key={location.key} path={['/addBook/:id', '/manage/:id']} component={BookForm} />
              <Route path='/login' component={LoginForm} />
            </Container>
          </>
        )}/>
    </>
  );
}

export default observer(App);
