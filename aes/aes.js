import CryptoJS from 'crypto-js';
import {
  promise
} from '../uni_modules/uv-ui-tools/libs/function/test';


class aes {
  testImport() {
    console.log('aes对象导入成功');
  }

 // decrypt(encryptedData) {
 //     // 分离 IV 和加密数据
 //     const parts = encryptedData.split('|');
 //     const iv = CryptoJS.enc.Utf8.parse(parts[0]);
 
 //     const keyBytes = CryptoJS.enc.Utf8.parse('sZi8knPmD0BmXth3Ds48zSwBRs6Ow993');
 
 //     // 解密数据
 //     const decryptedData = CryptoJS.AES.decrypt({
 //         ciphertext: CryptoJS.enc.Base64.parse(parts[1]) // 修正此处，使用实际的密文
 //       },
 //       keyBytes, {
 //         iv: iv,
 //         mode: CryptoJS.mode.CBC,
 //         padding: CryptoJS.pad.Pkcs7
 //       }
 //     );
 
 //     // 将解密后的数据转换为明文
 //     const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
 //     console.log('AES解密结果', decryptedText);
 // }
 
 // encrypt(data) {
 //     // 将数据转成json
 //     let temp = JSON.stringify(data);
 //     const dataString = CryptoJS.enc.Utf8.parse(temp);
 
 //     // 随机向量iv
 //     const iv = CryptoJS.lib.WordArray.random(16); // 使用随机生成的 IV
 
 //     // 密钥
 //     const keyBytes = CryptoJS.enc.Utf8.parse('sZi8knPmD0BmXth3Ds48zSwBRs6Ow993');
 
 //     // 加密
 //     const encryptDate = CryptoJS.AES.encrypt(dataString, keyBytes, {
 //       iv: iv,
 //       mode: CryptoJS.mode.CBC,
 //       padding: CryptoJS.pad.Pkcs7
 //     });
 
 //     // 拼接 IV 和密文
 //     const encryptedString = CryptoJS.enc.Base64.stringify(iv) + '|' + encryptDate.toString();
 //     return encryptedString;
 // }

  
  decrypt(encryptedData) {
      // 分离 IV 和加密数据
      const parts = encryptedData.split('|');
      const iv = CryptoJS.enc.Base64.parse(parts[0]); // 因为后端返回的时候把iv用base64编码了 所有需要用base64的格式化方法
  
      const keyBytes = CryptoJS.enc.Utf8.parse('sZi8knPmD0BmXth3Ds48zSwBRs6Ow993'); //密钥是utf8格式的 所以需要使用utf8的格式方法
  
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
  
      // 将解密后的数据转换为明文
      const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText)
  }
  
  // 这个加密方法不可用  
  encrypt(data) {
      // 将数据转成json
      let temp = JSON.stringify(data);
      const dataString = CryptoJS.enc.Utf8.parse(temp);
      
      let jia = CryptoJS.enc.Base64.parse('YmFmMmY5MjViM2ZmMmU2ZQ==')
      console.log(jia);
      console.log(CryptoJS.enc.Base64.stringify(jia));
      debugger
  
      // 随机向量iv
      const iv = CryptoJS.lib.WordArray.random(16); // 使用随机生成的 IV
      console.log('随机向量',iv.toString());
      console.log('随机向量',iv);
      console.log('随机向量',iv);
      console.log('随机向量',iv);
      console.log('随机向量',iv);
      
  
      // 密钥
      const keyBytes = CryptoJS.enc.Utf8.parse('sZi8knPmD0BmXth3Ds48zSwBRs6Ow993');
  
      // 加密
      const encryptDate = CryptoJS.AES.encrypt(dataString, keyBytes, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
  
      // 拼接 IV 和密文
      const encryptedString = CryptoJS.enc.Base64.stringify(iv) + '|' + encryptDate.toString();
      return encryptedString;
  }


  generateRandomHex() {
    // 生成一个随机的十六进制数，然后将其转换为字符串并返回
    return Math.floor(Math.random() * 0xFFFFFFFFFFFFF).toString(16).padStart(16, '0');
  }

}


export default new aes()