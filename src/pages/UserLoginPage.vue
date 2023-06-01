<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-button class="add-button"  type="primary" @click="register" >注册</van-button>


</template>

<script setup>
import myAxiso from "../plugins/myAxiso";
import {ref} from "vue";
import {Toast} from "vant";
import {useRoute, useRouter} from 'vue-router'

/**
 *登录页
 * @type {Ref<UnwrapRef<string>>}
 */

const userAccount = ref('');
const userPassword = ref('');

const router=useRouter()
const route=useRoute();

const onSubmit = async () => {

  const res= await myAxiso.post('/user/login',{

    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  if (res.code === 0 && res.data!=null){
    Toast.success('登录成功！')

    //登录成功后跳转到之前的页面：
    const redirectUrl=route.query?.redirect ??'/';
    window.location.href=redirectUrl;
  }else{
    Toast.fail('登录失败！')
  }
};


/**
 * 注册
 */
const register=()=>{
   router.push({
     path:'/user/register'
   })
}
</script>

<style scoped>

</style>