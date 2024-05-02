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
    // 请求返回code值统一处理方法  值处理错误请求 正确不处理
    returnCodeHandle(code){
      if(code == 200) return true
      if(code == 403){
        this.$refs.message.show({
          type: 'error', 
          msg: '请登录后重试', 
        })
        return false
      }
      
    },
    compareTime(cancelTime,curr){
      let cancel = new Date(cancelTime)
     
      if(cancel.getTime() > curr.getTime())
        return false
      else return true
    },
    formatDateTime(arr) {
        // 检查数组长度是否为 5 或 6
        if (arr.length !== 5 && arr.length !== 6) {
            return 'Invalid input array length.';
        }
        // 解构数组元素，分别对应年、月、日、时、分、秒
        const [year, month, day, hour, minute, second = '0'] = arr;
        // 使用三元运算符处理月、日、时、分的个位数，保证输出格式为两位数
        const formattedMonth = month < 10 ? '0' + month : month;
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedHour = hour < 10 ? '0' + hour : hour;
        const formattedMinute = minute < 10 ? '0' + minute : minute;
        const formattedSecond = second < 10 ? '0' + second : second;
    
        // 构建时间字符串
        const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
    
        return formattedDateTime;
    },
    // 处理拼车是不是过期状态
    updateCarOrderStatus(currTime,order){
      // 格式化时间
      let startTime = new Date(order.startdatetime)

      // 如果当前时间大于出发时间 那么就是过期了 那么修改status为3 否则不管
      if(currTime >= startTime.getTime()){
        order.status = 3
      }
    },
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
    // 刷新本地存储的微信图片
    refreshLocalWxImg(img){
      if(img == null || img == undefined) return 
      let user = uni.getStorageSync('user')
      user.userWxImg = img
      uni.setStorageSync('user',user)
    }
  },
};

export default mixin;