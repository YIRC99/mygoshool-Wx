const mixin = {
  data() {
    return {
      avaPath: 'common/download?path=avatar&name=',
      avahttp: this.http + 'common/download?path=avatar&name=',
      QRPath: 'common/download?path=QRcode&name=',
      QRttp: this.http + 'common/download?path=QRcode&name=',
      shopPath: 'common/download?path=shop&name=',
      shophttp: this.http + 'common/download?path=shop&name=',
    };
  },
  methods:{
    myminxin(){
      console.log('muminxin',this.avahttp);
      console.log('muminxin',this.QRttp);
    }
  },
};

export default mixin;