import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

var NavBar = () => {
    const {userStore} = useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    BookFinder
                </Menu.Item>
                <Menu.Item as={NavLink} to='/books' name='Bookshelf'/>
                <Menu.Item>
                    <Button as={NavLink} to='/search' color='teal' content='Search Books' />
                </Menu.Item>
                {(userStore.user) &&
                    <Menu.Item position='right'>
                        <Dropdown pointing='top left' text={`Wecome ${userStore.user?.displayName}`}>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={userStore.logout} text='Logout'  icon='power'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>}
            </Container>
        </Menu>
    );
}

export default observer(NavBar);
