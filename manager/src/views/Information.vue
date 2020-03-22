<template>
  <div class="wrapper">
    <div class="title">
      <span>{{title}}</span>
      <!-- <el-button type="primary" v-show="newTable.isShow" size="small">{{newTable.name}}</el-button> -->
    </div>
    <router-link v-if= "empOrgNo == '00001'" to="headline" active-class="active" @click="handleClick(0)">中银头条</router-link>
    <router-link to="new" active-class="active" @click="handleClick(1)">最新资讯</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:'information',
    empOrgNo:'',
  props: {},
  data() {
    return {
      title:'资讯管理',
      newTable:{
        name:'+ 新建资讯',
        isShow:false
      },
      list:[{
        name:'中银头条',
        path:'headline'
      },{
        name:'最新资讯',
        path:'new'
      }]
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleClick(index){
      if(index==0){
        this.newTable.isShow=false
      }else{
        this.newTable.isShow=true
      }
    }
  },
  created() {
    this.empOrgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.title{
  height: 66px;
  line-height: 66px;
  border:1px solid #000
}
.title span{
  font-size: 18px;
  margin-right: 10px;
  margin-left: 8px;
}

.wrapper a{
  width: 140px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  border: 1px solid rgba(215, 215, 215, 1);
  display: inline-block;
  margin-top: 10px;
}
.wrapper a.active{background-color: rgba(215, 215, 215, 1);}
</style>