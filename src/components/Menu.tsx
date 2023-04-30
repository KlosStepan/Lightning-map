import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    Nav
} from 'reactstrap';

function Menu() {
    const [isOpen, setIsOpen] = React.useState(false);
    //TODO rewrite to Redux selections
    //TODO rewrite Redux to Redux/RTK later
    return (
        <div>
            <Navbar color="white" light expand="md">
                <Link onClick={() => console.log("home-pressed")} className="navRemoveUnderscoreInLinkA navbarHomeBtn" to="/">
                    <span>DOMŮ</span>
                </Link>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="navbarItem">
                            <Link className="nav-link" to="/eshops">
                                <span>ESHOPS</span>
                            </Link>
                        </NavItem>
                        <NavItem className="navbarItem">
                            <Link className="nav-link" to="/about">
                                <span>ABOUT</span>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
                <div className="alignRight">
                    <NavItem className="navbarItem" style={{ listStyleType: "none" }}>
                        <Link className="nav-link" to="/login">
                            <span>ADMINISTRATION</span>
                        </Link>
                    </NavItem>
                </div>
            </Navbar >
        </div >
    )
};

export default Menu;