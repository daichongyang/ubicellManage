export default {
    init: function() {
        const key = '3d91b12e02a16d16835c072cea02aadb'
        const apiVersion = '1.4.15'
            // const timestamp = new Date().getTime()
        const AMapURL = 'https://webapi.amap.com/maps?v=' + apiVersion + '&key=' + key + '&callback=onAMapCallback&plugin=AMap.Autocomplete,AMap.PlaceSearch'
        const AMapURL1 = '//a.amap.com/jsapi_demos/static/demo-center/model/js/three.js'
        return new Promise((resolve, reject) => {
            // 插入script脚本
            let scriptNode = document.createElement('script')
            scriptNode.setAttribute('type', 'text/javascript')
            scriptNode.setAttribute('src', AMapURL)

            let scriptNode1 = document.createElement('script')
            scriptNode1.setAttribute('type', 'text/javascript')
            scriptNode1.setAttribute('src', AMapURL1)

            document.body.appendChild(scriptNode)
            document.body.appendChild(scriptNode1)

            // 等待页面加载完毕回调
            window.onAMapCallback = function() {
                resolve(AMap)
                console.log('map初始化成功')
            }
        })
    }
}