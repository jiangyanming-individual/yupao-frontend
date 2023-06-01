<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        show-action
        placeholder="搜索队伍"
        @search="onSearch"
        @cancel="onCancel"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="private"></van-tab>
    </van-tabs>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList.length<1 || !teamList" image="search" description="搜索内容为空" />
    <van-button class="add-button"  icon="plus"  type="primary" @click="doAddTeam"/>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
const router=useRouter()


const active=ref('public')
const teamList=ref([])
const searchText = ref('');

//查询切换的状态：
const onTabChange=(name)=>{
  //查公开
  if (name ==='public'){
    listTeam(searchText.value,0);
  }else {
    //查加密
    listTeam(searchText.value,2);
  }
}

//搜索队伍：根据关键词   config是用于get请求： data：用于post请求
const listTeam=async (val='',status=0)=>{
  const res=await myAxiso.get("/team/list",{
    params:{
      searchText:val,
      pageNum:5,
      status,
    }
  });
  if (res?.code===0 && res.data){
    teamList.value=res.data;
  }else{
    Toast.fail('队伍加载失败！请刷新重试！')
  }
}

/**
 * 勾子函數：
 */
onMounted(async ()=>{
  listTeam()
})

/**
 *搜索框：
 * @param val
 */
const onSearch = (val) => {
 listTeam(val,status=0)
};

/**
 * 取消框；
 * @returns {ToastWrapperInstance}
 */
const onCancel = () => Toast('取消');


const doAddTeam=()=>{
  router.push({
    path:"/team/add"
  })
}
</script>

<style scoped>

</style>