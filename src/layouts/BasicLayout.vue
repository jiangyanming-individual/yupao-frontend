<!--全局使用的模板-->

<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
      <router-view/>
  </div>

<!--  to是进行路跳转-->
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {Toast} from "vant";
import IndexPage from "../pages/Index.Vue";
import TeamPage from "../pages/Teampage.Vue";

import {useRouter} from 'vue-router'
import routes from "../config/router";
import {ref} from "vue";
//使用路由：
const router=useRouter();
const DEFAULT_TITLE='伙伴匹配';
const title=ref(DEFAULT_TITLE);//引入类型

const onClickLeft = () => {
  router.back(); //返回到上一页
}
const onClickRight = () => {
  router.push('/search');
}
// const active = ref("index");
// const onChange = (index) => Toast(`标签 ${index}`);

/**
 * 根据路由切换标题
 */

router.beforeEach( (to,from)=>{
  const topath=to.path;
  const route=routes.find((route)=>{
    return topath == route.path;
  })

  title.value=route?.title??DEFAULT_TITLE;

})


</script>

<style scoped>

</style>