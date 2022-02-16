import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Input
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import './InsertByFile.css';

import { uploadProduct, getProductFileList, getProductExample, postProductFile } from 'api/warehouse-api.js';

class InsertSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          span_str: '',
          selectedFile: null,
          file_list: []
        }

        this.handleFileDownload = this.handleFileDownload.bind(this);
        this.handleExampleOnClick = this.handleExampleOnClick.bind(this);
        this.handleInputOnchange = this.handleInputOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
          <div className='insert-section-file'>
            <Container>
              <Button close className='close-btn' onClick={() => this.props.handleCloseOnClick(false)} style={{fontSize: '24px'}}/>
              <Row className='align-items-center mb-4'>
                <Col lg={12} className='text-bold'>上傳商品主檔 excel</Col>
              </Row>
              <Row className='download-table'>
                <Col className='download-table-header' xs={12}>
                  <Row>
                    <Col>上傳日期</Col>
                    <Col>檔案名稱</Col>
                    <Col>上傳者</Col>
                    <Col>檔案下載</Col>
                  </Row>
                </Col>
                <Col className='download-table-column' xs={12}>
                  {this.state.file_list.map(fl => (
                    <Row key={fl.uploader+fl.uploadtime+fl.filename}>
                      <Col>{fl.uploadtime}</Col>
                      <Col>{fl.filename}</Col>
                      <Col>{fl.uploader}</Col>
                      <Col><FontAwesomeIcon className='download-table-icon' icon={ faDownload } onClick={() => {this.handleFileDownload(fl.filename)}}/></Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Row className='justify-content-between'>
                <Col xs='auto' className='download-example d-flex align-items-center' onClick={this.handleExampleOnClick}>下載範例 excel&ensp;<FontAwesomeIcon icon={ faDownload } /></Col>
                <Col xs='auto'>
                  <div className='submit-filename'>{this.state.span_str}</div>
                  <Button color='success' type='button' className='fileinput-btn btn-mini'>
                    <Label for='submitFile'>{this.state.span_str == '' ? '選擇檔案': '上傳'}</Label>
                    {this.state.span_str == '' ?
                    <Input type='file' name='file' id='submitFile' onChange={this.handleInputOnchange}></Input> :
                    <div onClick={this.handleSubmit}></div>}
                  </Button>
                  <Button onClick={() => this.props.handleCloseOnClick(false)}>取消</Button>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }

    handleSubmit() {
      var formData = new FormData();
      formData.append('file', this.state.selectedFile)
      uploadProduct(this.props.token, formData).then(response => {
        console.log(response);
      })
    }

    handleFileDownload(filename) {
      postProductFile(this.props.token, {filename: filename}).then(blob => {
        const $a = document.createElement("a")
        const url = URL.createObjectURL(blob)
        $a.download = filename
        $a.href = url
        $a.click()
        setTimeout(() => URL.revokeObjectURL(url), 5000)
      })
    }

    handleExampleOnClick() {
      getProductExample(this.props.token).then(blob => {
        const $a = document.createElement("a")
        const url = URL.createObjectURL(blob)
        $a.download = '範例.xlsx'
        $a.href = url
        $a.click()
        setTimeout(() => URL.revokeObjectURL(url), 5000)
      })
    }

    handleInputOnchange(e){
      this.setState({
        span_str: e.target.files[0].name,
        selectedFile: e.target.files[0]
      })
    }

    componentDidMount() {
      getProductFileList(this.props.token).then(response => {
        if(response.status == "success") {
          this.setState({
            file_list: response.info
          })
        }
      })
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