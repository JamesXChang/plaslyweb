import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Button,
    Table
} from 'reactstrap';

import './InsertStorage.css';

import { getStoreHeader, postStoreHeader, postStorage } from 'api/warehouse-api.js';

class InsertStorage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            dataCategory: null,
            dataSeries: null,
            dataName: null,
            category: '',
            series: '',
            name: '',
            manucode: '',
            location: '',
            scatterqty: '',
            totalqty: '',
            manudate: '',
            tag: ''
        }

        this.handleCategoryOnChange = this.handleCategoryOnChange.bind(this);
        this.handleCategoryOnBlur = this.handleCategoryOnBlur.bind(this);

        this.handleSeriesOnChange = this.handleSeriesOnChange.bind(this);
        this.handleSeriesOnBlur = this.handleSeriesOnBlur.bind(this);

        this.handleNameOnChange = this.handleNameOnChange.bind(this);
        this.handleNameOnBlur = this.handleNameOnBlur.bind(this);

        this.handleManucodeOnChange = this.handleManucodeOnChange.bind(this);
        this.handleManudateOnChange = this.handleManudateOnChange.bind(this);
        this.handleScatterqtyOnChange = this.handleScatterqtyOnChange.bind(this);
        this.handleTotalqtyOnChange = this.handleTotalqtyOnChange.bind(this);
        this.handleLocationOnChange = this.handleLocationOnChange.bind(this);
        this.handleTagOnChange = this.handleTagOnChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className='insert-section'>
                <Container>
                    <Button close className='close-btn' onClick={() => this.props.handleCloseOnClick(false)} style={{ fontSize: '24px' }} />
                    <Row className='align-items-center mb-4'>
                        <Col lg={12} className='text-bold'>新增庫存</Col>
                    </Row>
                    <Row>
                        <Col xs={12} className='data-table'>
                            <Table>
                                <thead>
                                    <tr className='header'>
                                        <th>類別</th>
                                        <th>產品系列</th>
                                        <th>產品</th>
                                        <th>生產編號</th>
                                        <th>生產日期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" list='category' name='category' value={this.state.category}
                                                onChange={this.handleCategoryOnChange} onBlur={this.handleCategoryOnBlur} autoFocus/>
                                            <datalist id='category'>
                                                {this.state.dataCategory && this.state.dataCategory.map(option => (
                                                    <option key={option} value={option} />
                                                ))}
                                            </datalist>
                                        </td>
                                        <td>
                                            <input list='series' name='series' value={this.state.series}
                                                onChange={this.handleSeriesOnChange} onBlur={this.handleSeriesOnBlur} />
                                            <datalist id='series'>
                                                {this.state.dataSeries && this.state.dataSeries.map(option => (
                                                    <option key={option} value={option} />
                                                ))}
                                            </datalist>
                                        </td>
                                        <td>
                                            <input list='name' name='name' value={this.state.name}
                                                onChange={this.handleNameOnChange} onBlur={this.handleNameOnBlur} />
                                            <datalist id='name'>
                                                {this.state.dataName && this.state.dataName.map(option => (
                                                    <option key={option} value={option} />
                                                ))}
                                            </datalist>
                                        </td>
                                        <td><input value={this.state.manucode} onChange={this.handleManucodeOnChange} /></td>
                                        <td><input type='date' value={this.state.manudate} onChange={this.handleManudateOnChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table>
                                <thead>
                                    <tr className='header'>
                                        <th>零數(KG)</th>
                                        <th>總重(KG)</th>
                                        <th>儲位</th>
                                        <th>標籤</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type='number' value={this.state.scatterqty} onChange={this.handleScatterqtyOnChange} /></td>
                                        <td><input type='number' value={this.state.totalqty} onChange={this.handleTotalqtyOnChange} /></td>
                                        <td><input value={this.state.location} onChange={this.handleLocationOnChange} /></td>
                                        <td><input value={this.state.tag} onChange={this.handleTagOnChange} /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className='justify-content-end'>
                        <Col xs='auto'>
                            <Button color='primary' onClick={this.handleSubmit}>確定</Button>
                            <Button color='link' onClick={() => this.props.handleCloseOnClick(false)}>取消</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    handleCategoryOnChange(e) {
        if(!e.target.value) {
            this.setState({
                series: '',
                name: '',
            });
            getStoreHeader(this.props.token).then(response => {
                if (response.status == "success") {
                    this.setState({
                        dataCategory: response.info[0]['options'],
                        dataSeries: response.info[1]['options'],
                        dataName: response.info[2]['options'],
                    })
                }
            });
            console.log(e);
        }
        this.setState({
            category: e.target.value
        });
    }

    handleCategoryOnBlur(e) {
        this.setState({
            category: e.target.value
        }, () => {
            postStoreHeader(this.props.token, { category: this.state.category }).then(response => {
                if (response.status == "success") {
                    this.setState({
                        dataSeries: response.info[1]['options'],
                        dataName: response.info[2]['options'],
                    })
                }
            })
        });

    }

    handleSeriesOnChange(e) {
        if(!e.target.value) {
            this.setState({
                name: '',
            });
            postStoreHeader(this.props.token, { category: this.state.category }).then(response => {
                if (response.status == "success") {
                    this.setState({
                        dataSeries: response.info[1]['options'],
                        dataName: response.info[2]['options'],
                    })
                }
            })
        }
        this.setState({
            series: e.target.value
        })
    }

    handleSeriesOnBlur() {
        postStoreHeader(this.props.token, { series: this.state.series }).then(response => {
            if (response.status == "success") {
                this.setState((prevState) => {
                    return {
                        dataName: response.info[2]['options'],
                        category: response.info[0]['options'][0] || prevState.category
                    }
                })
            }
        })
    }

    handleNameOnChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleNameOnBlur() {
        postStoreHeader(this.props.token, { name: this.state.name }).then(response => {
            if (response.status == "success") {
                this.setState((prevState) => {
                    return {
                        dataName: response.info[2]['options'],
                        category: response.info[0]['options'][0] || prevState.category,
                        series: response.info[1]['options'][0] || prevState.series
                    }
                })
            }
        })
    }

    handleManucodeOnChange(e) {
        this.setState({
            manucode: e.target.value
        })
    }

    handleManudateOnChange(e) {
        this.setState({
            manudate: e.target.value
        })
    }

    handleScatterqtyOnChange(e) {
        this.setState({
            scatterqty: e.target.value
        })
    }

    handleTotalqtyOnChange(e) {
        this.setState({
            totalqty: e.target.value
        })
    }

    handleLocationOnChange(e) {
        this.setState({
            location: e.target.value
        })
    }

    handleTagOnChange(e) {
        this.setState({
            tag: e.target.value
        })
    }

    handleSubmit() {
        var data = {
            category: this.state.category,
            series: this.state.series,
            name: this.state.name,
            manucode: this.state.manucode,
            location: this.state.location,
            scatterqty: this.state.scatterqty,
            totalqty: this.state.totalqty,
            manudate: this.state.manudate,
            tag: this.state.tag
        }
        console.log(data);
        postStorage(this.props.token, data).then(response => {
            console.log(response);
            if (response.status == "success") {
                this.props.handleCloseOnClick(true);
            }
        })
    }

    componentDidMount() {
        getStoreHeader(this.props.token).then(response => {
            if (response.status == "success") {
                this.setState({
                    dataCategory: response.info[0]['options'],
                    dataSeries: response.info[1]['options'],
                    dataName: response.info[2]['options'],
                })
            }
        });
    }
}

export default connect(state => {
    return {
        ...state.token,
        table: state.table
    }
})(InsertStorage);
