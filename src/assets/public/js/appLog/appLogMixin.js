/*
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-08-04 10:57:20
 * @LastEditTime: 2022-08-16 13:52:05
 * @LastEditors: wanjikun
 */
import Request from './appLogApi'
import { loganalysisVisitDuring } from './appLogFun'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
//  minxin.js
const minxin = {
  data() {
    return{
      logInitTime:"",
      loganalysisCurAppId:'news',
      log_user_session_id:''
    }
  },
  async mounted () {
    let visitorId = await this.getUniqueCode();
    this.log_user_session_id = visitorId.visitorId
    this.logInitTime = new Date();
    // Request.getLogList()

    this.$router.beforeEach(async(to, from,next) => {
      await this.assembleParamWriteLog()
      this.logInitTime = new Date();
      next()
    })

    window.onbeforeunload=(e)=>{  
      this.assembleParamWriteLog()
//       var e = window.event||e;
// 　　  e.returnValue=("确定离开当前页面吗？");
    }

  },
  methods: {
    /**
     * 网站浏览
     */
    async assembleParamWriteLog(){

      let visit_during_time = new Date().getTime() - this.logInitTime.getTime()
      if (visit_during_time < 500) {
        return
      }

      let object_id = this.$route.query.id || this.$route.params.id || ''
      let basicParam = this.getLoganalysisBasicParam()
      //针对检索 文献详情页 多传一个id就行了 说明是监控文献访问
      let params = object_id && (location.href.includes('web_searchingDetail') || location.href.includes('web_magazineDetails'))
        ? Object.assign(basicParam,{
          object_id:object_id,
          visit_from_code:'检索', 
          log_type_code:'10021',
          log_type_name:'文献详情浏览',
        }) : basicParam
      await loganalysisVisitDuring(params)
    },
    /**
     *文献检索 
     */
    searchOperationWriteLog(searchParam){
      let basicParam = this.getLoganalysisBasicParam();
      let params = Object.assign(searchParam,{
        visit_during_time:0,
        visit_from_code:'检索',
        log_type_code:'10019',
        log_type_name:'网站文献检索'
      })
      let finalParam = Object.assign(basicParam,params)
      loganalysisVisitDuring(finalParam)
    }, 
    /**
     * 文献下载
     */
    downloadOperationWriteLog(downloadParam){
      let basicParam = this.getLoganalysisBasicParam();
      let params = Object.assign(downloadParam,{
        visit_during_time:0,
        log_type_code:'10008',
        log_type_name:'文献下载'
      })
      let finalParam = Object.assign(basicParam,params)
      loganalysisVisitDuring(finalParam)
    },
    /**
     * 数据库导航点击
     */
    databaseClickWriteLog(databaseParam){
      let basicParam = this.getLoganalysisBasicParam();
      let params = Object.assign(databaseParam,{
        visit_during_time:0,
        log_type_code:'10009',
        log_type_name:'数据库点击'
      })
      let finalParam = Object.assign(basicParam,params)
      loganalysisVisitDuring(finalParam)
    },
    getLoganalysisBasicParam(){
      let object_id = this.$route.query.id || this.$route.params.id || ''
      return {
        visit_time:this.logInitTime,
        visit_during_time:new Date().getTime() - this.logInitTime.getTime(),
        app_id:this.loganalysisCurAppId,
        visit_from_code:'未知',//详情页访问来自哪里 未知，检索，猜你喜欢，收藏夹
        visit_page_url:location.href,
        log_type_code:'10015',
        log_type_name:'网站访问',
        object_id:object_id,
        user_session_id:this.log_user_session_id
      }
    },
    //获取设备唯一标识
    async getUniqueCode(){
      return new Promise((resolve, reject) => {
        FingerprintJS.load().then(fp => {
            fp.get().then(result => {
            　　const visitorId = result.visitorId;
            var type = this.getBrowserType()
            console.log('typetypetype',type)
                resolve({visitorId:visitorId+type})
            }).catch(()=>reject());
        }).catch(()=>reject());
      })
    },
    //获取浏览器信息
    getBrowserType() {

      // 获取浏览器 userAgent
      var ua = navigator.userAgent
      
      // 是否为 Opera
      var isOpera = ua.indexOf('Opera') > -1
      // 返回结果
      if (isOpera) { return 'Opera' }
    
      // 是否为 IE
      var isIE = (ua.indexOf('compatible') > -1) && (ua.indexOf('MSIE') > -1) && !isOpera
      var isIE11 = (ua.indexOf('Trident') > -1) && (ua.indexOf("rv:11.0") > -1)
      // 返回结果
      if (isIE11) { return 'IE11'
      } else if (isIE) {
        // 检测是否匹配
        var re = new RegExp('MSIE (\\d+\\.\\d+);')
        re.test(ua)
        // 获取版本
        var ver = parseFloat(RegExp["$1"])
        // 返回结果
        if (ver == 7) { return 'IE7'
        } else if (ver == 8) { return 'IE8'
        } else if (ver == 9) { return 'IE9'
        } else if (ver == 10) { return 'IE10'
        } else { return "IE" }
      }
    
      // 是否为 Edge
      var isEdge = ua.indexOf("Edg") > -1
      // 返回结果
      if (isEdge) { return 'Edg' }
    
      // 是否为 Firefox
      var isFirefox = ua.indexOf("Firefox") > -1
      // 返回结果
      if (isFirefox) { return 'Firefox' }
    
      // 是否为 Safari
      var isSafari = (ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)
      // 返回结果
      if (isSafari) { return "Safari" }
    
      // 是否为 Chrome
      var isChrome = (ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edg") == -1)
      // 返回结果
      if (isChrome) { return 'Chrome' }
    
      // 是否为 UC
      var isUC= ua.indexOf("UBrowser") > -1
      // 返回结果
      if (isUC) { return 'UC' }
    
      // 是否为 QQ
      var isQQ= ua.indexOf("QQBrowser") > -1
      // 返回结果
      if (isUC) { return 'QQ' }
    
      // 都不是
      return ''
    }
  }
}
export default minxin