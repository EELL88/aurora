var ExposeConfig = {
  extraMenus: [
    {
      groupTitle: '其他功能', // 大标题文本 （如需支持多语言，请在zh-CN.js、zh-TW.js、en-US.js中配置多语言文本）
      groupLinks: [
        {
          menuTitle: 'Telegram频道', // 标题文本
          menuIcon: 'gauge', // 图标：https://phosphoricons.com/ 自选
          menuPath: 'https://t.me/ELongCloud', // 链接地址
          needSubscribe: false, // true：需要订阅后才能查看 false：无需订阅即可查看
          isExternal: true // true：打开新窗口 false：内嵌
        },
      ]
    }
  ]
}
