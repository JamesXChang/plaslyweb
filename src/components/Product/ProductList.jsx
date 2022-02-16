import React from 'react';
import Sidebar from 'components/Sidebar.jsx';
import { Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './ProductList.css';
import TableHeader from 'components/TableHeader.jsx';
import { getHeaderList, getProductList } from 'api/product-api.js';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumList: [],
            currentPage: 1,
            showItems: {
                start: 0, 
                end: 8,
            },
            headerList: [],
            optionList: [],
            requestFilterList: [],
            productList: [],
        };

        this.changePage = this.changePage.bind(this);
        this.toggleOpening = this.toggleOpening.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
    }

    render() {
        return (
            <div>
                <TableHeader headerList={ this.state.headerList } optionList={ this.state.optionList } bgStyle={ headerStyle } 
                    toggleOpening={ this.toggleOpening } toggleSorting={ this.toggleSorting } onOptionClick={ this.onOptionClick }/>
                { this.state.productList && 
                    this.state.productList.slice(this.state.showItems.start, this.state.showItems.end).map(product => 
                        <Row key={ product.id } className="product-row p-2 my-3 align-items-center">
                            <Col>{ product.category }</Col>
                            <Col>{ product.supplier }</Col>
                            <Col>{ product.productNum }</Col>
                            <Col>{ product.type }</Col>
                            <Col>{ product.color }</Col>
                            <Col className="text-center">
                                { product.price }
                            </Col>
                            <Col className="text-end">
                                <Button color="primary">
                                    商品詳情    
                                </Button>
                            </Col>
                        </Row>
                )}
                <div className="d-flex justify-content-center align-items-center my-4">
                    <FontAwesomeIcon icon={ faChevronLeft } 
                        className={`mx-2 page-direct ${this.state.currentPage === this.state.pageNumList[0] && 'disabled'}`}
                            onClick={() => this.changePage(this.state.currentPage - 1) }/>
                    { this.state.pageNumList.map(num => 
                        <p key={ num } 
                            className={`mx-1 my-0 py-1 rounded-circle text-center page-num
                                        ${(this.state.currentPage === num) && 'active'}`}
                            onClick={() => this.changePage(num) }>
                            { num }
                        </p>
                    )}
                    <FontAwesomeIcon icon={ faChevronRight } 
                        className={`mx-2 page-direct ${this.state.currentPage === this.state.pageNumList.length && 'disabled'}`}
                            onClick={() => this.changePage(this.state.currentPage + 1) }/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        getHeaderList().then(response => {
            const newHeaderList = [];
            const newOptionList = [];

            response.data.forEach(header => {
                newHeaderList.push({
                    ...header,
                    isMenuOpening: false,
                    isColumnIncreasing: true,
                });

                if(header.options) {
                    header.options.forEach(option => {
                        newOptionList.push({
                            name: option, 
                            chose: false,
                        }); 
                    }); 
                }
            });

            this.setState({
                headerList: newHeaderList,
                optionList: newOptionList,
            });
        });

        getProductList().then(response => {
            this.setState({
                productList: response.data
            }, () => {
                // const totalPage = parseInt(this.state.productList.length / 10) + 1;
                // let temp = [];
                // for (let i = 1; i < totalPage + 1; i++) {
                //     temp.push(i);
                // }
                // this.setState({
                //     pageNumList: temp,
                // });
            });
        });
    }

    changePage(num) {
        if (num > 0 && num < this.state.pageNumList.length + 1) {
            this.setState({
                currentPage: num,
                showItems: {
                    start: 8 * (num-1), 
                    end: 8 * num,
                }
            });
        }
    }

    toggleOpening(e, header) {
        if (e.target.className.includes('option-item')) {
            return;
        }

        const newList = [...this.state.headerList];
        newList.forEach(newItem => {
            if (newItem === header) {
                newItem.isMenuOpening = !newItem.isMenuOpening;
            }
        });
        this.setState({
            headerList: newList,
        });
    }

    toggleSorting(header) {
        const newList = [...this.state.headerList];
        newList.forEach(newItem => {
            if (newItem === header) {
                newItem.isColumnIncreasing = !newItem.isColumnIncreasing;
            }
        });
        this.setState({
            headerList: newList,
        });
    }

    onOptionClick(headerId, target) {
        const newList = [...this.state.optionList];
        newList.forEach(newItem => {
            if (newItem.name === target) {
                newItem.chose = !newItem.chose;

                if(newItem.chose) {
                    const targetIdx = this.state.requestFilterList.findIndex(obj => obj.id === headerId);
                    if (targetIdx !== -1) {
                        this.state.requestFilterList[targetIdx].filter.push(newItem.name);
                    } else {
                        this.state.requestFilterList.push({
                            id: headerId,
                            filter: [newItem.name]
                        });
                    }
                }
            }
        });

        this.setState({
            optionList: newList,
        });
    }
}

export default ProductList;

const headerStyle = {
    backgroundColor: '#616161',
    color: 'rgba(256, 256, 256, 0.9)',
    borderRadius: 10,
}