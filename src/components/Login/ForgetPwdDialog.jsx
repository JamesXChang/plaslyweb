import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form } from 'reactstrap';
import { forgetPwd } from 'api/login-api.js';

class ForgetPwdDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountInput: "",
            emailInput: "",
        }

        this.onAccountInputChange = this.onAccountInputChange.bind(this);
        this.onEmailInputChange = this.onEmailInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render() {
        return (
            <Modal isOpen={ this.props.isOpen } toggle={ this.props.toggle }>
                <ModalHeader className="text-center">請輸入您註冊時所使用的帳戶名稱與電子郵件</ModalHeader>
                <Form onSubmit={ this.onFormSubmit }>
                    <ModalBody>
                        <FormGroup>
                            <Input name="account" id="account" 
                                type="text" placeholder="帳戶名稱" required
                                value={ this.state.accountInput } onChange={ this.onAccountInputChange }/>
                        </FormGroup>
                        <FormGroup>
                            <Input name="email" id="email" className="mt-4"
                                type="email" placeholder="電子郵件" required
                                value={ this.state.emailInput } onChange={ this.onEmailInputChange }/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={ this.props.toggle }>取消</Button>
                        <Button color="primary" type="submit">送出</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

    onAccountInputChange(e) {
        this.setState({
            accountInput: e.target.value,
        })
    }

    onEmailInputChange(e) {
        this.setState({
            emailInput: e.target.value,
        })
    }

    onFormSubmit() {
        forgetPwd({
            account: this.state.accountInput,
            email: this.state.emailInput,
        }).then(response => {
            if (response.status === "success") {
                window.alert("已將連結寄送至註冊信箱，請透過連結登入帳號！");
                this.props.toggle();
            } else if (response.status === "account mismatch") {
                window.alert("帳號名稱不符！");
            } else if (response.status === "email mismatch") {
                window.alert("電子郵件不符！");
            }
            this.setState({
                accountInput: "",
                emailInput: "",
            });
        });
    }
}

export default ForgetPwdDialog;