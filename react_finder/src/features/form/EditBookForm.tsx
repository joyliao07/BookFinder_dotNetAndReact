import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, Card, Header, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../layout/LoadingComponent';
import Book from '../../models/book';
import { useStore } from '../../stores/store';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import SelectInput from './common/SelectInput';
import DateInput from './common/DateInput';
import NoteInput from './common/NoteInput';

const EditBookForm = () => {
    const history = useHistory();
    const {bookStore} = useStore();
    const {addBookToShelf, updateBookFromShelf, 
            loading, loadBookFromShelf, loadingInitial} = bookStore;
    const {id} = useParams<{id: string}>();

    const [book, setBook] = useState<Book>({
        id: '',
        bookTitle: '',
        bookSubtitle: '',
        author: '',
        thumbnail: '',
        notes: '',
        bookUrl: '',
        date: null,
        userName: '',
        status: '',
        favorite: false
    });

    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required').nullable(),
        status: Yup.string().required('Reading stsatus is required.')
    })

    useEffect(() => {
        if (id) loadBookFromShelf(id).then(book => setBook(book!))
    }, [id, loadBookFromShelf]);

    function handleFormSubmit(book: Book) {
        if (book.id.length === 0) {
            let newBook = {
                ...book,
                id: uuid()
            };
            addBookToShelf(newBook).then(() => history.push(`/books/${newBook.id}`))
        } else {
            updateBookFromShelf(book).then(() => history.push(`/books/${book.id}`))
        }
    }

    const favoriteOptions = [
        {text: 'My Favorite', value: true},
        {text: 'Not My Favorite', value: false}
    ]

    const statusOptions = [
        {text: 'To Read', value: 'To Read' },
        {text: 'Reading Now', value: 'Reading Now'},
        {text: 'Done Reading', value: 'Done Reading'}
    ]

    if (loadingInitial) return <LoadingComponent content='Loading book...' />

    return (
        <Segment clearing>
            <Header content='Book Details' sub color='blue' />
            <Card fluid>
                <Card.Content>
                    <Card.Header>{book.bookTitle}</Card.Header>
                    <Card.Description>
                        By {book.author}
                    </Card.Description>
                </Card.Content>
            
                <Card.Content>
                <Formik 
                    validationSchema={validationSchema}
                    enableReinitialize 
                    initialValues={book} 
                    onSubmit={values => handleFormSubmit(values)}>
                        
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <SelectInput 
                                options={favoriteOptions} 
                                placeholder='Favorite' 
                                name='favorite'/>
                            <DateInput 
                                placeholderText='Date'  
                                name='date' 
                                dateFormat='MMMM d, yyyy'/>
                            <SelectInput 
                                options={statusOptions} 
                                placeholder='Status'  
                                name='status'/>
                            <NoteInput 
                                rows={3} 
                                placeholder='My notes' 
                                name='notes' />
                            <Button 
                                disabled={isSubmitting || !isValid}
                                loading={loading} floated='right' 
                                positive type='submit' content='Submit' />
                            <Button as={Link} to='/books' floated='right' type='button' content='Cancel' />
                        </Form>
                    )}

                </Formik>
                </Card.Content> 
            </Card>

        </Segment>
    )
}

export default observer(EditBookForm);
