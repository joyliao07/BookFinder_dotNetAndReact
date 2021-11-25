import { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SearchTextInput from './SearchTextInput';
import { useStore } from '../../stores/store';
import { Redirect } from 'react-router-dom';

function SearchEngine() {
  const {bookStore} = useStore();
  const [redirect, setRedirect] = useState(null);

  const validationSchema = Yup.object({
    keyWord: Yup.string().required('Please enter a keyword to search.').nullable(),
  })

  const handleSearch = async (searchWord) => {
    await bookStore.searchBooks(searchWord.keyWord);
    setRedirect(searchWord.keyWord);
  }

  if (redirect) {
    return <Redirect to={`/search/${redirect}`}/>
  }

  return (
    <>
      <Container style={{marginTop: '7em'}}>
        <h3>Search Book</h3>
        <Formik 
          validationSchema={validationSchema}
          enableReinitialize 
          initialValues={{keyWord: ''}} 
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
    </>
  );
}

export default SearchEngine;
