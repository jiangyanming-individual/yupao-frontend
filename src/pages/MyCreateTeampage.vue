<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        show-action
        placeholder="搜索队伍"
        @search="onSearch"
        @cancel="onCancel"
    />
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList.length<1 || !teamList" image="search" description="搜索内容为空" />
    <van-button class="add-button"  type="primary" icon="plus" @click="doAddTeam"/>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
const router=useRouter()


const teamList=ref([])
const searchText = ref('');

//搜索队伍：根据关键词搜索
const listTeam=async (val='')=>{
  const res=await myAxiso.get("/team/list/my/create",{
    params:{
      searchText:val,
      pageNum:5,
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
 listTeam(val)
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