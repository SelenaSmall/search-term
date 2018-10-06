import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
            <Navbar color="inverse" light expand="md">
            <NavbarBrand href="/"></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            </Navbar>
            <Jumbotron>
            <Container>
            <Row>
            <Col>
            <h1>Welcome to the Game</h1>
        <p>
        <Button
        tag="a"
        color="success"
        size="large"
        href="http://reactstrap.github.io"
        target="_blank"
            >
        </Button>
        </p>
        </Col>
        </Row>
        </Container>
        </Jumbotron>
        </div>
    );
    }
}

export default App;