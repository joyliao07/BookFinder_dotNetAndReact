import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we cannot find the page...
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/books' color='teal'>
                    Return to Bookshelf
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
