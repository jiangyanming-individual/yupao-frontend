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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="校验密码"
          placeholder="请输入校验密码"
          :rules="[{ required: true, message: '请填写校验密码' }]"
      />
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="星球编号"
          placeholder="请输入星球编号"
          :rules="[{ required: true, message: '请填写星球编号' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import myAxiso from "../plugins/myAxiso";
import {ref} from "vue";
import {Toast} from "vant";
import {useRoute, useRouter} from 'vue-router'

const route=useRoute();
const router=useRouter();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword=ref('');
const planetCode=ref('');


const onSubmit=async () =>{
    //post的方式传入参数：请求后端的注册接口
   const res=await myAxiso.post('/user/register',{
       userAccount:userAccount.value,
       userPassword:userPassword.value,
       checkPassword:checkPassword.value,
       planetCode: planetCode.value,
   })
   if (res.code === 0 && res.data!=null){
     Toast.success('注册成功!');

     // const redirectUrl=route.query?.redirect?? '/';
     // window.location.href=redirectUrl;
     router.push({
       path:'/user/login',
       replace:true, //替换重定向的意思；
     });


   }else {
     //如果res.desc存在 ：三目运算符：
     Toast.fail('注册失败！'+(res.desc?`,${res.desc}`:""));
   }
}

</script>

<style scoped>

</style>