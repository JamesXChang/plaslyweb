import React from 'react';
import {
  Row,
  Col 
} from 'reactstrap';

import './CategoryCard.css';

class CategoryCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const percentage = Math.round((this.props.sale / this.props.storage)*100);
        const percentage_class = (percentage < 20) ? 'text-green' :
                                 (percentage < 60) ? 'text-yellow' :
                                 'text-red'
        return (
          <Row className='category-card justify-content-center align-items-center'>
            <Col className='title' xs='auto'>{this.props.category}</Col>
            <Col xs='auto'>
              <div className={'percentage '+percentage_class}>{percentage+'%'}</div>
            </Col>
            <Col xs='auto' className='content'>
              <div>庫存：{this.props.storage} kg</div>
              <div>銷售：{this.props.sale} kg</div>
            </Col>
          </Row>
        );
    }

    componentDidMount() {

    }
}

export default CategoryCard;
