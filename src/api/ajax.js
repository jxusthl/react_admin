/*
* 能发送ajax请求的函数模块
* 返回一个promise对象
* 统一处理请求异常
*   return 一个自己的promise对象
*   在promise中进行异步请求
*   成功将数据传递给别的模块(调用resovle会将成功的数据传递出去)
*   失败就在内部统一处理,而不把错误传递出去(调用reject会把错误传递出去)
*
* 优化:
*   成功后将请求成功的数据response.data返回,而不是response对象
*   避免在每次成功后都要手动去除返回的数据
* */
import axios from 'axios'
import {message} from 'antd'

/**
 *
 * @param url 请求的url
 * @param data 请求所带的参数
 * @param method 请求类型
 */
export default function ajax(url,data={},method='GET') {
    return new Promise((resolve, reject) =>{
        let promise = null;
        //1.执行异步操作
        if(method.toLowerCase() === 'get') {
            //url 配置对象
           promise = axios.get(url,{params:data})
        }else {
            promise =  axios.post(url,data)
        }
        //2.如果成功了将成功的结果返回
        promise
            .then(response => resolve(response.data))
            .catch(error => message.error('请求出错了' + error.message))
    });

}