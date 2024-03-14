const mixin = {
  data() {
    return {
      // avahttp: 'http://192.168.192.210:33088/common/download?path=avatar&name=',
      avahttp: 'http://192.168.1.110:33088/common/download?path=avatar&name=',
      // avahttp: 'http://192.168.1.102:33088/common/download?path=avatar&name=',
      // QRttp: 'http://192.168.192.210:33088/common/download?path=QRcode&name=',
      QRttp: 'http://192.168.1.110:33088/common/download?path=QRcode&name=',
      // QRttp: 'http://192.168.1.102:33088/common/download?path=QRcode&name=',
    };
  },
  onload(){
    console.log('我是 mixin 住建的onload ',this.http);
  }
};

export default mixin;