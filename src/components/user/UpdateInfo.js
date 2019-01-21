import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/UserActions';
import { connect } from 'react-redux';
import CountryOptions from '../common/CountryOptions';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import Main from '../common/Main';
import { Redirect } from 'react-router-dom';

class UpdateInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            nation: 'VN',
            password: '',
            newPassword: '',
            newPasswordConfirm: '',

            mesName: '',
            mesPassword: '',
            mesNewPassword: '',
            mesNewPasswordConfirm: '',
        }
    }

    componentDidMount() {
        if (this.props.token !== '') {
            let { token } = this.props;
            this.props.loadInfoUser(token);
            let { name, city, nation } = this.props.user;
            this.setState({ name, city, nation });
        }
    }

    update = async e => {
        e.preventDefault();
        let { name, city, password, nation, newPassword, newPasswordConfirm } = this.state;
        let check = this.checkName(name) & this.checkPassword(password) & this.checkNewPassword(newPassword, newPasswordConfirm);
        if (!check) {
            return;
        }
        // update here
        password = password === '' ? this.props.user.password : CryptoJS.MD5(password).toString();
        newPassword = newPassword === '' ? this.props.user.newPassword : CryptoJS.MD5(newPassword).toString();
        let session = this.props.token;
        try {
            let res = await this.props.update(name, password, city, nation, session, newPassword);
            if (res.code === 1) {
                this.setState({ password: '', newPassword: '', newPasswordConfirm: '' });
                toast.success('Cập nhật thông tin thành công!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else if (res.code === 101) {
                toast.warn('Cập nhật thông tin thất bại, hãy kiểm tra lại mật khẩu của bạn!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else {
                toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            // error
            toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    checkName = name => {
        if (name === '') {
            this.setState({ mesName: 'Tên không được để trống!' });
            return false;
        }
        return true;
    }

    handleChangeInput = e => {
        let { name, value } = e.target;
        if (name === 'phone' && value.match(/\D/)) {
            return;
        }
        this.setState({ [name]: value });
    }

    checkPassword = pass => {
        let mesPassword = '';
        if (pass.length < 6) {
            mesPassword = 'Mật khẩu phải có tối thiểu 6 kí tự!';
        }
        if (pass === '') {
            mesPassword = 'Mật khẩu không được để trống!';
        }
        this.setState({ mesPassword });
        return mesPassword === '';
    }

    checkNewPassword = (pass, pass2) => {
        let mesNewPassword = '', mesNewPasswordConfirm = '';
        if (pass !== '' || pass2 !== '') {
            if (pass.length < 6) {
                mesNewPassword = 'Mật khẩu mới phải có tối thiểu 6 kí tự!';
            }
            if (pass !== pass2) {
                mesNewPasswordConfirm = 'Xác nhận mật khẩu mới không khớp!';
            }
        }
        this.setState({ mesNewPassword, mesNewPasswordConfirm });
        return mesNewPassword === '' && mesNewPasswordConfirm === '';
    }

    render() {

        let { user } = this.props;
        if (!user) {
            return <Redirect to="/login" />
        }

        let { name, city, mesName, nation, password, mesPassword, mesNewPassword, newPassword, mesNewPasswordConfirm, newPasswordConfirm } = this.state;

        return (
            <Main>
                <div>
                    <div className="row head">
                        <div className="col-md-12 col-xs-12">
                            <h4>Cập nhật thông tin cá nhân</h4>
                        </div>
                    </div>
                    <form form="update_venue_form" action="/venue" method="post" role="form">
                        <input type="hidden" name="csrfmiddlewaretoken" defaultValue="YP2mqGsDP72jnzY6YlQ326IvyHr6VBKT" />
                        <div className="row form-holder">
                            <div className={'form-group col-md-7' + (mesName === '' ? '' : ' has-error')}>
                                <label htmlFor="id_name" className="control-label">
                                    Họ và Tên
                                            </label>
                                <input
                                    className="form-control" id="id_name"
                                    maxLength={255} name="name" type="text"
                                    value={name} onClick={() => this.setState({ mesName: '' })}
                                    onChange={this.handleChangeInput}
                                />
                                <span className="help-block">{mesName}</span>
                            </div>
                        </div>
                        <div className="row form-holder">
                            <div className="form-group col-md-7">
                                <label htmlFor="id_city" className="control-label">
                                    Thành phố
                                </label>
                                <input
                                    className="form-control" id="id_city"
                                    maxLength={255} name="city" type="text"
                                    value={city} onChange={this.handleChangeInput}
                                />
                                <span className="help-block"></span>
                            </div>
                        </div>
                        <div className="row form-holder">
                            <div className="form-group col-md-7">
                                <label htmlFor="id_nation" className="control-label">
                                    Quốc gia
                                            </label>
                                <select
                                    className="form-control" style={{ borderRadius: '4px' }}
                                    id="id_nation" name="nation"
                                    onChange={this.handleChangeInput}
                                    value={nation}
                                >
                                    <CountryOptions />
                                </select>
                                <span className="help-block"></span>
                            </div>
                        </div>
                        <div className="row form-holder">
                            <div className={'form-group col-md-7' + (mesPassword === '' ? '' : ' has-error')}>
                                <label htmlFor="id_pass" className="control-label">
                                    Mật khẩu
                                            </label>
                                <input
                                    className="form-control" id="id_pass"
                                    maxLength={255} name="password" type="password"
                                    value={password} onClick={() => this.setState({ mesPassword: '' })}
                                    onChange={this.handleChangeInput}
                                />
                                <span className="help-block">{mesPassword}</span>
                            </div>
                        </div>
                        <div className="row form-holder">
                            <div className={'form-group col-md-7' + (mesNewPassword === '' ? '' : ' has-error')}>
                                <label htmlFor="id_new_pass" className="control-label">
                                    Mật khẩu mới
                                </label>
                                <input
                                    className="form-control" id="id_new_pass"
                                    maxLength={255} name="newPassword" type="password"
                                    value={newPassword} onClick={() => this.setState({ mesNewPassword: '' })}
                                    onChange={this.handleChangeInput}
                                />
                                <span className="help-block">{mesNewPassword}</span>
                            </div>
                        </div>
                        <div className="row form-holder">
                            <div className={'form-group col-md-7' + (mesNewPassword === '' ? '' : ' has-error')}>
                                <label htmlFor="id_new_pass_confirm" className="control-label">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    className="form-control" id="id_new_pass_confirm"
                                    maxLength={255} name="newPasswordConfirm" type="password"
                                    value={newPasswordConfirm} onClick={() => this.setState({ mesNewPasswordConfirm: '' })}
                                    onChange={this.handleChangeInput}
                                />
                                <span className="help-block">{mesNewPasswordConfirm}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-7">
                                <button className="btn btn-primary btn-sm pull-right" onClick={this.update}>
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Main>
        );
    }
}

UpdateInfo.propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    logout: PropTypes.func,
    update: PropTypes.func,
    loadInfoUser: PropTypes.func,
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => dispatch(actions.logoutApi()),
        update: (name, password, city, nation, session, newPassword) => dispatch(actions.updateApi(name, password, city, nation, session, newPassword)),
        loadInfoUser: session => dispatch(actions.loadInfoUser(session))
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);
