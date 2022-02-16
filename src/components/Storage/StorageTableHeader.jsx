import React from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaDownAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './StorageTableHeader.css';

class StorageTableHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            ascending: false,
        }

        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.isChosenOption = this.isChosenOption.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
    }

    render() {
        if (this.props.manucodeLevel && 
            (this.props.h === "category" || this.props.h === "series" || this.props.h === "name" || this.props.h === "status" || this.props.h === "tag")) {
            return (
                <th>{header_mapping[this.props.h]}</th>
            );
        }
            
        var id = this.props.h == "category" ? 0 :
            this.props.h == "series" ? 1 :
            this.props.h == "name" ? 2 : false;
        return (
            <th>
                <Dropdown toggle={this.handleDropdownToggle} isOpen={this.state.isOpen}>
                    <DropdownToggle caret className="px-0">
                        {header_mapping[this.props.h]}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.ascending && <DropdownItem onClick={this.toggleSorting}>
                            <FontAwesomeIcon icon={faSortAlphaDown} className="me-2" />
                            遞增
                        </DropdownItem>}
                        {!this.state.ascending && <DropdownItem onClick={this.toggleSorting}>
                            <FontAwesomeIcon icon={faSortAlphaDownAlt} className="me-2"/>
                            遞減
                        </DropdownItem>}
                        {this.props.header_list[id] &&
                            <React.Fragment>
                                <DropdownItem divider />
                                <DropdownItem header>
                                    篩選
                                </DropdownItem>
                                {this.props.header_list[id].options.map(option => (
                                    <DropdownItem key={option} onClick={() => this.props.handleOptions(this.props.h, option)}>
                                        <FontAwesomeIcon icon={faCheck} className={`${!this.isChosenOption(this.props.h, option) && 'invisible'} me-1`} style={{ width: '12px' }} />
                                        {option}
                                    </DropdownItem>
                                ))}
                            </React.Fragment>
                        }
                    </DropdownMenu>
                </Dropdown>
            </th>
        );
    }

    handleDropdownToggle() {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    }

    isChosenOption(cond, option) {
        if(Object.keys(this.props.chosenOptions).includes(cond)) {
            let arr = this.props.chosenOptions[cond].split(', ');
            if(arr.includes(option)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    toggleSorting() {
        this.setState(prevState => ({
            ascending: !prevState.ascending,
        }), () => {
            this.props.handleSorting(this.props.h, this.state.ascending);
        });
    }

    componentDidMount() {
    }
}

export default connect(state => {
    return {
        ...state.option,
    }
})(StorageTableHeader);

const header_mapping = {
    category: "類別",
    series: "產品系列",
    name: "產品",
    storage_qty: "庫存",
    sale_qty: "銷量",
    manucode: "生產批號",
    location: "儲位",
    scatterqty: "零數",
    totalqty: "總重",
    saleqty: "銷售",
    manudate: "生產日期",
    status: "狀態",
    tag: "標籤"
}