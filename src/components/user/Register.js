import React, { Component } from 'react';
import Footer from '../common/Footer';
import CountryOptions from '../common/CountryOptions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../actions/UserActions';
import { connect } from 'react-redux';
import HeaderOut from '../common/HeaderOut';
import BoxForm from '../common/BoxForm';
import CryptoJS from 'crypto-js';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            nation: 'VN',
            city: '',
            password: '',
            passwordConfirm: '',

            mesName: '',
            mesEmail: '',
            mesPassword: '',
            mesPasswordConfirm: '',
        }
    }

    checkName = name => {
        if (name === '') {
            this.setState({ mesName: 'Tên không được để trống!' });
            return false;
        }
        return true;
    }

    checkPassword = (pass, pass2) => {
        let mesPassword = '', mesPasswordConfirm = '';
        if (pass.length < 6) {
            mesPassword = 'Mật khẩu phải có tối thiểu 6 kí tự!';
        }
        if (pass === '') {
            mesPassword = 'Mật khẩu không được để trống!';
        }
        if (pass2 !== pass) {
            mesPasswordConfirm = 'Xác nhận mật khẩu không khớp!';
        }
        this.setState({ mesPassword, mesPasswordConfirm });
        return mesPassword === '' && mesPasswordConfirm === '';
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

    register = async e => {
        e.preventDefault();
        let { name, email, password, city, nation, passwordConfirm } = this.state;
        let check = this.checkEmail(email) & this.checkPassword(password, passwordConfirm) & this.checkName(name);
        if (!check) {
            return;
        }
        // encrypt password
        password = CryptoJS.MD5(password).toString();
        // register here
        try {
            let res = await this.props.register(name, email, nation, city, password);
            if (res.code === 1) {
                toast.success('Tạo tài khoản thành công, vui lòng truy cập email để nhận mã kích hoạt tài khoản!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.props.history.push('/active');
            } else if (res.code === 100) {
                toast.warn('Email này đã được sử dụng!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.setState({
                    mesEmail: 'Email này đã được sử dụng!'
                });
            } else {
                toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            // error
            console.log('error', error);
            toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    handleChangeInput = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {

        let { name, email, nation, password, city, mesName, mesEmail, mesPassword, passwordConfirm, mesPasswordConfirm } = this.state;

        return (
            <div className="with-cookie-bar">
                <div className="body-wrapper">
                    <div className="myob-nosession-content-wrapper">
                        {/* <div className="myob-nosession-header">
                            <img id="navbar-logo" src="/static/images/logo.jpg" />
                        </div> */}
                        <HeaderOut />
                        <BoxForm title="Đăng ký">
                            <form id="signup_form" method="post">
                                <div className={'form-group' + (mesName === '' ? '' : ' has-error')}>
                                    <input
                                        autoFocus={true} className="form-control"
                                        id="id_venue_name" name="name"
                                        placeholder="Họ & Tên (*)" type="text"
                                        value={name}
                                        onChange={this.handleChangeInput}
                                        onClick={() => this.setState({ mesName: '' })}
                                    />
                                    <span className="help-block">{mesName}</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control" id="id_city"
                                        name="city" placeholder="Thành phố"
                                        type="text" value={city}
                                        onChange={this.handleChangeInput}
                                    />
                                    <span className="help-block" />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control c-select"
                                        id="id_nation" name="nation"
                                        onChange={this.handleChangeInput}
                                        value={nation}
                                    >
                                        <CountryOptions />
                                    </select>
                                    <span className="help-block" />
                                </div>
                                <hr />
                                <div className={'form-group' + (mesEmail === '' ? '' : ' has-error')}>
                                    <input
                                        className="form-control" id="id_email"
                                        name="email" placeholder="E-mail (*)"
                                        type="email" value={email}
                                        onChange={this.handleChangeInput}
                                        onClick={() => this.setState({ mesEmail: '' })}
                                    />
                                    <span className="help-block">{mesEmail}</span>
                                </div>
                                <div className={'form-group' + (mesPassword === '' ? '' : ' has-error')}>
                                    <input
                                        className="form-control" id="id_password"
                                        name="password" placeholder="Mật khẩu (*)"
                                        type="password" aria-autocomplete="list"
                                        value={password}
                                        onChange={this.handleChangeInput}
                                        onClick={() => this.setState({ mesPassword: '' })}
                                    />
                                    <span className="help-block">{mesPassword}</span>
                                </div>
                                <div className={'form-group' + (mesPasswordConfirm === '' ? '' : ' has-error')}>
                                    <input
                                        className="form-control" id="id_password_confirm"
                                        name="passwordConfirm" placeholder="Xác nhận mật khẩu (*)"
                                        type="password" aria-autocomplete="list"
                                        value={passwordConfirm}
                                        onChange={this.handleChangeInput}
                                        onClick={() => this.setState({ mesPasswordConfirm: '' })}
                                    />
                                    <span className="help-block">{mesPasswordConfirm}</span>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-width-100" onClick={this.register}>
                                        Đăng ký
                                            </button>
                                </div>
                            </form>
                            <hr />
                            <div>
                                <Link to='/login'>Đã có tài khoản</Link>
                            </div>
                        </BoxForm>
                    </div>
                </div>
                <Footer />
                <noscript>
                    Bạn cần bật javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (name, email, nation, city, password) => dispatch(register(name, email, nation, city, password))
    }
}

export default connect(null, mapDispatchToProps)(Register);
