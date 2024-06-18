import CryptoJS from 'crypto-js';
import MyIp from '@/common/myIp.js'

class aes {
  
  
   async reloadAESKey(){
    //AES 如果解密失败 那就重新获取AES的key
    let res = await uni.request({
      url: this.http + 'common/AESKey',
      method: 'POST'
    })
    if(res.data.code == 200){
      console.log('---------------------------',res.data.data);
      this.aesKey = res.data.data
    }
    console.log('重新获取AESkey',res.data);
  }

  constructor() {
    // this.aesKey = 'Written by YIRC99 Thank you for liking this software';
    this.aesKey = 'sZi8MyGoD0';
    this.http = MyIp.getIp()
  }
  

  async decrypt(encryptedData) {
    // 分离 IV 和加密数据
    const parts = encryptedData.split('|');
    const iv = CryptoJS.enc.Base64.parse(parts[0]); // 因为后端返回的时候把iv用base64编码了 所有需要用base64的格式化方法

    const keyBytes = CryptoJS.enc.Utf8.parse(this.aesKey); //密钥是utf8格式的 所以需要使用utf8的格式方法

    // 解密数据
    const decryptedData = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(parts[1]) //密文后端传递的也是base64的方法
      },
      keyBytes, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    let decryptedText
    try{
      decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    } catch(e) {
      // 解密失败，说明密文不正确，返回错误信息给前端
      // console.log('解密失败 key为',this.aesKey, e.message);
      await this.reloadAESKey()
      return null
    } 
    // console.log('解密成功 key为',this.aesKey);
    // 将解密后的数据转换为明文
    let result = JSON.parse(decryptedText)
    return result
  }

}


export default new aes()