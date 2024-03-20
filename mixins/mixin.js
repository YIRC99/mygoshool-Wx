const mixin = {
  data() {
    return {
      avahttp: this.http + 'common/download?path=avatar&name=',
      QRttp: this.http + 'common/download?path=QRcode&name=',
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