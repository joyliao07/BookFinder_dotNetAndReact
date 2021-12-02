import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

const HomePage = () => {
    const {userStore, modalStore} = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/read.png' alt='logo' style={{marginBottom: 12}} />
                    BookFinder
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <div style={{marginBottom: 30}}>
                        <h1 style={{marginBottom: 25}}>Welcome back, {userStore.user.displayName}! </h1>
                        <Button as={Link} to='/books' size='huge' inverted>
                            Go to Bookshelf!
                        </Button>
                    </div>
                        <Button onClick={userStore.logout} size='medium' inverted>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size='huge' inverted
                            onClick={() => modalStore.openModal(<LoginForm />)}>
                            Login
                        </Button>
                        <Button size='huge' inverted
                            onClick={() => modalStore.openModal(<RegisterForm />)}>
                            Register
                        </Button>
                    </>
                )}
                
            </Container>
        </Segment>
    )
}

export default observer(HomePage);
