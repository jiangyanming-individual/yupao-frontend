<template>
  <van-skeleton title avatar :row="3" :loading="props.loading"
                v-for="user in props.userList" >
    <van-card
        :desc="`个人简介:${user.profile}`"
        :title="`${user.userName}(编号:${user.planetCode})`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-top: 10px;margin-right: 8px">
          {{tag}}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps{
  userList: UserType;
  loading:boolean; //加载的状态：
}

//给父组件设置默认值：保证数据不为空：
const props=withDefaults(defineProps<UserCardListProps>(),{
  userList:[] as UserType[],
  loading:true,
})

</script>

<style scoped>
  .vant-tag--dange.vant-tag--plain{
    color: #002fff;
  }
</style>