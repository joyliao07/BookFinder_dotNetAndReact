import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import LoginForm from '../users/LoginForm';

const HomePage = () => {
    const {userStore, modalStore} = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    BookFinder
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/books' size='huge' inverted>
                            Go to Bookshelf!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size='huge' inverted
                            onClick={() => modalStore.openModal(<LoginForm />)}>
                            Login
                        </Button>
                        <Button size='huge' inverted
                            onClick={() => modalStore.openModal(<h1>Register</h1>)}>
                            Register
                        </Button>
                    </>
                )}
                
            </Container>
        </Segment>
    )
}

export default observer(HomePage);
