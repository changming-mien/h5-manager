<template>
     <div>
		<div v-if = "orgNo == '00001'">
			<div style = "position:absolute;left:132px;top:32px;">
				 <el-button @click="addProductFunZH" type="primary" size="small">+ 新增资讯</el-button>
			</div>
			<div class = "tableInfo">
				<div class = "headOffice" >
					<p style= "font-size:18px;"> 总行资讯</p>
					<el-table
					  :data="tableData"
					  border>
					  <el-table-column
						type="index"
						align = 'center'
						label="资讯ID"
						width="70">
					  </el-table-column>
					  <el-table-column
						prop="newsTitle"
						align = 'center'
						label="资讯标题"
						min-width="120">
					  </el-table-column>
					  <el-table-column
						prop="orgName"
						align = 'center'
						label="维护人"
						min-width="80">
					  </el-table-column>
					  <el-table-column
						prop="isLock"
						align = 'center'
						label="是否锁定"
						:formatter="isLockFun"
						width="80">
					  </el-table-column>
					  <el-table-column
						prop="updateTime"
						label="维护更新时间"
						align = 'center'
						min-width="280">
					  </el-table-column>
					  <el-table-column
					  align = 'center'
						label="操作"
						min-width="50">
						<template slot-scope="scope">
						  <el-button @click="handleClickZH(scope.row)" type="text" size="small">维护</el-button>
						  <el-button type="text" size="small" @click  = "deleteFunZH(scope.$index,scope.row)">删除</el-button>
						</template>
					  </el-table-column>
					</el-table>
				</div>
			</div>
			<el-dialog title="新增资讯" :visible.sync="dialogFormVisibleZH">
			  <el-form :model="addForm">
				<el-form-item label="资讯类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>最新资讯</span>
				</el-form-item>
				<el-form-item label="资讯标题:" :label-width="formLabelWidth">
				  <el-input v-model="addForm.newsTitle" autocomplete="off" placeholder="请保持十个字以内，超出部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="资讯图片:" :label-width="formLabelWidth">
				  <el-upload
					class="avatar-uploader"
					action="service/upLoad/uploadImgCommon"
					:show-file-list="false"
					:on-success="ZHADDhandleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="addForm.newsPictureUrl" :src="addForm.newsPictureUrl" class="avatar">
					<el-button v-else size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">&nbsp;&nbsp;
						只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				</el-form-item>
				<el-form-item label="资讯链接:" :label-width="formLabelWidth">
				  <el-input v-model="addForm.newsUrl" autocomplete="off" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="资讯锁定:" :label-width="formLabelWidth">
					  <el-checkbox v-model="checked">锁定</el-checkbox>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelFun">取 消</el-button>
				<el-button type="primary" @click="addFunZH">确 定</el-button>
			  </div>
			</el-dialog>
			
			<!-- 维护弹框   开始-->
			<el-dialog title="编辑" :visible.sync="dialogWHZH">
			  <el-form :model="addFormWH">
				<el-form-item label="资讯类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>{{nameType}}</span>
				</el-form-item>
				<el-form-item label="资讯标题:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.newsTitle" autocomplete="off" placeholder="请保持十个字以内，超出部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="资讯图片:" :label-width="formLabelWidth">
					<el-upload
					class="avatar-uploader"
					action="/service/upLoad/uploadImgCommon"   
					:show-file-list="false"   
					:on-success="handleAvatarSuccess"  
					:before-upload="beforeAvatarUpload"> 
					<img v-if="addFormWH.newsPictureUrl" :src="addFormWH.newsPictureUrl" class="avatar">
					<el-button v-else size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">&nbsp;&nbsp;
						只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>

				  <!-- <el-input v-model="addFormWH.newsPicture" autocomplete="off" placeholder="请保持十五个字以内，超出部分将无法显示"></el-input> -->
				</el-form-item>
				<el-form-item label="资讯链接:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.newsUrl" autocomplete="off" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="资讯锁定:" :label-width="formLabelWidth">
					 <el-checkbox v-model="checkedWHZH">锁定</el-checkbox>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelFun">取 消</el-button>
				<el-button type="primary" @click="submitFunZH">确 定</el-button>
			  </div>
			</el-dialog>
			<!-- 维护弹框  结束-->
		</div>
	<div v-if = "orgNo !== '00001'">
		<div style = "position:absolute;left:132px;top:32px;">
			<el-button @click="addProductFun" type="primary" size="small">+ 新增资讯</el-button>
		</div>
		<div class = "tableInfo">
			<div class = "headOffice" >
				<p style= "font-size:18px;margin:10px 0;">总行资讯</p>
				<el-table
				  :data="tableData"
				  border>
				  <el-table-column
				    type="index"
					align = 'center'
				    label="资讯ID"
				    width="80">
				  </el-table-column>
				  <el-table-column
				    prop="newsTitle"
					align = 'center'
				    label="资讯标题"
				    min-width="120">
				  </el-table-column>
				  <el-table-column
				    prop="orgName"
					align = 'center'
				    label="维护人"
				    min-width="80">
				  </el-table-column>
				  <el-table-column
				    prop="isLock"
				    label="是否锁定"
					align = 'center'
					:formatter="isLockFun"
				    width="80">
				  </el-table-column>
				  <el-table-column
				  align = 'center'
				    prop="updateTime"
				    label="维护更新时间"
				    width="280">
				  </el-table-column>
				  <el-table-column
				  align = 'center'
				    label="操作"
				    min-width="50">
				    <template slot-scope="scope">
				      <el-button @click="handleClick(scope.row)" type="primary" size="small" :disabled="scope.row.isLock == '1'">复制</el-button>
				    </template>
				  </el-table-column>
				</el-table>
			</div>
			  <div class = "branch">
			  	<p style= "font-size:18px;margin:10px 0;">分行资讯</p>
			  	<el-table
			  	  :data="tableDataSecond"
			  	  border>
			  	  <el-table-column
			  	   type="index"
				   align = 'center'
			  	    label="资讯ID"
			  	    width="80">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="newsTitle"
			  	    label="资讯名称"
			  	    min-width="120">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="orgName"
			  	    label="维护人"
			  	    min-width="80">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="updateTime"
			  	    label="维护更新时间"
			  	    min-width="280">
			  	  </el-table-column>
			  	  <el-table-column
			  	    label="操作"
					align = 'center'
			  	    min-width="50">
			  	    <template slot-scope="scope">
			  	      <el-button @click="handleClickSecond(scope.row)" type="text" size="small">维护</el-button>
					  <el-button type="text" size="small" @click  = "deleteFun(scope.$index,scope.row)">删除</el-button>
			  	    </template>
			  	  </el-table-column>
			  	</el-table>
			  </div>
		</div>
		<el-dialog title="新增资讯" :visible.sync="dialogFormVisible">
		  <el-form :model="addForm2">
				<el-form-item label="资讯类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>最新资讯</span>
				</el-form-item>
				<el-form-item label="资讯标题:" :label-width="formLabelWidth">
				  <el-input v-model="addForm2.newsTitle" autocomplete="off" placeholder="请保持十个字以内，超出部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="资讯图片:" :label-width="formLabelWidth">
				  <el-upload
					class="avatar-uploader"
					action="service/upLoad/uploadImgCommon" 
					:show-file-list="false"
					:on-success="FHhandleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="addForm2.newsPictureUrl" :src="addForm2.newsPictureUrl" class="avatar">
					<el-button v-else size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">&nbsp;&nbsp;
						只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
				</el-form-item>
				<el-form-item label="资讯链接:" :label-width="formLabelWidth">
				  <el-input v-model="addForm2.newsUrl" autocomplete="off" placeholder=""></el-input>
				</el-form-item>
			  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancelFun">取 消</el-button>
		    <el-button type="primary" @click="addFun">确 定</el-button>
		  </div>
		</el-dialog>
		
		<!-- 维护弹框   开始-->
		<el-dialog title="维护资讯" :visible.sync="dialogWH">
		  <el-form :model="addFormWH2">
		    <el-form-item label="资讯类型:" :label-width="formLabelWidth">
		      <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
			  <span>{{nameType}}</span>
		    </el-form-item>
			<el-form-item label="资讯标题:" :label-width="formLabelWidth">
			  <el-input v-model="addFormWH2.newsTitle" autocomplete="off" placeholder="请保持十个字以内，超出部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="资讯图片:" :label-width="formLabelWidth">
					<el-upload
						class="avatar-uploader"
						action="service/upLoad/uploadImgCommon"  
						:show-file-list="false"   
						:on-success="FHWHhandleAvatarSuccess"  
						:before-upload="beforeAvatarUpload"> 
						<img v-if="addFormWH2.newsPictureUrl" :src="addFormWH2.newsPictureUrl" class="avatar">
						<el-button v-else size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">&nbsp;&nbsp;
							只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				  <!-- <el-input v-model="addFormWH.newsPicture" autocomplete="off" placeholder="请保持十五个字以内，超出部分将无法显示"></el-input> -->
				</el-form-item>
			<el-form-item label="资讯链接:" :label-width="formLabelWidth">
			  <el-input v-model="addFormWH2.newsUrl" autocomplete="off" placeholder=""></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancelFun">取 消</el-button>
		    <el-button type="primary" @click="submitFun">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 维护弹框  结束-->
	</div>
	</div>
