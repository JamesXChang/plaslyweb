import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Form, FormGroup, Input, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment, faUser } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { tokenUnset } from 'states/token-action.js';

import './NavbarTop.css';

class NavbarTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navElPadding: 0,
            goodsWidth: 0,
            supplierWidth: 0,
            aboutWidth: 0,
            hlbarStyle: {
                top: 40,
                width: 0,
                left: 0,
            },
            userName: '',
        };

        this.onGoodsClick = this.onGoodsClick.bind(this);
        this.onSupplierClick = this.onSupplierClick.bind(this);
        this.onAboutClick = this.onAboutClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    render() {
        return (
            <Navbar light expand="md" className="d-flex pt-0 navbar-top">
                <NavbarBrand tag={ Link } to='/'>
                    <img src="images/plasly-logo.png" alt="brand-logo" style={{ width: '180px' }}/>
                </NavbarBrand>
                <div className="flex-grow-1 d-flex justify-content-between ms-4 me-5">
                    {/* <NavbarToggler onClick={ toggle } />
                    <Collapse isOpen={ isOpen } navbar> */}
                    <Form className="d-flex align-items-center">
                        <div className="search-icon mx-3">
                            <FontAwesomeIcon icon={ faSearch } />
                        </div>
                        <FormGroup>
                            <Input name="searchBar" id="searchBar" type="text" 
                                className="px-5 search-bar" placeholder="Search store"/>
                        </FormGroup>
                    </Form>
                    <Nav navbar className="position-relative">
                        <NavItem className="px-3 nav-el" onClick={ this.onGoodsClick }>
                            <NavLink tag={ Link } to='/' className="goods">所有產品</NavLink>
                        </NavItem>
                        <NavItem className="px-3 nav-el" onClick={ this.onSupplierClick }>
                            <NavLink tag={ Link } to='/' className="supplier">供應商</NavLink>
                        </NavItem>
                        <NavItem className="px-3 nav-el" onClick={ this.onAboutClick }>
                            <NavLink tag={ Link } to='/' className="about">關於 Plasly</NavLink>
                        </NavItem>
                        <span className="hightlight-bar" 
                            style={{ top: `${this.state.hlbarStyle.top}px`, 
                                    width: `${this.state.hlbarStyle.width}px`,
                                    left: `${this.state.hlbarStyle.left}px`} }/>
                        <NavItem>
                            <NavLink tag={ Link } to='/'>
                                <FontAwesomeIcon icon={ faShoppingBasket }/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ Link } to='/'>
                                <FontAwesomeIcon icon={ faComment }/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {this.props.token == '' ?
                                <NavLink tag={ Link } to='/login'>
                                    <FontAwesomeIcon icon={ faUser }/>
                                </NavLink> :
                                <UncontrolledButtonDropdown className="user-dropdown">
                                    <DropdownToggle>
                                        <FontAwesomeIcon icon={ faUser }/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={ this.onLogoutClick }>
                                            <FontAwesomeIcon icon={ faSignOutAlt } className="me-1"/>
                                            登出
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            }
                        </NavItem>
                    </Nav>
                    {/* </Collapse> */}
                </div>
            </Navbar>
        );
    }

    componentDidMount() {
        const navEl = document.querySelector('.nav-el');
        const goodsEl = document.querySelector('.goods');
        const supplierEl = document.querySelector('.supplier');
        const aboutEl = document.querySelector('.about');
        this.setState({
            navElPadding: parseInt(getComputedStyle(navEl).paddingLeft),
            goodsWidth: goodsEl.clientWidth,
            supplierWidth: supplierEl.clientWidth,
            aboutWidth: aboutEl.clientWidth,
            hlbarStyle: {
                top: navEl.clientHeight,
                width: 0,
                left: 0,
            }
        })
        this.onGoodsClick();
    }

    componentDidUpdate() {
    }

    onGoodsClick() {
        this.setState(prevState => ({
            hlbarStyle: {
                top: prevState.hlbarStyle.top,
                width: prevState.goodsWidth,
                left: prevState.navElPadding,
            }
        }));
    }

    onSupplierClick() {
        this.setState(prevState => ({
            hlbarStyle: {
                top: prevState.hlbarStyle.top,
                width: prevState.supplierWidth,
                left: prevState.goodsWidth + 3 * prevState.navElPadding,
            }
        }));
    }

    onAboutClick() {
        this.setState(prevState => ({
            hlbarStyle: {
                top: prevState.hlbarStyle.top,
                width: prevState.aboutWidth,
                left: prevState.goodsWidth + prevState.supplierWidth + 5 * prevState.navElPadding,
            }
        }));
    }

    onLogoutClick() {
        this.props.dispatch(tokenUnset());
    }
}

export default connect(state=>{
    return {
        ...state.token,
    }
})(NavbarTop);