import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import ShelfItem from "./ShelfItem";


const ShelfList = () => {
    const { bookStore } = useStore();
    const { groupedBooks } = bookStore;

    return(
        <>
        {(groupedBooks.length > 0) && groupedBooks.map(([group, books]) => (
            <Fragment key={group}>
                <Header sub color='blue'>
                    {group}
                </Header>
                {books.map(book => (
                    <ShelfItem key={book.id} book={book} />
                ))}
            </Fragment>
        ))}
        {(groupedBooks.length == 0) && 
                <Header as='h2' color='blue'>
                    There is no book on your bookshelf.
                </Header>
        }
    </>
    )
}

export default observer(ShelfList);
