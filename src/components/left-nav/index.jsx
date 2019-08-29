import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './index.less'
import logo from '../../assest/images/logo.png'
/*
* admin页面左侧导航组件
* */
export default class Index extends Component {

    render() {
        const { SubMenu } = Menu;
        return (
            <div  className="left-nav">

                <Link to="/home" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>React后台</h1>
                </Link>

                <Menu mode="inline" theme="dark">

                    {/*没有二级菜单的菜单项*/}
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>

                    {/*有二级菜单的菜单项*/}
                    <SubMenu key="sub1" title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Icon type="pie-chart" />
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="pie-chart" />
                            <span>商品管理</span>
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                            <Icon type="appstore" />
                            <span>Navigation Two</span>
                          </span>
                        }
                    >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}