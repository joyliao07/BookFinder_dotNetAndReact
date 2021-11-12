import { Button, Container, Menu } from 'semantic-ui-react';

var NavBar = () => {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    BookFinder
                </Menu.Item>
                <Menu.Item name="BookShelf"/>
                <Menu.Item>
                    <Button positive content="Add Books"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
}

export default NavBar;