</template>

<script>
export default {
    name: 'new',
	data() {
		return {
			sdFile:'',
			checkedWHZH:true,
			checked:false,
			dialogFormVisibleZH:false,
			dialogWHZH:false,
			// 总行机构号
			orgNo:'',
			addForm:{
				newsTitle:'',
				newsId:'',
				newsPictureUrl:'',
				newsPicture:'',
				newsUrl:'',
				isLock:'',
				orgNo:''
			},
			addForm2:{
				newsTitle:'',
				newsId:'',
				newsPictureUrl:'',
				newsPicture:'',
				newsUrl:'',
				isLock:'',
				orgNo:''
			},
			addFormWH:{
				newsTitle:'',
				isLock:'',
				newsPicture:'',
				newsPictureUrl:'',
				newsId:'',
				newsUrl:'',
				newsType:'',
				orgName:''
			},
			addFormWH2:{
				newsTitle:'',
				isLock:'',
				newsPicture:'',
				newsPictureUrl:'',
				newsId:'',
				newsUrl:'',
				newsType:'',
				orgName:''
			},
			dialogProName:'',
			formLabelWidth: '120px',
			dialogFormVisible:false,
			dialogWH:false,
			dialogProNameWH:'',
			productType:null,
			tableData:[],//总行数据
			tableDataSecond:[]//分行数据
		}
	},
	computed:{
		nameType(){
		  if(this.dialogProNameWH=="01"){
			  return "中银头条"
		  }else{
				return "最新资讯"
			}
		}
	},
	created(){
		this.orgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
		this.getProfile()
	},
	methods: {
		handleAvatarSuccess(res, file) {
			console.log(res.data)
			this.addFormWH.newsPictureUrl=res.data
			this.$forceUpdate()
		},
		ZHADDhandleAvatarSuccess(res, file){
			this.addForm.newsPictureUrl=res.data
			this.$forceUpdate()
		},
		FHhandleAvatarSuccess(res,file){
			this.addForm2.newsPictureUrl=res.data
			this.$forceUpdate()
		},
		FHWHhandleAvatarSuccess(res,file){
			this.addFormWH2.newsPictureUrl=res.data
			this.$forceUpdate()
		},
		beforeAvatarUpload(file) {
			
		},
		getProfile(){
			this.orgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			this.$axios.get('/news/getNewsList').then((res) => {
				console.log(res.data)
				const ZHtable=[]//定义一个总行权限空数组
				const ZHtable2=[]//定义一个分行权限总行空数组
				const FHtable=[]//定义一个分行权限下分行空数组
			if (res.data.flag){
				res.data.data.data.forEach(item=>{
				if(item.newsType =='02'){
					if(this.orgNo== '00001'){//总行权限
						if(item.orgNo=='00001'){//只展示总行资讯
							ZHtable.push(item)
						}
						this.tableData=ZHtable
					}else{//分行权限 展示总行与分行的数据
						if(item.orgNo=='00001'){//如果是总行数据
							ZHtable2.push(item)
							this.tableData=ZHtable2
						}else{//如果是分行数据
							FHtable.push(item)
							this.tableDataSecond=FHtable
						}
						this.tableDataSecond=FHtable
					}
					}
				})
				console.log(ZHtable)
				console.log('分行'+FHtable)
			} else {
					this.sessionOut();
				}	
			})
		},
		addProductFunZH(){
			this.$axios.get('/news/checkCreate').then((res) => {
				if (res.data.data){
					this.dialogFormVisibleZH = true;
				} else {
					this.$alert('已达到最大创建数量，请删除后再进行创建。', '提示', {
					  confirmButtonText: '确定',
					});
				}
			})
			
		},
		submitFunZH(){
			if (this.checkedWHZH){
				this.addFormWH.isLock = '1';
			} else {
				this.addFormWH.isLock = '2';
			}
			this.$axios.post('/news/updateNews',this.addFormWH).then((res) => {
				console.log (res.data)
				if (res.data.flag){
					this.getProfile()
					// this.isLockFun(res.data.data)
					console.log(this.isLockFun(res.data.data))
					this.dialogWHZH = false
				} else {
					// this.sessionOut();
				}
			})
		},
		submitFun(){
			this.$axios.post('/news/updateNews',{
				newsTitle:this.addFormWH2.newsTitle,
				isLock:this.addFormWH2.isLock,
				newsPictureUrl:this.addFormWH2.newsPictureUrl,
				newsId:this.addFormWH2.newsId,
				newsUrl:this.addFormWH2.newsUrl,
				newsType:this.addFormWH2.newsType
			}).then((res) => {
				console.log(res.data)
				if (res.data.flag){
					this.getProfile();
					this.dialogWH = false;
				} else {
					// this.sessionOut();
				}
			})
		},
		addProductFun(){
			this.$axios.get('/news/checkCreate').then((res) => {
				if (res.data.data){
					this.dialogFormVisible = true;
				} else {
					this.$alert('已达到最大创建数量，请删除后再进行创建。', '提示', {
					  confirmButtonText: '确定',
					});
				}
			})
		},
		cancelFun(){
			this.dialogWH = false;
			this.dialogWHZH = false;
			this.dialogFormVisibleZH = false;
			this.dialogFormVisible = false;
		},
		addFunZH(){
			if (this.checked){
				this.addForm.isLock = '1'
			} else {
				this.addForm.isLock = '2'
			}
			this.addForm.orgNo =JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			this.$axios.post('/news/addNews',{
				newsTitle:this.addForm.newsTitle,
				newsUrl:this.addForm.newsUrl,
				newsPictureUrl:this.addForm.newsPictureUrl,
				isLock:this.addForm.isLock
			}).then((res) => {
				this.getProfile()
				console.log(res.data)
				if (res.data.flag){
					this.addForm.newsTitle = '';
					this.addForm.newsPictureUrl = '';
					this.addForm.newsId = '';
					this.addForm.newsUrl = '';
					this.addForm.isLock = '';
					this.dialogFormVisibleZH = false;
				} else {
					// this.sessionOut();
				}
			})
		},
		addFun(){
			this.orgNo =JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			console.log(this.orgNo)
			this.$axios.post('/news/addNews',{
				newsTitle:this.addForm2.newsTitle,
				newsPictureUrl:this.addForm2.newsPictureUrl,
				newsUrl:this.addForm2.newsUrl,
				isLock:this.addForm2.isLock
			}).then((res) => {
				if (res.data.flag){
				console.log(res.data)
					this.addForm2={
						newsTitle:'',
						newsPictureUrl:'',
						newsUrl:'',
						isLock:''
					}
					this.getProfile()
					this.dialogFormVisible = false
				} else {
					// this.sessionOut();
				}
			})
		},
		isLockFun(val){
			if (val.isLock == '1'){
				return '已锁定'
			} else if (val.isLock == '2'){
				return '未锁定'
			} else {
			}
		},
		handleClick(row) {
			console.log(row)
			this.$axios.get('/news/checkCreate').then((res) => {
				if (res.data.data){
					var copyForm={
						newsTitle:row.newsTitle,
						isLock:row.isLock,
						newsPicture:row.newsPicture,
						newsPictureUrl:row.newsPictureUrl,
						newsId:row.newsId,
						newsUrl:row.newsUrl,
						newsType:row.newsType,
						orgName:row.orgName,
						orgNo:row.orgNo
					}
					this.$axios.post('/news/addNews',copyForm).then((res) => {
						console.log(res)
						if (res.data.flag){
							this.getProfile();
							//window.location.reload()
						} else {
							// this.sessionOut();
						}
					})
				} else {
					this.$alert('已达到最大创建数量，请删除后再进行创建。', '提示', {
					  confirmButtonText: '确定',
					});
				}
				
			})
		},
		handleClickZH(row){
			if (row.isLock== '1'){
				this.checkedWHZH=true;
			} else {
				this.checkedWHZH=false;
			}
			this.addFormWH.isLock = row.isLock;
      		this.dialogWHZH = true;
      		this.addFormWH={
				newsTitle:row.newsTitle,
				isLock:row.isLock,
				newsPicture:row.newsPicture,
				newsPictureUrl:row.newsPictureUrl,
				newsId:row.newsId,
				newsUrl:row.newsUrl,
				newsType:row.newsType,
				orgName:row.orgName
			  }
			  console.log(this.addFormWH)
			this.dialogProNameWH=row.newsType
			this.addFormWH.orgNo = JSON.parse(localStorage.getItem('userInfo')).empOrgNo;
		
    	},
		handleClickSecond(row){
			this.addFormWH.isLock = row.isLock;
			this.dialogWH = true;
			this.addFormWH2={
					newsTitle:row.newsTitle,
					isLock:row.isLock,
					newsPicture:row.newsPicture,
					newsPictureUrl:row.newsPictureUrl,
					newsId:row.newsId,
					newsUrl:row.newsUrl,
					newsType:row.newsType,
					orgName:row.orgName
				}
				this.dialogProNameWH=row.newsType
			this.addFormWH.orgNo = JSON.parse(localStorage.getItem('userInfo')).empOrgNo;

		},
		deleteFunZH(index,row){
			console.log(row.newsId)
			var that = this;
			this.$confirm('此操作经永久删除该内容，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type:'warning'}).then(() => {
					that.$axios.post('/news/deleteNews',{newsId:row.newsId}).then((res) => {
						console.log(res.data)
						if (res.data.flag){
							this.tableData.splice(index,1)
							that.getProfile();
							console.log(this.tableData)

						} else {
							that.sessionOut();
						}
					})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});          
				})
			},
			deleteFun(index,row){
				var that = this;
				this.$confirm('此操作经永久删除该内容，是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type:'warning'}).then(() => {
						that.$axios.post('/news/deleteNews',{newsId:row.newsId}).then((res) => {
						// console.log(res.data)
							if (res.data.flag){
								that.getProfile();
							} else {
								// that.sessionOut();
							}
						})
					}).catch(() => {
						that.$message({
							type: 'info',
							message: '已取消删除'
						});          
					})
			},
			sessionOut(){
				var that = this;
				this.$alert('登陆信息已失效，请重新登陆？', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						localStorage.setItem('token', '')
						localStorage.setItem('userInfo', '')
						localStorage.setItem('userImg', '')
						localStorage.setItem('userName', '')
						// 重设路由
						that.$router.push({path:  '/login'})
					}
				});
			}
		}
}
</script>




<style scoped>
.headOffice {
	padding-bottom: 10px;
}
 .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
</style>