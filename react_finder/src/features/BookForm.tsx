import Book from "../models/book";

interface Props {
    book: Book | undefined;
}

var BookForm = ({book} : Props) => {
    return(
        <p>book form</p>
    )
}

export default BookForm;
