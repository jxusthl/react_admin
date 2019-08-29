import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';

import LeftNva from '../../components/left-nav'
import Header from '../../components/header'
import memory from '../../utils/memoryUtil'
/*
* 后台管理的路由组件主界面
* */
export default class Admin extends Component {

    render() {
        const {Footer, Sider, Content } = Layout;
        const {user} = memory;
        if (!user || !user._id) {
            //表示用户不存在
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNva/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'#fff'}}>Content</Content>
                    <Footer style={{textAlign:'center',color:'#3c3c3c'}}>推荐使用谷歌浏览器,可以后的更好的体验</Footer>
                </Layout>
            </Layout>

        );
    }
}