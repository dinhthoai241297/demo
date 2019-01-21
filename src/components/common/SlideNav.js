import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class SlideNav extends Component {
    render() {
        return (
            <div id="sidebar-nav" className="sidebar-nav-js sticky">
                <ul id="dashboard-menu">
                    <a href="/">
                        <div className="myob_logo">
                            <img id="navbar-logo" src="/static/images/logo.jpg" />
                        </div>
                    </a>
                    <li className="dashboard-menu-item ">
                        <Link to='/update'>
                            <span className="sidebar-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30} viewBox="0 0 30 30">
                                <defs>
                                    <path fill="#767676" id="dashboard_a" d="M15 4C7.278 4 1 10.161 1 17.74c0 3.01.988 5.801 2.665 8.067l1.299-1.067a11.896 11.896 0 0 1-2.267-7C2.697 11.062 8.195 5.665 15 5.665c6.805 0 12.303 5.397 12.303 12.075 0 2.609-.839 5.028-2.267 7l1.3 1.067A13.517 13.517 0 0 0 29 17.74C29 10.16 22.722 4 15 4zm5.682 7.793L13.026 20.5a2.282 2.282 0 0 0 .838 3.11 2.282 2.282 0 0 0 3.11-.837l3.708-10.98z" />
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <mask id="dashboard_b">
                                        <use xlinkHref="#dashboard_a" />
                                    </mask>
                                    <use fillRule="nonzero" xlinkHref="#dashboard_a" />
                                    <g mask="url(#dashboard_b)">
                                        <path d="M0 0h30v30H0z" />
                                    </g>
                                </g>
                            </svg>
                            </span>
                            <span className="icon_title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="active" tour-target="nav-venue-settings">
                        <a className="dropdown-toggle" href="#">
                            <span className="sidebar-icon">
                                <i className="fas fa-user"></i>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30} viewBox="0 0 30 30">
                                    <defs>
                                        <path fill="#767676" id="settings_a" d="M14.61 20.264c.938 0 1.815-.24 2.633-.72a5.445 5.445 0 0 0 1.947-1.93A5.01 5.01 0 0 0 19.91 15c0-.938-.24-1.815-.721-2.632a5.4 5.4 0 0 0-1.947-1.947A5.104 5.104 0 0 0 14.61 9.7a5.01 5.01 0 0 0-2.615.72 5.445 5.445 0 0 0-1.929 1.948A5.104 5.104 0 0 0 9.347 15c0 .938.24 1.809.72 2.614a5.492 5.492 0 0 0 1.93 1.93 5.01 5.01 0 0 0 2.614.72zm11.215-3.786l3.137 2.452c.144.12.228.277.252.469a.85.85 0 0 1-.108.54l-3.03 5.193a.659.659 0 0 1-.378.325.799.799 0 0 1-.523-.036l-3.713-1.479c-.962.697-1.815 1.19-2.56 1.479l-.541 3.93a.916.916 0 0 1-.27.469.652.652 0 0 1-.452.18h-6.057a.652.652 0 0 1-.451-.18.734.734 0 0 1-.234-.469l-.577-3.93c-1.01-.409-1.851-.902-2.524-1.479l-3.75 1.479c-.385.168-.685.072-.902-.289L.115 19.94a.85.85 0 0 1-.108-.541.701.701 0 0 1 .253-.469l3.173-2.452c-.048-.336-.072-.829-.072-1.478s.024-1.142.072-1.478L.26 11.07a.701.701 0 0 1-.253-.469.85.85 0 0 1 .108-.54l3.03-5.193c.216-.36.516-.457.9-.289l3.75 1.479c.866-.65 1.707-1.142 2.525-1.479l.577-3.93A.734.734 0 0 1 11.13.18a.652.652 0 0 1 .45-.18h6.058c.169 0 .319.06.451.18s.222.277.27.469l.541 3.93c.938.36 1.791.854 2.56 1.479l3.714-1.479a.799.799 0 0 1 .523-.036.659.659 0 0 1 .379.325l3.029 5.192a.85.85 0 0 1 .108.541.701.701 0 0 1-.252.469l-3.137 2.452c.048.336.072.829.072 1.478s-.024 1.142-.072 1.478z" />
                                    </defs>
                                    <g fillRule="evenodd">
                                        <mask id="settings_b">
                                            <use xlinkHref="#settings_a" />
                                        </mask>
                                        <use xlinkHref="#settings_a" />
                                        <g fill="#767676" mask="url(#settings_b)">
                                            <path d="M0 0h30v30H0z" />
                                        </g>
                                    </g>
                                </svg> */}
                            </span>
                            <span className="icon_title">Proifle</span>
                            <span className="ob-chevron" />
                        </a>
                        <ul className="submenu active">
                            <li>
                                <NavLink activeClassName="active" to='/connectInfo'>Thông tin kết nối</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to='/update'>Cập nhật thông tin</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SlideNav;
