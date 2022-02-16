import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from 'components/Login/Login.jsx';
import Home from 'components/Home/Home.jsx';
import Storage from 'components/Storage/Storage.jsx';
import StorageTablePage from 'components/Storage/StorageTablePage.jsx';
import ProductList from 'components/Product/ProductList.jsx';
import NavbarTop from 'components/NavbarTop.jsx';
import Sidebar from 'components/Sidebar.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route path='/login' render={() => (
                    <Login />
                )}/>
                
                <Route path='/' render={() => (
                    <div>
                        <NavbarTop></NavbarTop>
                        <div className="d-flex">
                            <Sidebar></Sidebar>
                            <div className="flex-grow-1 px-5">
                                <Route exact path='/' render={() => (
                                    <Home/>
                                )}/>
                                <Route path='/warehouse' render={() => (
                                    <Storage />
                                )}/>
                                <Route path='/warehouse_table' render={() => (
                                    <StorageTablePage />
                                )}/>
                                <Route path='/product-list' render={() => (
                                    <ProductList/>
                                )}/>
                            </div>
                        </div>
                    </div>
                )}/>   
            </Router>
        );
    }
}

export default Main;