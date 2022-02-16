import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faShoppingCart, faUsers, faDatabase, faWarehouse, faComment } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Nav, NavItem, NavLink } from 'reactstrap';

import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedIndex: 1,
        };

        this.onNavItemClick = this.onNavItemClick.bind(this);
    }

    render() {
        return (
            <div className="sidebar">
                <Nav vertical className="nav-vertical py-5 pe-4">{
                    navItemArr.map( navItem => 
                        <NavItem key={ navItem.id } className={ `mb-4
                                ${(this.state.clickedIndex === navItem.id) && 'active'}` }
                                onClick={() => this.onNavItemClick(navItem.id) }>
                            <NavLink tag={ Link } to={ navItem.linkTo } className="d-flex py-3">
                                <div className="me-4">
                                    <FontAwesomeIcon icon={ navItem.icon } className="fa-fw"/>
                                </div>
                                <div>
                                    { navItem.name }
                                </div>
                            </NavLink>
                        </NavItem>
                    )
                }
                </Nav>
                <div className="mt-4 text-center">
                    <Link to="/" className="help-link">
                        <FontAwesomeIcon icon={ faComment } className="me-2 comment-icon"/>
                        需要協助？
                    </Link>
                </div>
            </div>
        );
    }

    onNavItemClick(id) {
        this.setState({
            clickedIndex: id,
        })
    }

    static getDerivedStateFromProps(props, state) { 
        if(props.location.pathname === '/login') {
            return {
                clickedIndex: 1
            };
        } else {
            return state;
        }
    }

    componentDidMount() {
    }
}

const navItemArr = [
    { id: 0, icon:  faTachometerAlt, name: '儀表板', linkTo: '/' },
    { id: 1, icon:  faShoppingCart, name: '原料市集', linkTo: '/' },
    { id: 2, icon:  faUsers, name: '客戶管理', linkTo: '/' },
    { id: 3, icon:  faDatabase, name: '品管紀錄', linkTo: '/' },
    { id: 4, icon:  faWarehouse, name: '倉儲管理', linkTo: '/warehouse' },
];

const SidebarWithRouter = withRouter(Sidebar);
export default SidebarWithRouter;