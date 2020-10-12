
export default {
  init: function () {
    const AK = 'cDjltKktDWFhLGZSc0w8DmcAuQymA1aE'
    const apiVersion = '2.0'
    // const timestamp = new Date().getTime()
    const BMapURL = 'https://api.map.baidu.com/api?v=' + apiVersion + '&ak=' + AK + '&callback=onBMapCallback'
    return new Promise((resolve, reject) => {
    // 插入script脚本
      let scriptNode = document.createElement('script')
      scriptNode.setAttribute('type', 'text/javascript')
      scriptNode.setAttribute('src', BMapURL)
      document.body.appendChild(scriptNode)

      // 等待页面加载完毕回调
      window.onBMapCallback = function () {
        resolve(BMap)
        console.log('这个是map')
      }
    })
  }
}
