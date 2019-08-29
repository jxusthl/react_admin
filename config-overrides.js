const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    //针对antd实现按需打包,根据import(使用babel-plugin-import)来打包,
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //自动打包相关的样式
    }),
    //使用less-loader对less文件中的变量进行修改
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A','@error-color':"#1DA57A"},
    }),
);