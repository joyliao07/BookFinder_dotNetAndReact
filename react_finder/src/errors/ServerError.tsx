import { observer } from 'mobx-react-lite';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default observer(function ServerError() {
    const {bookStore} = useStore();
    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' color='red' content={bookStore.error?.message} />
            {bookStore.error?.details &&
                <Segment>
                    <Header as='h4' content='Stack trace' color='teal' />
                    <code style={{marginTop: '10px'}}>{bookStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})
