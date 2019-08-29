/*
* 该模块实现的是持久化一些数据到硬盘上
* */

import store from 'store'
const USER_KEY = 'user_key';

export default {
    /**
     * 保存登录的用户
     */
    saveUser(user) {
        //localStorage.setItem(USER_KEY,JSON.stringify(user));
        store.set(USER_KEY,user)
    },
    /**
     * 读取登录过的用户
     */
    getUser() {
        //localstorage.getItem如果没有数据返回null值
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {}
    },
    /**
     * 删除登录过的用户
     */
    removUser() {
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    },

}