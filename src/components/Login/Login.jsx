import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Button, Row, Col, Navbar, NavbarBrand } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { register, login } from 'api/login-api.js';
import ForgetPwdDialog from 'components/Login/ForgetPwdDialog.jsx';

import { tokenSet } from 'states/token-action.js';

import './Login.css';

// enum
const Mode = {
    Login: 'Login',
    Register: 'Register',
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: Mode.Login,
            accountInput: "",
            nameInput: "",
            emailInput: "",
            pwdInput: "",
            openDialog: false,
            isRedirect: false,
        };

        this.onLoginTitleClick = this.onLoginTitleClick.bind(this);
        this.onRegisterTitleClick = this.onRegisterTitleClick.bind(this);
        this.onAccountInputChange = this.onAccountInputChange.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onEmailInputChange = this.onEmailInputChange.bind(this);
        this.onPwdInputChange = this.onPwdInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    render() {
        if (this.state.isRedirect) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className="h-100">
                <Navbar light expand="md" className="d-flex pt-0 navbar-top">
                    <NavbarBrand tag={ Link } to='/'>
                        <img src="images/plasly-logo.png" alt="brand-logo" style={{ width: '180px' }}/>
                    </NavbarBrand>
                </Navbar>
                <div className="d-md-flex align-items-center justify-content-center block-wrapper">
                    <div className='container-block d-flex flex-column text-center'>
                        <div className='d-flex'>
                            <h1 className={`w-50 clickable-title 
                                ${(this.state.mode === Mode.Login) && 'bottom-line'}`}
                                onClick={ this.onLoginTitleClick }>
                                登入
                            </h1>
                            <h1 className={`w-50 clickable-title 
                                ${(this.state.mode === Mode.Register) && 'bottom-line'}`} 
                                onClick={ this.onRegisterTitleClick }>
                                註冊
                            </h1>
                        </div>
                        <Form onSubmit={ this.onFormSubmit }>
                            <FormGroup>
                                <Input name="account" id="account" className="mt-4 login-input"
                                    type="text" placeholder="帳戶名稱" required
                                    value={ this.state.accountInput } onChange={ this.onAccountInputChange }/>
                            </FormGroup>
                            {(this.state.mode === Mode.Register) 
                                &&  <FormGroup>
                                        <Input name="name" id="name" className="mt-4 login-input"
                                            type="text" placeholder="使用者名稱" required
                                            value={ this.state.nameInput } onChange={ this.onNameInputChange }/>
                                    </FormGroup>}
                            {(this.state.mode === Mode.Register)
                                &&  <FormGroup>
                                        <Input name="email" id="email" className="mt-4 login-input"
                                            type="email" placeholder="電子郵件" required
                                            value={ this.state.emailInput } onChange={ this.onEmailInputChange }/>
                                    </FormGroup>}
                            <FormGroup>
                                <Input name="password" id="password" className="my-4 login-input"
                                    type="password" placeholder="密碼" required
                                    value={ this.state.pwdInput } onChange={ this.onPwdInputChange }/>
                            </FormGroup>
                            <div className="d-flex align-items-center justify-content-between action-block px-1">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" className="account-check"/>{' '}記住我
                                    </Label>
                                </FormGroup>
                                {(this.state.mode === Mode.Login) 
                                    &&  <Button type="button" color="link" onClick={ this.toggleDialog }>
                                            忘記密碼
                                        </Button>}
                                <ForgetPwdDialog isOpen={ this.state.openDialog } toggle={ this.toggleDialog }/>
                            </div>
                            {(this.state.mode === Mode.Login) 
                                &&  <Button type="submit" className='btn-style btn-login'>
                                        登入
                                    </Button>}
                            {(this.state.mode === Mode.Register) 
                                &&  <Button type="submit" className='btn-style btn-register'>
                                        註冊
                                    </Button>}
                        </Form>
                        <hr/>
                        <Row>
                            <Col className="d-flex justify-content-start">
                                <Button type="button" className='btn-style btn-stack 
                                    d-flex justify-content-center align-items-center'
                                    style={{ backgroundColor: '#1877F2' }}>
                                    <FontAwesomeIcon icon={ faFacebook } className="fb-icon"/>
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <Button type="button" className='btn-style btn-stack'
                                    style={{ backgroundColor: '#fff' }}>
                                    <img src='images/google-icon.png' alt="google-icon" className="google-icon"/>
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button type="button" className='btn-style btn-stack
                                    d-flex justify-content-center'
                                    style={{ backgroundColor: '#000' }}>
                                    <FontAwesomeIcon icon={ faApple } className="apple-icon"/>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    onLoginTitleClick() {
        this.setState({ mode: Mode.Login });
    }

    onRegisterTitleClick() {
        this.setState({ mode: Mode.Register });
    }

    onAccountInputChange(e) {
        this.setState({ accountInput: e.target.value });
    }

    onNameInputChange(e) {
        this.setState({ nameInput: e.target.value });
    }

    onEmailInputChange(e) {
        this.setState({ emailInput: e.target.value });
    }

    onPwdInputChange(e) {
        this.setState({ pwdInput: e.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();

        if (this.state.mode === Mode.Login) {
            login({
                account: this.state.accountInput,
                passwd: this.state.pwdInput,
            }).then(response => {
                if (response.status === "success") {
                    this.props.dispatch(tokenSet(response.token));
                    this.setState({
                        isRedirect: true,
                    });
                } else if (response.status === "account/passwd mismatch") {
                    window.alert('帳號密碼錯誤！');
                }
            });
        } else {
            register({
                account: this.state.accountInput,
                passwd: this.state.pwdInput,
                name: this.state.nameInput,
                email: this.state.emailInput,
            }).then(response => {
                if (response.status === "success") {
                    window.alert('註冊成功！');
                } else if (response.status === "duplicate") {
                    window.alert('此帳號已存在');
                }
                this.setState({
                    accountInput: "",
                    nameInput: "",
                    emailInput: "",
                    pwdInput: "",
                });
            });
        }
    }

    toggleDialog(e) {
        this.setState((prevState) => ({
            openDialog: !prevState.openDialog,
        }));
    }

    componentDidMount() {
    }
}

export default connect(state=>{
    return {
        ...state.token
    }
})(Login);