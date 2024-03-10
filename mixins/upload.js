const mixin = {
  data() {
    return {
      name: '初始名字：张三',
      mixinMsg: 'mixinMsg'
    };
  },
  methods: {
    // 获取mixin中的msg
    getMixinMsg() {
      console.log('我是mixin.js中的getmsg方法，mixinmsg的数据是' + this.mixinMsg);
    },
    // 获取home中的homeMsg
    getHomeMsg() {
      console.log('我是mixin.js中的getHomeMsg方法，HomeMsg的数据是' + this.homeMsg);
    }
  },
  created() {
    console.log('在mixin中vue的data、生命周期、方法等都可以使用');
  }
};

export default mixin;