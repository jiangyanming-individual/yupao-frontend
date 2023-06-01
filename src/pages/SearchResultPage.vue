<template>
<!--  <van-card-->
<!--      v-for="user in userList"-->
<!--      :desc="`个人简介:${user.profile}`"-->
<!--      :title="`${user.userName}(编号:${user.planetCode})`"-->
<!--      :thumb="user.avatarUrl"-->
<!--  >-->
<!--    <template #tags>-->
<!--      <van-tag plain type="danger" v-for="tag in tags" style="margin-top: 10px;margin-right: 8px">-->
<!--        {{tag}}-->
<!--      </van-tag>-->
<!--    </template>-->
<!--    <template #footer>-->
<!--      <van-button size="mini">联系我</van-button>-->
<!--    </template>-->
<!--  </van-card>-->
  <user-card-list :user-list="userList" :tags="tags"/>
  <van-empty v-if="userList.length<1 || !userList" image="search" description="搜索内容为空" />
</template>

<script setup>

import {onMounted,ref} from "vue";

import {useRoute} from 'vue-router'
const route=useRoute();
const { tags }=route.query; //获取标签的参数
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const userList=ref([])

//使用一个钩子函数： async 异步请求： await等这个请求执行完成才拿到数据
onMounted(async ()=>{
  //请求的url,参数;发送一个get请求
  const userListData=await myAxiso.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    //序列化：
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  }).then(function (response) {
        console.log('/user/search/tags succeed',response) //请求成功
        // console.log(response)
        return response?.data;
        Toast.success('请求成功!');
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error); //请求失败
        Toast.fail('请求失败！');
      });
   // console.log(userListData)
   if (userListData){
     userListData.forEach(user=>{
       //对标签进行json字符串的解析：
       if (user.tags){
         user.tags=JSON.parse(user.tags)
       }
     })
    userList.value=userListData
   }
})


//使用模拟数据：
// const mockUser = {
//   id: 1,
//   userName: 'jeremy',
//   userAccount: 'yupiadmin',
//   avatarUrl: 'https://p.qqan.com/up/2020-2/2020022708453463508.jpg',
//   gender: '男',
//   phone: '121311313',
//   profile:"要努力，要加油",
//   email: '23432@qq.com',
//   planetCode: '1',
//   createTime: new Date(),
//   tags:['java','前端','python'],
// };
// const userList=ref({mockUser})

</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>