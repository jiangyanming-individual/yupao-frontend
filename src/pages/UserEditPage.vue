<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute,useRouter} from "vue-router";
import {ref} from "vue";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
const route=useRoute(); //使用携带参数的路由
const router=useRouter();

const editUser = ref({
  editKey: route.query.eidtKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

const onSubmit = async () => {
  //拿到当前用户的信息：而且不能写在外面：
  const currentUser=await getCurrentUser();

  console.log(currentUser,"currentUser")
  if (!currentUser){
    Toast.fail('用户未登录！')
    return;
  }

  const res=await myAxiso.post(
      '/user/update',
      {
          "id": currentUser.id,
          [editUser.value.editKey] : editUser.value.currentValue
  })
  //todo editKey editName currentValue 提交给后台

  if (res.code === 0 && res.data >0){
     Toast.success("修改成功！");
     router.back();//返回到之前的页面：
  }else{
    Toast.fail("修改失败！");
  }

};

</script>


<style scoped>

</style>