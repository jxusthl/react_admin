import React from 'react';
import ReactDOM from 'react-dom';


import storeage from './utils/storageUtil'
import memory from './utils/memoryUtil'

import App from './App';

//一上来就将用户从本地读到内存中
memory.user = storeage.getUser();

//渲染根组件
ReactDOM.render(<App />, document.getElementById('root'));


