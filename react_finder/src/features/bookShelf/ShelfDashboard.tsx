import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../layout/LoadingComponent";
import { useStore } from "../../stores/store";
import ShelfList from "./ShelfList";


var ShelfDashboard = () => {
    const {bookStore} = useStore();
    const {loadBooksFromShelf, bookRegistry} = bookStore;

    useEffect(() => {
      if (bookRegistry.size <= 1) loadBooksFromShelf();
    }, [bookRegistry.size, loadBooksFromShelf])
  
    if (bookStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return(
        <Grid>
            <Grid.Column width='10'>
                <ShelfList/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ShelfDashboard);
