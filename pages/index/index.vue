<template>	
		<view class="page">
      <page-meta>
        <navigation-bar background-color="#fff  " title="首页" front-color="#000000"></navigation-bar>
      </page-meta>
      
      
      <view class="pagebox">
        <my ref="mypage" v-show="tabIndex == 1"></my>
        <!-- <order v-show="tabIndex == 1"></order> -->
        <home ref="homepage" v-show="tabIndex == 0"></home>
      </view>
      
			<MagicNavigationBar :items="items" :height="60" :indicatorSize="50"
			@onTabSelect="onTab" indicatorBackgroundColor="#99f2ff">
				<template v-slot:text="{text}">
					{{text}}
				</template>				
			</MagicNavigationBar>
      
      
		</view>		
</template>

<script>
	import MagicNavigationBar from "@/uni_modules/jorbin-MagicNavigationBar/components/jorbin-MagicNavigationBar/jorbin-MagicNavigationBar.vue"
  import my from '@/pages/my/login.vue'
  import order from '@/pages/order/order.vue'
  import home from '@/pages/home/home.vue'
	export default {
		components:{
			MagicNavigationBar,
      my,
      order,
      home
		},
		data() {
			return {
        tabIndex: 2,
				items:[
					{
						icon:{src:require("@/static/carIcon2.png"),width:30,height:30},
						text:'拼车广场',
					},
					// {
					// 	icon:{src:require("@/static/cart (3).png"),width:30,height:30},
					// 	text:'我的订单',
					// },
					{
						icon:{src:require("@/static/notice (3).png"),width:30,height:30},
						text:'个人中心',
					},
				]
			}
		},
	
		methods: {
			onTab(index,item){
        this.tabIndex = index
        if(index == 1 ){
          uni.setNavigationBarTitle({title: '我的'})
          this.$refs.mypage.myonshow()
        }else if( index == 0){
          uni.setNavigationBarTitle({title: '拼车广场'})
          console.log('调用 myonshow 方法');
           this.$refs.homepage.myonshow()
        }
				console.log('tabIndex',index)
			}
		},
    mounted() {
      console.log('页面初始化onload');
      this.onTab(0,{})
      console.log('页面初始化onload 完毕');
    }
	}
</script>

<style>
  .pagebox{
    width: 100%;
    height: 500rpx;
  }
/* 	.page{
		height: 100vh;
		width: 100vw;
	} */
</style>
