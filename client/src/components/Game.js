import React from 'react'
import {
    Navbar,
    NavbarBrand,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

const Game = () => (
    <div>
<Navbar color="inverse" light expand="md">
    <NavbarBrand href="/"></NavbarBrand>
</Navbar>
<Jumbotron>
<Container>
<Row>
<Col>
<h1>Welcome to the Game</h1>
<p>
<Button
color="success"
size="large"
    >Start Game
</Button>
</p>
</Col>
</Row>
</Container>
</Jumbotron>
</div>
)

export default Game