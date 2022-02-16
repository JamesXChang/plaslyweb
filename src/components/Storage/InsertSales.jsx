import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Table
} from 'reactstrap';

import './InsertSales.css';

import { getSaleHeader, postSaleHeader, manu, postSales } from 'api/warehouse-api.js';

class InsertSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          category: '',
          series: '',
          name: '',
          manucode: '',
          status: '',
          manudate: '',
          salecode: '',
          saleqty: '',
          saledate: '',
          storeid: null,
        }

        this.handleCategoryOnChange = this.handleCategoryOnChange.bind(this);
        this.handleSeriesOnChange = this.handleSeriesOnChange.bind(this);
        this.handleNameOnChange = this.handleNameOnChange.bind(this);
        this.handleManucodeOnChange = this.handleManucodeOnChange.bind(this);

        this.handleSalecodeOnChange = this.handleSalecodeOnChange.bind(this);
        this.handleSaleqtyOnChange = this.handleSaleqtyOnChange.bind(this);
        this.handleSaledateOnChange = this.handleSaledateOnChange.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
          <div className='insert-section'>
            <Container>
              <Button close className='close-btn' onClick={() => this.props.handleCloseOnClick(false)} style={{fontSize: '24px'}}/>
              <Row className='align-items-center mb-4'>
                <Col lg={12} className='text-bold'>新增銷售</Col>
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
                        <th>狀態</th>
                        <th>生產日期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select id='category' value={this.state.category} onChange={this.handleCategoryOnChange}>
                            <option value='' disabled hidden>Select</option>
                            {this.state.data && this.state.data[0]['options'].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select id='series' value={this.state.series} onChange={this.handleSeriesOnChange}>
                            <option value='' disabled hidden>Select</option>
                            {this.state.data && this.state.data[1]['options'].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select id='name' value={this.state.name} onChange={this.handleNameOnChange}>
                            <option value='' disabled hidden>Select</option>
                            {this.state.data && this.state.data[2]['options'].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select id='manucode' value={this.state.manucode} onChange={this.handleManucodeOnChange}>
                            <option value='' disabled hidden>Select</option>
                            {this.state.data && this.state.data[3]['options'].map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <div className={'status-block status-'+this.state.status}>
                            {status_mapping[this.state.status]}
                          </div>
                        </td>
                        <td>{this.state.manudate}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr className='header'>
                        <th>銷售編號</th>
                        <th>銷售(KG)</th>
                        <th>日期</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input value={this.state.salecode} onChange={this.handleSalecodeOnChange}/></td>
                        <td><input type='number' value={this.state.saleqty} onChange={this.handleSaleqtyOnChange}/></td>
                        <td><input type='date' value={this.state.saledate} onChange={this.handleSaledateOnChange}/></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='justify-content-end'>
                <Col xs='auto'>
                  <Button color='success' onClick={this.handleSubmit}>確定</Button>
                  <Button color='link' onClick={() => this.props.handleCloseOnClick(false)}>取消</Button>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
    
    handleCategoryOnChange(e) {
      this.setState({
        category: e.target.value
      })
      postSaleHeader(this.props.token, {category: e.target.value}).then(response => {
        console.log(response);
        if(response.status == "success") {
          this.setState({
            data: response.info
          })
        }
      })
    }

    handleSeriesOnChange(e) {
      this.setState({
        series: e.target.value
      })
      postSaleHeader(this.props.token, {series: e.target.value}).then(response => {
        if(response.status == "success") {
          this.setState({
            data: response.info,
            category: response.info[0]['options'][0]
          })
        }
      })
    }

    handleNameOnChange(e) {
      this.setState({
        name: e.target.value
      })
      postSaleHeader(this.props.token, {name: e.target.value}).then(response => {
        if(response.status == "success") {
          this.setState({
            data: response.info,
            category: response.info[0]['options'][0],
            series: response.info[1]['options'][0]
          })
        }
      })
    }

    handleManucodeOnChange(e) {
      this.setState({
        manucode: e.target.value
      })
      manu(this.props.token, {manucode: e.target.value}).then(response =>{
        console.log(response.info)
        if(response.status == "success") {
          this.setState({
            status: response.info.manuInfo.status,
            manudate: response.info.manuInfo.manudate,
            storeid: response.info.manuInfo.storeid,
          })
        }
      })
      postSaleHeader(this.props.token, {manucode: e.target.value}).then(response => {
        if(response.status == "success") {
          this.setState({
            data: response.info,
            category: response.info[0]['options'][0],
            series: response.info[1]['options'][0],
            name: response.info[2]['options'][0]
          })
        }
      })
    }

    handleSalecodeOnChange(e) {
      this.setState({
        salecode: e.target.value
      })
    }

    handleSaleqtyOnChange(e) {
      this.setState({
        saleqty: e.target.value
      })
    }

    handleSaledateOnChange(e) {
      this.setState({
        saledate: e.target.value
      })
    }

    handleSubmit() {
      var data = {
        storeid: this.state.storeid,
        salecode: this.state.salecode,
        saleqty: this.state.saleqty,
        saledate: this.state.saledate
      }
      postSales(this.props.token, data).then(response => {
        if(response.status == "success") {
          this.props.handleCloseOnClick(true);
        }
      })
    }

    componentDidMount() {
      getSaleHeader(this.props.token).then(response => {
        if(response.status == "success") {
          this.setState({
            data: response.info
          })
        }
    });
    }
}

export default connect(state=>{
  return {
      ...state.token,
      table: state.table
  }
})(InsertSales);

const status_mapping = {
  normal: '庫存正常',
  expired_soon: '久置',
  expired: '過期',
  not_enough: '庫存不足',
  producing: '生產中'
}