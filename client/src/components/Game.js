import React from 'react'
import {
    Navbar,
    NavbarBrand,
    Container,
    Row,
    Col,
    Jumbotron,
} from 'reactstrap';
import { Link } from 'react-router-dom'


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

<Link to="/round/1">Start Game</Link>

</p>
</Col>
</Row>
</Container>
</Jumbotron>
</div>
)

export default Game