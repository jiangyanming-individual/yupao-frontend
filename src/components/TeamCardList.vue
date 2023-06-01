<template>
  <van-card
      v-for="team in teamList"
      :title="`队伍名:${team.name}`"
      :desc="`队伍简介:${team.description}`"
      :thumb="'https://tupian.qqw21.com/article/UploadPic/2021-1/20211722215532214.jpg'"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-top: 10px;margin-right: 8px">
        {{
          teamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{`队伍人数:${team.hasJoinNum}/${team.maxNum}`}}
      </div>
      <div>
        {{'创建时间:'+ team.createTime}}
      </div>
      <div v-if="team.expireTime">
        {{'过期时间:'+ team.expireTime}}
      </div>
    </template>

    <template #footer>
<!--      创建人不可见加入队伍按钮;而且没有加入当前队伍-->
      <van-button v-if="team.userId !==currentUser?.id && team.hasJoin ===false" size="mini" type="primary" plain @click="preJoinTeam(team)">加入队伍</van-button>
<!--      只有创建人才可以更新队伍-->
      <van-button v-if="team.userId ===currentUser?.id" size="mini" type="warning" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
<!--      仅加入队伍的人而且不是创建人可见,而且加入了队伍;-->
      <van-button  v-if="team.userId !==currentUser?.id  && team.hasJoin" size="mini" type="warning" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
<!--      只有队长才可以解散队伍-->
      <van-button  v-if="team.userId ===currentUser?.id" size="mini" type="danger" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
      <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
        <van-field
            v-model="joinPassword" type="password" placeholder="请输入密码"/>
      </van-dialog>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/teamstatus";
import myAxiso from "../plugins/myAxiso";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

const router=useRouter();

const showPasswordDialog=ref(false);
const joinTeamId=ref(0);
const joinPassword=ref('');//加密的密码：
/**
 * 获取当前用户信息：
 */
const currentUser=ref();
onMounted(async ()=>{
  currentUser.value=await getCurrentUser();

})

interface TeamCardListProps{
  teamList: TeamType;
}

//给父组件设置默认值：保证数据不为空：
const props=withDefaults(defineProps<TeamCardListProps>(),{
  teamList:[] as TeamType[],
})


//判断是公开的队伍还是私密的队伍
const preJoinTeam= async (team:TeamType)=>{
  joinTeamId.value=team.id;
  if (team.status === 0){
      doJoinTeam();
  }else{
     showPasswordDialog.value=true;
  }
}
/**
 * 加入队伍
 * @param id
 */
const doJoinTeam=async()=>{
  //如果队伍id不存在：
  if (!joinTeamId.value){
    return
  }
  //传递teamId和密码：
    const res=await myAxiso.post("/team/join",{
      teamId: joinTeamId.value,
      password: joinPassword.value,
    })
    if (res?.code===0 && res.data){
      Toast.success('加入队伍成功！')
      doJoinCancel();
    }else{
      //三元运算：如果description 存在 ${res.description} 否则显示''
      Toast.fail('加入队伍失败！'+(res.desc? `,${res.desc}`:''));
    }

}
//清空密码：
const doJoinCancel=()=>{
    joinTeamId.value=0;
    joinPassword.value='';
}

/**
 * 更新队伍，跳转到更新队伍的页面：
 * @param id
 */
const doUpdateTeam=async (id:number)=>{
   router.push({
     path:"/team/update",
     query:{
       id,
     }
   })
}

/**
 * 退出队伍
 * @param id
 */

//todo
const doQuitTeam=async (id:number)=>{
  const res =await myAxiso.post("/team/quit", {
    teamId:id,
  })
  if (res?.code ===0){
     Toast.success('退出队伍成功！')
  }else{
    Toast.fail('退出队伍失败！'+(res.desc? `,${res.desc}`:''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam=async (id:number)=>{
  const res =await myAxiso.post("/team/delete",{
    teamId:id,
  })
  if (res?.code === 0){
    Toast.success('删除队伍成功！')
  }else{
    Toast.fail('删除队伍失败！'+(res.desc? `,${res.desc}`:''));
  }

}

</script>
<style scoped>
  .vant-tag--dange.vant-tag--plain{
    color: #002fff;
  }
</style>