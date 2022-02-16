import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import CategoryCard from 'components/Storage/CategoryCard.jsx';
import StorageTable from 'components/Storage/StorageTable.jsx';

import './Storage.css';

import { user, category } from 'api/warehouse-api.js';

import { tableSet } from 'states/table-action.js';

class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: []
        };

        // this.handleCategoryOnClick = this.handleCategoryOnClick.bind(this);
    }

    render() {
        return (
            <div>
              <Row>
                <Col><h3 className='storage-title'>倉儲管理</h3></Col>
              </Row>
              {/* <Row className='category-card-container-row'>
                {this.state.user_data.map( d => (
                  <Col className='category-card-container-col' key={d.category}
                      onClick={()=>this.handleCategoryOnClick(d.category)}>
                    <CategoryCard category={d.category} width={66} height={30} storage={d.storage_qty} sale={d.sale_qty}/>
                  </Col>
                ))}
              </Row> */}
              <StorageTable handleRedirect={()=>{}} num_elem={15}/>
            </div>
        );
    }

    extractHeader(data) {
        var header_list = [];
        for(var key in data[0]) {
            header_list.push(key);
        }
        return header_list
    }

    // handleCategoryOnClick(c) {
    //     category(this.props.token, {category: c}).then(response => {
    //         if(response.status == "success") {
    //             var header_list = this.extractHeader(response.info);
    //             this.props.dispatch(tableSet(header_list, response.info));
    //         }
    //     })
    // }

    componentDidMount() {
        user(this.props.token).then(response => {
            if(response.status == "success") {
                this.setState({
                    user_data: response.info
                })
            }
        })
    }
}

export default connect(state=>{
    return {
        ...state.token
    }
})(Storage);