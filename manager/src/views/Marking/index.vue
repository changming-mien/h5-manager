<template>
  <div class="marking">
	  <div class="marking_head">
	  	<span>营销活动管理</span>
	  	<button @click="newactive">+&nbsp;新建活动</button>
	  </div>	
	  <div class="marking_cont">
	  	<div class="marking_cont_head">总行活动</div>
	  	<div>
		    <el-table
			      :data="tableData"
			      style="width: 100%"
			      size="small"
			>
			      <el-table-column
			      	 v-for="(m,k) in column"
			      	 :key="k"
			      	 :prop="m.prop" 
			      	 :label="m.title" 
			      	 :width="m.width"
			      	 align="center"
			      	 >
			      		<!--<div v-if="m.prop=='isLock'">
					      	<template slot-scope="isLock">{{isLock}}</template>
			      		</div>-->
				      	
			      </el-table-column>
			      
			      
			      <!--<el-table-column prop="isLock" label="title"  align="center" >
			      		<div v-if="m.prop=='isLock'">
			      			{{m}}
			      			<div slot-scope="isLock">
					      		{{isLock}}
					      	</div>
			      		</div>
			      </el-table-column>-->
			      
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100"
		      align="center"
		      >
		      	  <!--<template slot-scope="cz" v-if="!auth">
				  </template>-->
		      	  <template slot-scope="cz">
				        <el-button @click="clickitem(cz)" type="text" size="small" v-if="!auth" :disabled="cz.row.isLockNew=='是'">复制</el-button>
				        <el-button type="text" size="small" @click="whauthitem(cz)" v-if="auth">维护</el-button>
				        <el-button type="text" size="small" @click="scauthitem(cz)" v-if="auth" style="color:red;">删除</el-button>
		      	  </template>
		    </el-table-column>
			      
		    </el-table>
	  	</div>
	  </div>
	  
	  
	  <div class="marking_cont" v-if="!auth">
	  	<div class="marking_cont_head">分行活动</div>
	  	<div>
		    <el-table
			      :data="tableData2"
			      style="width: 100%"
			      size="small"
			>
			      <el-table-column
			      	 v-for="(m,k) in column2"
			      	 :key="k"
			      	 :prop="m.prop" 
			      	 :label="m.title" 
			      	 :width="m.width"
			      	 align="center"
			      	 >
			      	 
			      </el-table-column>
			      
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100"
		      align="center"
		      >
		      	 <template slot-scope="cz">
				        <el-button type="text" size="small" @click="whauthitem(cz)">维护</el-button>
				        <el-button type="text" size="small" @click="scauthitem(cz)" style="color:red;">删除</el-button>
		      	  </template>
		      	<!--<template slot-scope="cz">
				        <el-button type="text" size="small">维护</el-button>
				        <el-button type="text" size="small" style="color:red;">删除</el-button>
				  </template>-->
		    </el-table-column>
			      
		    </el-table>
	  	</div>
	  </div>
	  
	  
	  <ModalEdit v-if="modalshow" :item="checkeditem" @close="close"/>
	  <UpToData v-if="upmodalshow"  @close="upclose" :item="createItem"/>
	  
  </div>
</template>

<script>
	import ModalEdit from './ModalEdit'
	import UpToData from './UpToData'
	import {getitem} from './common'
	import {http} from './http'
	const{
		getActivity,
		deleteActivity,
		checkCreate,
		addActivity
	} = http;
	const column=[
//		{title:'序号',width:'180',prop:'sort'},
		{title:'活动标题',width:'',prop:'activityTitle'},
		{title:'维护人',width:'',prop:'orgName'},
		{title:'是否绑定',width:'',prop:'isLockNew'},
		{title:'维护更新时间',width:'',prop:'updateTime'},
	]
	const column2=[
//		{title:'序号',width:'180',prop:'sort'},
		{title:'活动标题',width:'',prop:'activityTitle'},
		{title:'维护人',width:'',prop:'orgName'},
		{title:'维护更新时间',width:'',prop:'updateTime'},
	]
