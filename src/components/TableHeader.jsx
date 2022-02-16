import React from 'react';
import { Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaDownAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

import './TableHeader.css';

class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.getOptionState = this.getOptionState.bind(this);
    }

    render() {
        return (
            <Row className="p-2 mb-3 align-items-center" style={ this.props.bgStyle }>
                {this.props.headerList.map(header => 
                    <Col key={ header.id } className="header-col">
                        <Dropdown isOpen={ header.isMenuOpening } toggle={(e) => this.props.toggleOpening(e, header)}>
                            <DropdownToggle caret className="px-0">
                                { header.name }
                            </DropdownToggle>
                            <DropdownMenu>
                                {!header.isColumnIncreasing
                                    ? <React.Fragment>
                                        <DropdownItem header>
                                            排序(目前:遞減)
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.props.toggleSorting(header)}>
                                            <FontAwesomeIcon icon={ faSortAlphaDown } className="me-2"/>
                                            遞增
                                        </DropdownItem>
                                    </React.Fragment>
                                    : <React.Fragment>
                                        <DropdownItem header>
                                            排序(目前:遞增)
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.props.toggleSorting(header)}>
                                            <FontAwesomeIcon icon={ faSortAlphaDownAlt } className="me-2"/>
                                            遞減
                                        </DropdownItem>
                                    </React.Fragment>
                                }
                                {(header.options) && 
                                    <div>
                                        <DropdownItem divider />
                                        <DropdownItem header>
                                            篩選
                                        </DropdownItem>
                                        {header.options.map((option, idx) => 
                                            <DropdownItem key={ idx } className="option-item" onClick={() => this.props.onOptionClick(header.id, option)}>
                                                <FontAwesomeIcon icon={ faCheck } className={`${!this.getOptionState(option) && 'invisible'} me-2`} style={{ width: '12px' }}/>
                                                { option }
                                            </DropdownItem>
                                        )}
                                    </div>
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                )}
                <Col/>
            </Row>
        );
    }

    // initHeaderState() {
    //     const newHeaderList = this.props.headerList.map(header => {
    //         return {
    //             ...header,
    //             isMenuOpening: false,
    //             isColumnIncreasing: true,
    //         }
    //     });

    //     return newHeaderList;
    // }

    // initOptionState() {
    //     const newOptions = [];

    //     this.props.headerList.forEach(header => {
    //         if(header.options) {
    //             header.options.forEach(option => {
    //                 newOptions.push({
    //                     name: option, 
    //                     chose: false,
    //                 }); 
    //             }); 
    //         }
    //     });

    //     return newOptions;
    // }

    // toggleOpening(e, header) {
    //     if (e.target.className.includes('option-item')) {
    //         return;
    //     }

    //     const newList = [...this.state.headerStateList];
    //     newList.forEach(newItem => {
    //         if (newItem === header) {
    //             newItem.isMenuOpening = !newItem.isMenuOpening;
    //         }
    //     });
    //     this.setState({
    //         headerStateList: newList,
    //     });
    // }

    // toggleSorting(header) {
    //     const newList = [...this.state.headerStateList];
    //     newList.forEach(newItem => {
    //         if (newItem === header) {
    //             newItem.isColumnIncreasing = !newItem.isColumnIncreasing;
    //         }
    //     });
    //     this.setState({
    //         headerStateList: newList,
    //     });
    // }

    getOptionState(target) {
        const idx = this.props.optionList.findIndex(option => option.name === target);
        return this.props.optionList[idx].chose;
    }

    // onOptionClick(headerId, target) {
    //     const newList = [...this.state.optionStateList];
    //     newList.forEach(newItem => {
    //         if (newItem.name === target) {
    //             newItem.chose = !newItem.chose;

    //             if(newItem.chose) {
    //                 const targetIdx = this.state.requestFilterArr.findIndex(obj => obj.id === headerId);
    //                 if (targetIdx !== -1) {
    //                     this.state.requestFilterArr[targetIdx].filter.push(newItem.name);
    //                 } else {
    //                     this.state.requestFilterArr.push({
    //                         id: headerId,
    //                         filter: [newItem.name]
    //                     });
    //                 }
    //             }
    //         }
    //     });

    //     this.setState({
    //         optionStateList: newList,
    //     });
    // }
}

export default TableHeader;