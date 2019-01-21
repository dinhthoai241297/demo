import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Footer from '../common/Footer';
import { active } from '../../actions/UserActions';
import { connect } from 'react-redux';
import HeaderOut from '../common/HeaderOut';
import BoxForm from '../common/BoxForm';

class ActiveUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            mesHash: ''
        }
    }

    handleInputChange = e => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    checkHash = hash => {
        if (hash === '') {
            this.setState({
                mesHash: 'Mã kích hoạt không được để trống!'
            });
            return false;
        }
        return true;
    }

    active = async e => {
        e.preventDefault();
        let { hash } = this.state;
        let check = this.checkHash(hash);
        if (!check) {
            return;
        }
        // active
        try {
            let res = await this.props.active(hash);
            if (res.code === 1) {
                toast.success('Tài khoản kích hoạt thành công, từ bây giờ bạn đã có thể đăng nhập bằng tài khoản mới!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.props.history.push('/login');
            } else if (res.code === 101) {
                toast.warn('Mã kích hoạt không hợp lệ!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.setState({
                    mesHash: 'Mã kích hoạt không hợp lệ!'
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

    render() {

        let { hash, mesHash } = this.state;

        return (
            <div className="with-cookie-bar">
                <div className="body-wrapper">
                    <div className="myob-nosession-content-wrapper">
                        <HeaderOut />
                        <BoxForm title="Kích hoạt tài khoản">
                            <form id="login_form" method="post" role="form">
                                <div className="row form-holder">
                                    <div className={'form-group md-col-12' + (mesHash === '' ? '' : ' has-error')}>
                                        <input
                                            autoFocus={true} className="form-control"
                                            id="id_hash" name="hash" placeholder="Mã kích hoạt"
                                            type="text" value={hash} onChange={this.handleInputChange}
                                            onClick={() => this.setState({ mesHash: '' })}
                                        />
                                        <span className="help-block">{mesHash}</span>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-width-100" onClick={this.active}>
                                    Kích hoạt
                                        </button>
                            </form>
                            <hr />
                            <div className="extra-info">bạn muốn đăng ký mới?</div>
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        active: token => dispatch(active(token))
    }
}

export default connect(null, mapDispatchToProps)(ActiveUser);