export default {
  components: {ModalEdit,UpToData},
  props: {},
  data() {
	return {
		createItem:{},//复制的初始数据
		upmodalshow:false,//新建
		upitem:{},
		checkeditem:{},//选中的值
		auth:null,
		modalshow:false,
		column,
		column2,
		tableData:[],
		tableData2:[]
	};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
	this.start()
	
  },
  methods: {
  	//总行删除
  	scauthitem(o){
  		this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       }).then(() => {
          this.$post(deleteActivity,{activityId:o.row.activityId}).then(res=>{
	  			if(res != 'error'){
	  				this.start()
	  				this.$message({
			          message: '删除成功！',
			          type: 'success'
			        });
	  			}
	  		})
        }).catch(() => {
//        this.$message({
//          type: 'info',
//          message: '已取消删除'
//        });          
        });
  		
  	},
  	//新建
  	newactive(){
  		let loading=this.$loading({ fullscreen: true });
  		this.$get(checkCreate).then(res=>{
  			loading.close()
  			if(res !='error'){
  				if(res === false){
  					this.$message({
			          message: '活动不能创建！',
			          type: 'success'
			        });
  				}else{
  					this.upmodalshow = true;
  				}
  			}
  		})
  	},
  	upclose(isup){
  		this.upmodalshow = false;
  		if(isup){
  			this.start()
  		}
  	},
  	//关闭模态
  	close(isup){
  		this.modalshow = false;
  		if(isup){
  			this.start()
  		}
  	},
  	start(){
  		let userauth=getitem("userInfo").data.empOrgNo;
  		if(userauth == '00001'){
  			this.auth=true;
  			this.zhdata(userauth)
		}else{
			this.auth=false;
			this.zhdata("00001")
			this.fhdata(userauth)
		}
  	},
  	zhdata(userauth){
  		let loading=this.$loading({ fullscreen: true });
  		this.$get(getActivity,{orgNo:userauth}).then(res=>{
  			loading.close();
			this.tableData=(res.data || []).map(m=>{
				return {
					...m,
					isLockNew:m.isLock == 1?'是':'否'
				}
			})
		})
  	},
  	fhdata(userauth){
  		let loading=this.$loading({ fullscreen: true });
  		this.$get(getActivity,{orgNo:userauth}).then(res=>{
  			loading.close();
			this.tableData2=(res.data || []).map(m=>{
				return {
					...m,
					isLockNew:m.isLock == 1?'是':'否'
				}
			})
		})
  	},
  	clickitem(a){
		//   console.log(a.row.isLockNew)
		let loading=this.$loading({ fullscreen: true });
		this.$get(checkCreate).then(res=>{
			loading.close()
			if(res !='error'){
				if(res === false){
					this.$message({
			          message: '活动不能创建！',
			          type: 'success'
			        });
				}else{
					// console.log(a.row)
					a.row.isLock="2"
					this.createItem=a.row
					this.$post(addActivity,this.createItem).then(res=>{
						this.start()
					})
					// this.upmodalshow = true;
				}
			}
		})
  	},
  	//总行维护
  	whauthitem(o){
  		this.modalshow = true;
  		this.checkeditem=o.row || {}
  	},
  	
  },
};
</script>
<style  scoped>
	.marking{
		font-size: 14px;
	}
	.marking_head{
		font-size: 14px;
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}
	.marking_head span{
		font-size: 18px;
	}
	.marking_head button{
		padding: 5px 10px;
		border-radius: 5px;
		border: 0;
		background: #409EFF;
		color: #fff;
		margin: 0 20px;
		cursor: pointer;
	}
	.marking_head button:hover{
		opacity: .8;
	}
	.marking_cont{
		border: 1px solid #ddd;
		margin-top: 10px;
	}
	.marking_cont_head{
		font-size: 16px;
		font-weight: bold;
		padding: 0 20px;
		line-height: 40px;
		border-bottom: 1px solid #ddd; 
	}
</style>