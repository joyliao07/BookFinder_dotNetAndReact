import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ShelfDashboard from '../features/bookshelf/ShelfDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ShelfBookDetails from '../features/bookshelf/ShelfBookDetails';
import BookForm from '../features/form/BookForm';
import SearchEngine from '../features/search/SearchEngine';
import SearchResults from '../features/search/SearchResults';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../modals/ModalContainer';
import PrivateRoute from './PrivateRoute';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';

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
              <Switch>
                <PrivateRoute exact path='/books' component={ShelfDashboard} />
                <PrivateRoute path='/books/:id' component={ShelfBookDetails} />
                <PrivateRoute exact path='/search' component={SearchEngine} />
                <PrivateRoute path='/search/:keyWord' component={SearchResults} />
                <Route key={location.key} path={['/addBook/:id', '/manage/:id']} component={BookForm} />
                <Route component={NotFound} />
                <Route path='/server-error' component={ServerError} />
              </Switch>
            </Container>
          </>
        )}/>
    </>
  );
}

export default observer(App);
