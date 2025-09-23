
const path = require('path')

module.exports = {
  // 编译完成后启动打开服务器
  devServer: {
    open: true
  },

  // 保存时是否校验
  lintOnSave: false,

  pluginOptions: {
    // 自动注入less变量和mixin
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 引入全局样式变量
        path.join(__dirname, 'src/assets/styles/variables.less'),
        // 引入全局样式mixin
        path.join(__dirname, 'src/assets/styles/mixins.less')
      ]
    }
  }
}
