import { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SearchTextInput from './SearchTextInput';
import { Redirect } from 'react-router-dom';

function SearchEngine() {
  const [redirect, setRedirect] = useState(null);

  const validationSchema = Yup.object({
    keyWord: Yup.string().required('Enter keyword to search.').nullable(),
  })

  const handleSearch = async (searchWord) => {
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
          {({ handleSubmit, isValid }) => (
              <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  <SearchTextInput name='keyWord' placeholder='Search Word'/>
                  <Button 
                      disabled={!isValid}
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
