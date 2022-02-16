import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Input, Row, Col, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisH, faUpload } from '@fortawesome/free-solid-svg-icons';
import StorageCard from 'components/Storage/StorageCard.jsx';
import StorageTableHeader from 'components/Storage/StorageTableHeader.jsx';
import InsertStorage from 'components/Storage/InsertStorage.jsx';
import InsertSales from 'components/Storage/InsertSales.jsx';
import InsertByFile from 'components/Storage/InsertByFile.jsx';

import './StorageTable.css';

import { product, tag, manu, deleteStorage, getStoreHeader, postStoreHeader, basic, status, getNewestStorage } from 'api/warehouse-api.js';

import { tableSet } from 'states/table-action.js';
import { filterSet } from 'states/filter-action.js';
import { optionSet } from 'states/option-action.js';

class StorageTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardOpen: false,
            cardData: {},
            insertFile: false,
            insertStorageOpen: false,
            insertSalesOpen: false,
            delModalOpen: false,
            clickedName: '',
            clickedId: -1,
            header_list: [],
            page: 0,
        }

        this.handleProductOnClick = this.handleProductOnClick.bind(this);
        this.handleMoreOnClick = this.handleMoreOnClick.bind(this);
        this.handleTagOnClick = this.handleTagOnClick.bind(this);
        this.handleDelOnClick = this.handleDelOnClick.bind(this);
        this.handleDelConfirmOnClick = this.handleDelConfirmOnClick.bind(this);
        this.handleCloseOnClick = this.handleCloseOnClick.bind(this);
        this.handleSettingOnClick = this.handleSettingOnClick.bind(this);
        this.handleInsertStorageOpen = this.handleInsertStorageOpen.bind(this);
        this.handleInsertStorageClose = this.handleInsertStorageClose.bind(this);
        this.handleInsertSalesOpen = this.handleInsertSalesOpen.bind(this);
        this.handleInsertSalesClose = this.handleInsertSalesClose.bind(this);
        this.handleInsertFileOpen = this.handleInsertFileOpen.bind(this);
        this.handleInsertFileClose = this.handleInsertFileClose.bind(this);
        this.handlePrevOnClick = this.handlePrevOnClick.bind(this);
        this.handleNextOnClick = this.handleNextOnClick.bind(this);
        this.handleOptions = this.handleOptions.bind(this);

        this.refreshAfterCreate = this.refreshAfterCreate.bind(this);
        this.refreshAfterDelete = this.refreshAfterDelete.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
    }

    render() {
        if (this.props.token == '') {
            return (
                <Redirect to='/login' />
            )
        }

        var id_min, id_max;
        id_min = this.state.page * this.props.num_elem + 1;
        id_max = Math.min((this.state.page + 1) * this.props.num_elem, this.props.table.data.length);

        return (
            <div className='storage-table-container'>
                <Row className='justify-content-between'>
                    <Col xs='auto'>
                        <div className="search-icon mx-3">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <Input name="searchBar" id="searchBar" type="text"
                            className="px-5 search-bar" placeholder="Search store" />
                    </Col>
                    <Col className='btn-container' xs='auto'>
                        <Button color="link" onClick={this.handleInsertFileOpen}><FontAwesomeIcon icon={faUpload} /> 上傳商品主檔</Button>
                        {/* <Button color="link"><FontAwesomeIcon icon={ faArrowUp } style={{transform: 'rotate(45deg)'}}/> 輸出</Button> */}
                        <Button color="success" onClick={this.handleInsertSalesOpen}><FontAwesomeIcon icon={faPlus} /> 新增銷售</Button>
                        <Button color="primary" onClick={this.handleInsertStorageOpen}><FontAwesomeIcon icon={faPlus} /> 新增庫存</Button>
                    </Col>
                </Row>
                <Table className='storage-table'>
                    <thead>
                        <tr>
                            {this.props.table.header.map(h => (
                                this.state.header_list && 
                                Object.keys(header_mapping).includes(h) &&
                                <StorageTableHeader key={h} h={h} header_list={this.state.header_list} manucodeLevel={!!this.props.table.header.includes('manucode')}
                                    handleOptions={this.handleOptions} handleSorting={this.handleSorting}/>
                            ))}
                            <th>設定</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.table.data.map((d, i) => (
                            (i >= id_min - 1 && i < id_max) &&
                            <tr key={d.name + d.manucode} className='storage-table-row' onClick={() => this.handleProductOnClick(d)}>
                                {this.props.table.header.map(h => (
                                    (h != "storeid") &&
                                    (h == "status" ?
                                        <td key={h}>
                                            <div className={'status-block status-' + d[h]}>
                                                {status_mapping[d[h]]}
                                            </div>
                                        </td> :
                                    (h == "tag") ?
                                        <td key={h}>
                                            {d[h].length > 0 && <div className='status-tag'
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.handleTagOnClick(d[h][0]) }}>
                                                    #{d[h][0]}
                                                </div>
                                            }
                                            {d[h].length > 1 && <UncontrolledButtonDropdown size="sm" className="status-tag" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                <DropdownToggle>
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {d[h] && d[h].map((tag, i) => (
                                                        (i !== 0) && <DropdownItem key={d.name + d.manucode + tag + i}
                                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.handleTagOnClick(tag) }}>
                                                            #{tag}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>}
                                        </td> :
                                    <td key={h}>{d[h]}</td>)
                                ))}
                                <td style={{ padding: '4px 8px' }}>
                                    <UncontrolledButtonDropdown size="sm" className="setting-btn" onClick={(e) => { e.stopPropagation(); this.handleSettingOnClick(d) }}>
                                        <DropdownToggle>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {(d.manucode) && <DropdownItem>
                                                編輯
                                            </DropdownItem>}
                                            <DropdownItem onClick={this.handleDelOnClick}>
                                                刪除
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
                <Row className='justify-content-between mb-3'>
                    <Col xs={'auto'}>{id_min}-{id_max} / {Object.keys(this.props.table.data).length} result(s)</Col>
                    {this.props.num_elem == 5 ?
                        <Col xs={'auto'}><Button color="link" className='more-btn' onClick={this.handleMoreOnClick}>More</Button></Col> :
                        <Col xs={'auto'}>
                            <Button color="link" className='prev-btn' onClick={this.handlePrevOnClick} disabled={id_min == 1}>Prev</Button>
                            <Button color="link" className='next-btn' onClick={this.handleNextOnClick} disabled={id_max == this.props.table.data.length}>Next</Button>
                        </Col>}
                </Row>
                {this.state.cardOpen && <StorageCard handleCloseOnClick={this.handleCloseOnClick} data={this.state.cardData} />}
                {this.state.insertFile && <InsertByFile handleCloseOnClick={this.handleInsertFileClose} />}
                {this.state.insertStorageOpen && <InsertStorage handleCloseOnClick={this.handleInsertStorageClose} />}
                {this.state.insertSalesOpen && <InsertSales handleCloseOnClick={this.handleInsertSalesClose} />}

                <Modal centered size="sm" isOpen={this.state.delModalOpen} toggle={this.handleDelOnClick}>
                    <ModalHeader>
                        是否確認要刪除該庫存單？
                    </ModalHeader>
                    <ModalBody>
                        warning
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleDelOnClick}>
                            取消
                        </Button>
                        {' '}
                        <Button color="danger" onClick={this.handleDelConfirmOnClick}>
                            確認
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    extractHeader(data) {
        var header_list = [];
        for (var key in data[0]) {
            header_list.push(key);
        };

        if(header_list.includes('manucode')) {
            let delTarget = ['category', 'series', 'location', 'scatterqty', 'status'];
            header_list = header_list.filter(header => {
                return !delTarget.includes(header);
            });
            header_list.splice(2, 0, 'status');
        };

        return header_list;
    }

    handleCloseOnClick() {
        this.setState({
            cardOpen: false,
        });
    }

    handleProductOnClick(d) {
        if ("manucode" in d) {
            manu(this.props.token, { manucode: d.manucode }).then(response => {
                if (response.status == "success") {
                    this.setState({
                        cardOpen: true,
                        cardData: response.info,
                    });
                }
            })
        } else {
            product(this.props.token, { name: d.name }).then(response => {
                if (response.status == "success") {
                    this.props.dispatch(filterSet('product', d.name));
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            })
        }
    }

    handleMoreOnClick() {
        this.props.handleRedirect();
    }

    handleDelOnClick() {
        this.setState(prev => ({
            delModalOpen: !prev.delModalOpen,
        }));
    }

    handleDelConfirmOnClick() {
        if (!this.state.clickedId) {
            deleteStorage(this.props.token, { productname: this.state.clickedName }).then(response => {
                if (response.status == "success") {
                    this.setState(prev => ({
                        delModalOpen: !prev.delModalOpen,
                    }), () => {
                        this.refreshAfterDelete();
                    });
                }
            });
        } else {
            deleteStorage(this.props.token, { storeid: this.state.clickedId }).then(response => {
                if (response.status == "success") {
                    this.setState(prev => ({
                        delModalOpen: !prev.delModalOpen,
                    }), () => {
                        this.refreshAfterDelete();
                    });
                }
            });
        }
    }

    handleTagOnClick(t) {
        console.log('handle tag on click', t);
        tag(this.props.token, { tag: t }).then(response => {
            if (response.status == "success") {
                this.props.dispatch(filterSet('tag', t));
                console.log(response.info);
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info));
                this.props.handleRedirect();
            }
        })
    }

    handleSettingOnClick(d) {
        this.setState({
            clickedId: d.storeid,
            clickedName: d.name,
        });
    }

    handleInsertStorageOpen() {
        this.setState({
            insertStorageOpen: true,
        })
    }

    handleInsertStorageClose(dirty) {
        this.setState({
            insertStorageOpen: false,
        }, () => {
            if (dirty) {
                this.refreshAfterCreate();
            }
        })
    }

    handleInsertSalesOpen() {
        this.setState({
            insertSalesOpen: true,
        })
    }

    handleInsertSalesClose(dirty) {
        this.setState({
            insertSalesOpen: false,
        }, () => {
            if (dirty) {
                this.refreshAfterCreate();
            }
        })
    }

    handleInsertFileOpen() {
        this.setState({
            insertFile: true,
        })
    }

    handleInsertFileClose(dirty) {
        this.setState({
            insertFile: false,
        }, () => {
            if (dirty) {
                this.refreshAfterCreate();
            }
        })
    }

    handlePrevOnClick() {
        if (this.state.page == 0) return;
        this.setState((prevState) => {
            return {
                page: prevState.page - 1
            }
        })
    }

    handleNextOnClick() {
        if (this.state.page == Math.floor(this.props.table.data.length / this.props.num_elem)) return;
        this.setState((prevState) => {
            return {
                page: prevState.page + 1
            }
        })
    }

    handleOptions(cond, option) {
        let obj = {};
        obj[cond] = option;
        postStoreHeader(this.props.token, obj).then(response => {
            if (response.status == "success") {
                let newHeaderList = Object.assign({}, this.state.header_list);
                newHeaderList[1].options = response.info[1]['options'];
                newHeaderList[2].options = response.info[2]['options'];
                this.setState({
                    header_list: newHeaderList,
                });
            }
        });

        let newOptions = Object.assign({}, this.props.chosenOptions);

        if(Object.keys(newOptions).includes(cond)) {
            let arr = newOptions[cond].split(', ');
            let idx = arr.indexOf(option);
            if(idx !== -1) {
                arr.splice(idx, 1);
                newOptions[cond] = arr.join(', ');
            } else {
                newOptions[cond] = newOptions[cond].concat(', ', option);
            }
        } else {
            newOptions[cond] = option;
        }
        this.props.dispatch(optionSet(newOptions));
        console.log(newOptions);
        basic(this.props.token, newOptions).then(response => {
            if (response.status == "success") {
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info));
                // this.props.handleRedirect();
            }
        });
    }

    handleSorting(cond, ascending) {
        let newOptions = {};
        if (this.props.filter.cond === 'product') {
            newOptions = { name: this.props.filter.name };
        } else if(this.props.filter.cond === 'tag') {
            newOptions = { tag: this.props.filter.name };
        } else if(this.props.filter.cond === 'status') {
            newOptions = { status: this.props.filter.name };
        } else {
            newOptions = Object.assign({}, this.props.chosenOptions);
        }
        newOptions['ascending'] = ascending;
        newOptions['sort'] = cond;

        this.props.dispatch(optionSet(newOptions));
        console.log(newOptions);

        if (this.props.filter.cond === 'product') {
            product(this.props.token, newOptions).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            });
        } else if (this.props.filter.cond === 'tag') {
            tag(this.props.token, newOptions).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            });
        } else if (this.props.filter.cond === 'status') {
            status(this.props.token, newOptions).then(response => {
                if(response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            });
        } else {
            basic(this.props.token, newOptions).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info))
                }
            });
        }
    }

    refreshAfterDelete() {
        if (this.props.filter.cond === 'product') {
            product(this.props.token, { name: this.props.filter.name }).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            })
        } else if (this.props.filter.cond === 'tag') {
            tag(this.props.token, { tag: this.props.filter.name }).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.props.handleRedirect();
                }
            })
        } else if (this.props.filter.cond === 'status') {
            status(this.props.token, { status: this.props.filter.name }).then(response => {
                if(response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info));
                    this.handleRedirect();
                }
            });
        } else {
            basic(this.props.token, {}).then(response => {
                if (response.status == "success") {
                    var header_list = this.extractHeader(response.info);
                    this.props.dispatch(tableSet(header_list, response.info))
                }
            })
        }
    }

    refreshAfterCreate() {
        getNewestStorage(this.props.token).then(response => {
            if (response.status == "success") {
                var header_list = this.extractHeader(response.info);
                this.props.dispatch(tableSet(header_list, response.info));
                this.props.handleRedirect();
            }
        });
    }

    componentDidMount() {
        getStoreHeader(this.props.token).then(response => {
            if (response.status == "success") {
                this.setState({
                    header_list: response.info
                });
            }
        });

        // postStoreHeader(this.props.token, {}).then(response => {
        //     if (response.status == "success") {
        //         this.setState({
        //             header_list: response.info
        //         });
        //     }
        // });
    }
}

export default connect(state => {
    return {
        ...state.token,
        table: state.table,
        filter: state.filter,
        ...state.option,
    }
})(StorageTable);

const status_mapping = {
    normal: '庫存正常',
    expired_soon: '久置',
    expired: '過期',
    not_enough: '庫存不足',
    producing: '生產中'
}

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