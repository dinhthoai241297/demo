import React, { Component } from 'react';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions';
import HeaderOut from '../common/HeaderOut';
import BoxForm from '../common/BoxForm';
import { Redirect } from 'react-router-dom';
import CryptoJS from 'crypto-js';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            mesEmail: '',
            mesPass: ''
        }
    }

    handleInputChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    checkEmail = email => {
        let mesEmail = '', check = false;
        if (email === '') {
            mesEmail = 'Email không được để trống!';
        } else {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            check = re.test(String(email).toLowerCase());
            if (!check) {
                mesEmail = 'Email không hợp lệ!';
            }
        }
        this.setState({ mesEmail });
        return check;
    }

    checkPassword = pass => {
        if (pass === '') {
            this.setState({ mesPass: 'Mật khẩu không được để trống' });
            return false;
        }
        if (pass.length < 6) {
            this.setState({ mesPass: 'Mật khẩu phải có độ dài tói thiểu là 6 kí tự!' });
            return false;
        }
        return true;
    }

    login = async e => {
        e.preventDefault();
        let { email, password } = this.state;
        let check = this.checkEmail(email) & this.checkPassword(password);
        if (!check) {
            return;
        }
        password = CryptoJS.MD5(password).toString();
        try {
            let rs = await this.props.login(email, password);
            if (rs.code === 1) {
                toast.success('Đăng nhập thành công!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else if (rs.code === 101) {
                toast.error('Tài khoản hoặc mật khẩu không đúng!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {
                toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            // error
            console.log(error);
            toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        // submit here
    }

    render() {

        let { user } = this.props;
        if (user) {
            return <Redirect to="/connectInfo" />
        }

        let { email, password, mesEmail, mesPass } = this.state;

        return (
            <div className="with-cookie-bar">
                <div className="body-wrapper">
                    <div className="myob-nosession-content-wrapper">
                        <HeaderOut />
                        <BoxForm title="Đăng nhập">
                            <form id="login_form" method="post" role="form">
                                <div className="row form-holder">
                                    <div className={'form-group md-col-12' + (mesEmail === '' ? '' : ' has-error')}>
                                        <input
                                            autoFocus={true} className="form-control"
                                            id="id_email" name="email" placeholder="E-mail"
                                            type="email" value={email} onChange={this.handleInputChange}
                                            onClick={() => this.setState({ mesEmail: '' })}
                                        />
                                        <span className="help-block">{mesEmail}</span>
                                    </div>
                                </div>
                                <div className="row form-holder">
                                    <div className={'form-group md-col-12' + (mesPass === '' ? '' : ' has-error')}>
                                        <input
                                            className="form-control" id="id_password"
                                            name="password" placeholder="Mật khẩu" type="password"
                                            value={password} onChange={this.handleInputChange}
                                            onClick={() => this.setState({ mesPass: '' })}
                                        />
                                        <span className="help-block">{mesPass}</span>
                                    </div>
                                </div>
                                {/* <div className="row form-holder">
                                            <div className="form-group remember">
                                                <label htmlFor="id_keep_logged_in" className="control-label">
                                                    <input id="id_keep_logged_in" name="keep_logged_in" type="checkbox" />
                                                    Lưu đăng nhập
                                                </label>
                                            </div>
                                        </div> */}
                                <button className="btn btn-primary btn-width-100" onClick={this.login}>
                                    Đăng nhập
                                        </button>
                            </form>
                            <a className="restore-password-link" href="/forgotPassword">Quên mật khẩu?</a>
                            <hr />
                            <div className="extra-info">Bạn chưa có tài khoản?</div>
                            <Link to='/register' >Đăng ký</Link>
                        </BoxForm>
                    </div>
                </div>
                <Footer />
                <noscript>
                    Bạn cần javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (email, password) => dispatch(actions.loginApi(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
