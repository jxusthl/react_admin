/**
 * 写入接口函数,避免每次都需要写地址,和请求方法,只需要将请求参数通过传参的方式传递过来
 * 每个接口函数的返回值都是一个promise对象
 */
import ajax from './ajax'

//登录接口
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');

//添加用户接口
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST');
