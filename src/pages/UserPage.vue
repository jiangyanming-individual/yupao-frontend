<template>
  <template v-if="user">
    <van-cell title="当前用户"  :value="user?.userName"/>
    <van-cell title="更新用户信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>

</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {onMounted,ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user=ref();

const router=useRouter()

//进行登录用户信息的获取：
onMounted(async ()=>{
  user.value=await getCurrentUser();

})

/**
 * 定义修改函数：
 */
const toEdit=(editKey:string,editName:string,currentValue:string)=>{
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>
<style scoped>

</style>