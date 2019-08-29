import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Form, Icon, Button, Input, message} from 'antd'

import {reqLogin} from '../../api'
import './login.less'
import storeage from '../../utils/storageUtil'
import memory from '../../utils/memoryUtil'
import logo from '../../assest/images/logo.png'
/*
* 登录的路由组件
* */
class Login extends Component {

    handleSubmit = event => {
        //阻止事件默认行为
        event.preventDefault();
        //对表单的全部数据进行校验,校验成功提交表单
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //提交登录的ajax请求
                const {username,password} = values;
                const result = await reqLogin(username,password);
                //得到服务端返回的数据
                if(result.status === 0) {
                    //登录成功
                    message.success('登陆成功!');
                    //将用户存在内存中和文件中
                    const user = result.data;
                    memory.user = user;
                    storeage.saveUser(user);
                    //跳转到admin页面(不需要回退到登录界面)
                    this.props.history.replace('/');
                }else {
                    //登录失败
                    message.error(result.msg)
                }
            } else {
                console.log('校验失败');
            }
        });

       /* //获取form对象
        const form = this.props.form;
        //获取表单数据
        const values = form.getFieldsValue();*/
    };

    //自定义验证密码规则
    validPassword = (rule,value,callback) => {
        // callback() 验证通过
        // callback('xxxx') 验证失败并制定错误信息
        if(!value) {
            callback('密码必须输入');
        }else if(value.length<4){
            callback('密码长度不能小于4位');
        }else if(value.length>12){
            callback('密码长度不能小于12位');
        }else if(!/^[a-zA-Z0-9]+$/.test(value)) {
            callback('密码不能包含特殊字符')
        }else {
            callback();
        }
    };

    render() {
        //判断用户是否已经登录
        const user = memory.user
        if(user && user._id) {
           //用户已经登录,不渲染登录页面,直接渲染到admin页面
            return <Redirect to="/"/>
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    {/*React中不能写图片路径,需要将图片引入进来*/}
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {/*getFieldDecorator(唯一标识,校验规则)(表单组件)是一个高阶函数,本身接受两个参数:一个是标识名称(用来获取表单数据的值),第二个是一个校验规则对象
                            ,它返回一个函数,节后一个组件对象*/}
                            {getFieldDecorator('username', {
                                //声明式验证,直接使用验证规则做验证,不需要自己写方法
                                rules: [
                                    { required: true, message: '用户名必须输入!' },
                                    { min: 4, message: '用户名不能小于4位!' },
                                    { max: 12, message: '用户名不能大于12位!' },
                                    { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须不能包含特殊字符!' },
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validPassword}
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

//包装From组件(一个组件里有From组件,这个组件叫From组件)后,会返回一个高阶组件,高阶组件会将一个form对象antd会将低阶组件组件,里面有操作表单的一系列方法(验证,收集数据)
//高阶函数:一个函数的返回值是另一个函数
const WarpLogin = Form.create()(Login);
export default WarpLogin;

/*
* 1.前台表单校验
*       用户名 必须 4<位数<12 必须是英文数字或下划线组成
* 2.手机表单输入数据
* 3.提交表单
* */

/**
 * 高阶函数的两种情况
 *      -接受函数类型的参数
 *      -函数的返回值是一个函数
 * 常见的高阶函数
 *      -定时器 setTimeOut(callback)/setInterVal(callback)
 *      -Promise本身和then
 *      -数组的遍历的相关方法 forEach map filter find findIndex some every reduce
 *      -函数对象的bind方法
 *      -react-redux的connect()()
 *      -antd的From.creat()() getFiledsVaule()()
 * 高阶组件
 *     -本质就是一个函数
 *     -接受一个组件,返回一个新的组件,新组件内部渲染被包装组件,包装组件向被包装组件传递强大的对象属性
 *     -作用是扩展组件的功能
 * 常见的高阶组件
 *     -Route组件的装组件
 *     -reduct-redux的connect()(被包装组件)
 *     -antd的getFieldDecorator()(被包装组件)
 *
 * 组件和组件标签
 *     -组件是类
 *     -组件标签是组件的实例对象
 */
