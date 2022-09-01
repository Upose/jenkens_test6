/*
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-08-09 17:10:57
 * @LastEditTime: 2022-08-10 13:16:40
 * @LastEditors: wanjikun
 */
import Request from './appLogApi'
function loganalysisWriteLog(params){
  return new Promise((resolve, reject)=>{
    Request.writeLog(params).then(response => {
        resolve()
    }).catch(()=>{
      resolve()
    })
  })
}
/** 
 * 网站访问
 * otherParmas 还有其他参数
 * detailUrl 是否是详情页
*/
async function loganalysisVisitDuring(params,detailUrl){
  // if (!detailUrl && window.location.href.includes('/web_searchingDetail')) {
  //   return
  // }
  await loganalysisWriteLog(params);
}
export {
  loganalysisWriteLog,
  loganalysisVisitDuring
}