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
    // 获取该时刻对应的毫秒级时间戳
    getYearLastMillisecondTimestamp(){
      var now = new Date();
      var year = now.getFullYear();
      var lastSecond = new Date(year, 11, 31, 23, 59, 59, 999); // 设置时间为年末最后1秒
      return lastSecond.getTime();
    },
    myminxin(){
      console.log('muminxin',this.avahttp);
      console.log('muminxin',this.QRttp);
    },
    refreshLocalWxImg(img){
      if(img == null || img == undefined) return 
      let user = uni.getStorageSync('user')
      user.userWxImg = img
      uni.setStorageSync('user',user)
    }
  },
};

export default mixin;