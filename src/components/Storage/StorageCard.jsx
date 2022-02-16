import React from 'react';
import {
    Container, 
    Row,
    Col,
    Button
} from 'reactstrap';

import './StorageCard.css';

export default class StorageCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="storage-card-section">
                <Container>
                    <Button close className='close-btn' onClick={this.props.handleCloseOnClick}/>
                    <Row className='align-items-center mb-3'>
                        <Col lg={2} className='text-bold'>{this.props.data.manuInfo.category} {'>'} {this.props.data.manuInfo.name}</Col>
                        <Col>
                            <div className={'status-block status-'+this.props.data.manuInfo.status}>
                                {status_mapping[this.props.data.manuInfo.status]}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} style={{paddingRight: '35px'}} className='data-table'>
                            <Row className='header'>
                                <Col lg={12}>生產資料</Col>
                            </Row>
                            <Row>
                                <Col lg={4}>生產編號</Col>
                                <Col lg={8}>{this.props.data.manuInfo.manucode}</Col>
                            </Row>
                            <Row style={{padding: '8px 0'}} className='align-items-center'> 
                                <Col lg={4} style={{lineHeight: '24px'}}>標籤</Col>
                                <Col lg={8}>
                                    {this.props.data.manuInfo.tag.map((tag,i) => (
                                        <div key={tag} className='status-tag'>
                                            #{tag}
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                            <Row> 
                                <Col lg={4}>儲位</Col>
                                <Col lg={8}>{this.props.data.manuInfo.location}</Col>
                            </Row>
                            <Row> 
                                <Col lg={4}>零數</Col>
                                <Col lg={8}>{this.props.data.manuInfo.scatterqty}</Col>
                            </Row>
                            <Row> 
                                <Col lg={4}>總重 (kg)</Col>
                                <Col lg={8}>{this.props.data.manuInfo.totalqty}</Col>
                            </Row>
                            <Row> 
                                <Col lg={4}>生產日期</Col>
                                <Col lg={8}>{this.props.data.manuInfo.manudate}</Col>
                            </Row>
                        </Col>
                        <Col xs={6} style={{paddingLeft: '35px'}} className='data-table'>
                            <Row className='header'>
                                <Col>銷售資料</Col>
                            </Row>
                            <Row>
                                <Col lg={3} className='text-center'>銷售編號</Col>
                                <Col lg={3} className='text-center'>銷售(kg)</Col>
                                <Col lg={3} className='text-center'>日期</Col>
                            </Row>
                            {this.props.data.saleInfo.map(sale => (
                                <Row className='align-items-center' key={sale.salecode}>
                                    <Col lg={3} className='text-center'>{sale.salecode}</Col>
                                    <Col lg={3} className='text-center'>{sale.saleqty}</Col>
                                    <Col lg={3} className='text-center' style={{padding: '0'}}>{sale.saledate}</Col>
                                    <Col lg={3} style={{position: 'relative', height: '18px', display:'flex'}}>
                                        <div style={{margin: 'auto', display:'inline-block'}}>
                                            <Button className='btn'>品管資料</Button>
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const status_mapping = {
    normal: '庫存正常',
    expired_soon: '久置',
    expired: '過期',
    not_enough: '庫存不足',
    producing: '生產中'
  }