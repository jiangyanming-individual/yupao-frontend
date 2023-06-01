<template>
<!--  如果用户未登录不显示-->
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.userName" @click="toEdit('userName','昵称',user.userName)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <van-image
          round
          width="4rem"
          height="4rem"
          :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号"  :value="user.planetCode"/>
    <van-cell title="注册时间"  :value="user.createTime"/>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="logout">
        注销
      </van-button>
    </div>
  </template>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted,ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user=ref();

const router=useRouter()
const route=useRoute()
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


/**
 * 退出登录：
 */
const logout = async () => {
  const res= await myAxiso.post('/user/logout')
  if (res.code === 0 && res.data!=null){
    Toast.success('退出成功！')
    //登录成功后跳转到之前的页面：
    const redirectUrl=route.query?.redirect ??'/';
    window.location.href=redirectUrl;
  }else{
    Toast.fail('退出失败！')
  }
};

</script>
<style scoped>

</style>