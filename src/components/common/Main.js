import React, { Component } from 'react';
import SlideNav from './SlideNav';
import Footer from './Footer';
import Header from './Header';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false
        }
    }

    toggleMenu = () => {
        let { openMenu } = this.state;
        this.setState({ openMenu: !openMenu });
    }

    render() {

        let { openMenu } = this.state;

        return (
            <div className={'with-cookie-bar' + (openMenu ? ' menu' : '')}>
                <div className="body-wrapper">
                    <SlideNav />
                    <div className="content content-js">
                        <Header toggleMenu={this.toggleMenu} />
                        <div className="myob-content-wrapper">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </div>
                <noscript>
                    Bạn cần bật javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

export default Main;
