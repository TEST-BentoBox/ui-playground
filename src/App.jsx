import React, {Component} from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

/**
 * The template of our application
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <>
                <header>
                    <Navbar bg="primary" variant="dark" expand="lg" fixed>
                        <Navbar.Brand href="#home">Title</Navbar.Brand>
                        <Navbar.Toggle aria-controls="global-nav" />
                        <Navbar.Collapse id="global-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Contacts</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
                <main role="main" className="container py-4">
                    {this.props.routes}
                </main>
                <footer className="w-100 bg-dark text-white px-3 py-2">
                    <small>&copy; {new Date().getFullYear()} University of Washington</small>
                </footer>
            </>
        )
    }
}

export default App;
