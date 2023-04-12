import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavItem,
    NavbarToggler,
    Collapse,
    NavLink,
    Nav,
    NavbarBrand
} from 'reactstrap';
function Menu() {
    const [isOpen, setIsOpen] = React.useState(false);
    //<b>LN PRAGUE CZ</b> | ESHOPS CZ | ABOUT
    //TODO rewrite to Redux selections
    //TODO rewrite Redux to Redux/RTK later
    return (<div>
        <Navbar color="white" light expand="md">
            <NavbarBrand className="navbarHomeBtn" href="/">HOME</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem className="navbarItem">
                        <Link className="navbarLink" to="/eshops">
                            <NavLink  /*href="/povrchy"*/>ESHOPS</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem className="navbarItem">
                        <Link className="navbarLink" to="/about">
                            <NavLink /*href="/doplnky"*/>ABOUT</NavLink>
                        </Link>
                    </NavItem>
                </Nav>
            </Collapse>
            <div className="alignRight">
                <NavItem className="navbarItem">
                    <Link className="navbarLink" to="/login">
                        <NavLink /*href="/doplnky"*/>LOGIN</NavLink>
                    </Link>
                </NavItem>
            </div>
        </Navbar>
    </div>)
};
export default Menu