import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Histogram from 'components/Charts/Histogram.jsx';
import PieChart from 'components/Charts/PieChart.jsx';
import StorageTable from 'components/Storage/StorageTable.jsx';

import './Storage.css';

import { user, basic, category, status } from 'api/warehouse-api.js';

import { tableSet } from 'states/table-action.js';
import { filterUnset, filterSet } from 'states/filter-action';
import { optionUnset } from 'states/option-action';

class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: [],
            redirect: false,
        };

        this.handleCategoryOnClick = this.handleCategoryOnClick.bind(this);
        this.handlePieChartOnClick = this.handlePieChartOnClick.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    render() {
        if(this.props.token == '') {
            return(
                <Redirect to='/login' />
            )
        }

        if(this.state.redirect) {
            return(
                <Redirect to='/warehouse_table' />
            )
        }
    
        return (
            <div>
                <Row>
                    <Col><h3 className='storage-title'>倉儲管理</h3></Col>
                </Row>
                <Row className='mb-4'>
                    <Col lg={7}>
                        <div className='storage-hist'>
                            <Row className='pt-3'>
                                <Col lg={{size: 7, offset: 1}}>庫存狀態</Col>
                                <Col lg={4}>時間: 月</Col>
                            </Row>
                            <hr/>
                            {this.state.user_data.length > 1 && <Histogram data={this.state.user_data} height={270}
                                                                handleCategoryOnClick={this.handleCategoryOnClick}/>}
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className='storage-circle'>
                            <Row className='pt-3'>
                                <Col lg={{size: 11, offset: 1}}>庫存狀態</Col>
                            </Row>
                            <hr />
                            <div className='storage-canvas-container'>
                                <PieChart radius={100} handleOnClick={this.handlePieChartOnClick}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <StorageTable handleRedirect={this.handleRedirect} num_elem={5}/>
            </div>
        );
    }

    handleRedirect() {
        this.setState({
            redirect: true,
        })
    }

    handleCategoryOnClick(c) {
        category(this.props.token, {category: c}).then(response => {
            if(response.status == "success") {
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info));
                this.handleRedirect();
            }
        })
    }

    
    handlePieChartOnClick(s) {
        status(this.props.token, {status: s}).then(response => {
            if(response.status == "success") {
                this.props.dispatch(filterSet('status', s));
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info));
                this.handleRedirect();
            }
        })
    }

    extractHeader(data) {
        var header_list = [];
        for(var key in data[0]) {
            header_list.push(key);
        }
        return header_list
    }

    componentDidMount() {
        user(this.props.token).then(response => {
            if(response.status == "success") {
                this.setState({
                    user_data: response.info
                })
            }
        });
        basic(this.props.token, {}).then(response => {
            if(response.status == "success") {
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info))
            }
        });
        this.props.dispatch(filterUnset());
        this.props.dispatch(optionUnset());
    }
}

export default connect(state=>{
    return {
        ...state.token,
        table: state.table,
        ...state.filter,
    }
})(Storage);