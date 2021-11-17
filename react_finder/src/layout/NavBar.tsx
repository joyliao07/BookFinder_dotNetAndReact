import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

var NavBar = () => {
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
            </Container>
        </Menu>
    );
}

export default NavBar;
