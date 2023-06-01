<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchmode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="userList.length<1 || !userList" image="search" description="搜索内容为空" />
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {useRoute} from 'vue-router'
const route=useRoute();
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const userList=ref([]);
const isMatchmode=ref<boolean>(false);
const loading = ref(true);

//加载数据：
const loadData=async()=>{
  //定义变量：
  let userListData;

  //请求加载数据loading;
  loading.value=true;


  if(isMatchmode.value){
      //心动模式：：
    const num=5;
    userListData=await myAxiso.get('/user/match',{
    params:{
      num,
    },
  }).then(function (response) {
    console.log('/user/match succeed',response) //请求成功
    return response?.data;
    Toast.success('请求成功!');
  }).catch(function (error) {
        console.error('/user/match error',error); //请求失败
        Toast.fail('请求失败！');
      });

  }else{
    //推荐模式
    //请求的url,参数;发送一个get请求;获取所有的用户
   userListData=await myAxiso.get('/user/recommend',{
    params:{
      pageSize: 8,
      pageNum:1,
    }
  }).then(function (response) {
    console.log('/user/recommend succeed',response) //请求成功
    // console.log(response)
    return response?.data?.records;
    Toast.success('请求成功!');
  }).catch(function (error) {
        console.error('/user/recommend error',error); //请求失败
        Toast.fail('请求失败！');
      });
  };
  if (userListData){
    userListData.forEach(user=>{
      //对标签进行json字符串的解析：
      if (user.tags){
        user.tags=JSON.parse(user.tags)
      }
    })
    userList.value=userListData;
  }

  //加载完数据后为false；
  loading.value=false;
}

watchEffect(()=>{
  loadData();
})

//使用一个钩子函数： async 异步请求： await等这个请求执行完成才拿到数据
// onMounted(async ()=>{
//   //请求的url,参数;发送一个get请求;获取所有的用户
//   const userListData=await myAxiso.get('/user/recommend',{
//     params:{
//       pageSize: 8,
//       pageNum:1,
//     }
//   }).then(function (response) {
//     console.log('/user/recommend succeed',response) //请求成功
//     // console.log(response)
//     return response?.data?.records;
//     Toast.success('请求成功!');
//   })
//       .catch(function (error) {
//         console.error('/user/recommend error',error); //请求失败
//         Toast.fail('请求失败！');
//       });
//   if (userListData){
//     userListData.forEach(user=>{
//       //对标签进行json字符串的解析：
//       if (user.tags){
//         user.tags=JSON.parse(user.tags)
//       }
//     })
//     userList.value=userListData
//   }
// })
</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>