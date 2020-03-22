<template>
    <div class="">
    		头部
	  <el-dialog
		  title="活动营销维护"
		  :visible.sync="centerDialogVisible"
		  width="80%"
		  center
		  :beforeClose="beforeClose"
		>
		  <div class="stylemodal">
		  	<table>
		  		<tr>
		  			<td>活动标题</td>
		  			<td>
		  				<input class="mark_hdtitle" type="text" v-model="updata.activityTitle" />
		  			</td>
		  		</tr>
		  		<tr>
		  			<td>活动图片</td>
		  			<td>
		  				<UpLoadImg @emitimg="emitimg" :imgurl="updata.activityPictureUrl"/>
		  			</td>
		  		</tr>
		  		<tr>
		  			<td>活动链接</td>
		  			<td>
		  				<input class="mark_hdurl" type="text" v-model="updata.activityUrl" />
		  			</td>
		  		</tr>
		  		<tr v-if="userauth == '00001'">
		  			<td>活动锁定</td>
		  			<td>
		  				<el-checkbox v-model="updata.isLockcheck">锁定</el-checkbox>
		  			</td>
		  		</tr>
		  	</table>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="close">取 消</el-button>
		    <el-button type="primary" @click="submitdata">确 定</el-button>
		  </span>
		</el-dialog>
    </div>
</template>
<script>
	import UpLoadImg from './UpLoadImg'
	import {getitem} from './common'
	import {http} from './http'
	const {
		updateActivity
	} = http;
export default {
    name: '',
    data () {
        return {
        		userauth:null,
        		centerDialogVisible:true,
        		updata:{},
        }
    },
    props:["item"],
    watch:{
    		item(obj){
    			this.updata=obj;
    		}
    },
    components: {
    		UpLoadImg
    },
    created() {},
    mounted() {
    		this.updata={
    			...this.item,
    			isLockcheck:this.item.isLock=='1'?true:false,
    		};
  		this.userauth=getitem("userInfo").data.empOrgNo;
    },
    methods: {
    		beforeClose(){
    			this.centerDialogVisible = false;
    			this.close();
    		},
    		//上传成功回调
    		emitimg(url){
    			this.updata={
    				...this.updata,
    				activityPictureUrl:url
    			}
    		},
    		close(){
    			this.$emit("close")
    		},
    		submitdata(){
    			let updata={
    				...this.updata,
    				isLock:this.updata.isLockcheck?'1':'2'
    			}
    			this.$post(updateActivity,{...updata}).then(res=>{
    				if(res != 'error'){
    					this.$emit("close",true)
    					this.$message({
			          message: '操作成功！',
			          type: 'success'
			        });
    				}
    			})
    		}
    },
    filters: {}
}
</script>
<style scoped>
	.stylemodal table{
		width: 100%;
	}
	.stylemodal table td{
		padding: 10px;
	}
	.stylemodal table td:nth-child(1){
		width: 18%;
		text-align: right;
	}
	.stylemodal table td:nth-child(2){
		width: 82%;
	}
	.mark_hdtitle{
		padding: 5px 10px;
		width: 60%;
	}
	.mark_hdurl{
		padding: 5px 10px;
		width: 80%;
	}
</style>