<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选标签
  </van-divider>

  <div v-if="activeIds.length === 0" style="align-content: center">请选择标签</div>

  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    可选标签
  </van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block round=true type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup>
import {Toast} from "vant";
import {ref} from "vue";
import {useRouter} from 'vue-router'
const router=useRouter(); //使用路由

const searchText = ref('');
//搜索tags
const onSearch = (val) => {
  //搜索出所有符合条件的

  //在原始origiTagList中搜索:
  tagList.value=originTagList.map(parentTag=>{
    const tempChildren=[...parentTag.children];
    const tempParentTag={...parentTag};
    tempParentTag.children=tempChildren.filter(item=>item.text.includes(searchText.value));
    return tempParentTag;
  })
};


//搜索框取消
const onCancel = () => {
  searchText.value='';
  tagList.value=originTagList;
};

//关闭标签：移除标签，返回不移除的标签
const doClose=(tag) =>{
  activeIds.value=activeIds.value.filter(item=>{
    return item!==tag;
  })
}

const doSearchResult = ()=>{
    router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}



//标签数组：
const activeIds = ref([]);
const activeIndex = ref(0);

const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id:'男' },
      { text: '女', id:'女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
    ],
  },
];

//定义标签列表，引用originTagList
let tagList=ref(originTagList);

</script>

<style scoped>

</style>