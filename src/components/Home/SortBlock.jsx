import React from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router";

import './SortBlock.css';

class SortBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onSortBlockClick = this.onSortBlockClick.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                {(!Array.isArray(this.props.block.bgImg)) 
                    ? <Col xs="3">
                        <div style={{ height: '324px', backgroundImage: `url( ${this.props.block.bgImg} )`, color: `${this.props.block.color}` }}
                                className="block-style" onClick={ this.onSortBlockClick }>
                            <div className="d-flex p-3 justify-content-between">
                                <h3>{ this.props.block.title }</h3>
                                <span className="fa-layers fa-stack like-stack">
                                    <FontAwesomeIcon icon={ faCircle } size="2x" />
                                    <FontAwesomeIcon icon={ faThumbtack } style={{ color: "#fff" }}/>
                                </span>
                            </div>
                        </div>
                    </Col> 
                    : <Col xs="6">{
                        this.props.block.bgImg.map((img, index) =>
                            <div style={{ height: '150px', backgroundImage: `url( ${img} )`, color: `${this.props.block.color[index]}` }}
                                    className="block-style" key={ index } onClick={ this.onSortBlockClick }>
                                {(this.props.block.likeIcon[index])
                                    ? <div className="d-flex p-3 justify-content-between">
                                            <h3>{ this.props.block.title[index] }</h3>
                                            <span className="fa-layers fa-stack like-stack">
                                                <FontAwesomeIcon icon={ faCircle } size="2x" />
                                                <FontAwesomeIcon icon={ faThumbtack } style={{ color: "#fff" }}/>
                                            </span>
                                        </div>
                                    : <div className="d-flex h-100 align-items-center justify-content-center">
                                        <h2>{ this.props.block.title[index] }</h2>
                                    </div>
                                }                               
                            </div>
                        )
                    }
                    </Col>
                }
            </React.Fragment>
        );
    }

    onSortBlockClick() {
        this.props.history.push('/product-list');
    }
}

export default withRouter(SortBlock);