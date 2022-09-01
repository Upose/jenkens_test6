/*
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-08-09 14:33:06
 * @LastEditTime: 2022-08-09 17:53:19
 * @LastEditors: wanjikun
 */
import axios from 'axios';
class Request{
  baseUrl = 'loganalysis'
  getApi(url, data){
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        params: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          // error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  }
  postApi(url, data){
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        const result = response.data;
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          // error(result.message);
          reject(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  }
  writeLog(data){
    let url = this.baseUrl+'/api/log-write/write-log'
    return this.postApi(url,data)
  }
  getLogList(){
    let url = this.baseUrl+'/api/log-write/log-list'
    return this.getApi(url,{})
  }
}
export default new Request()