<template>
<div id="teamAddPage">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名称"
          placeholder="请输入队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
            v-model="addTeamData.description"
            rows="3"
            autosize
            label="描述"
            type="textarea"
            placeholder="请输入描述"
      />
<!--      过期时间-->
      <van-field
          is-link
          readonly
          name="datetimePicker"
          label="过期时间选择"
          :placeholder="addTeamData.expireTime??'点击选择过期时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
            v-model="addTeamData.expireTime"
            @confirm="showPicker =false"
            @cancel="showPicker = false"
            type="datetime"
            title="选择关闭队伍加入的时间"
            :min-date="minDate"
        />
      </van-popup>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="Number(addTeamData.status) ===2"
          v-model="addTeamData.password"
          type="password"
          name="password"
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
</div>


</template>

<script setup lang="ts">
import {useRouter } from "vue-router";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
const router=useRouter();
const route=useRoute();
import moment from 'moment'

//日期展示器
const showPicker=ref(false);
//当前时间
const minDate=new Date();

/**
 * 获取要更新页面的id；
 */
const id=route.query.id;

//初始状态为空：
const addTeamData=ref({})
/**
 * 获取队伍的信息：
 */
onMounted(async ()=>{
  if (id<=0){
    Toast.fail('队伍加载失败')
    return;
  }
  const  res=await myAxiso.get("/team/get",{
    params:{
      id:id,
    }
  });

  if (res.code === 0){
    addTeamData.value=res.data;
    Toast.success('获取队伍信息成功');
  }else {
    Toast.fail('获取队伍信息失败');
  }

})



//发送post请求：提交更新的操作：
const onSubmit=async ()=>{
  const postData={
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    // expireTime: moment(addTeamData.value.expireTime).format("yyyy-MM-dd HH:mm:ss"),
  }
   const res=await myAxiso.post("/team/update",postData);
  if (res?.code===0 && res.data){
    Toast.success('更新成功');
    router.push({
      path:'/team',
      replace:true,
    })
  }else {
    Toast.fail('更新失败');
  }
}


</script>

<style scoped>

</style>