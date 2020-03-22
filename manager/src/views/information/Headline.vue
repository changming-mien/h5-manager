<template>
  <div v-if = "empOrgNo == '00001'">
			<div class = "tableInfo">
				<div class = "headOffice" >
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
						align = 'center'
						:formatter="isLockFun"
						label="是否锁定"
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
						</template>
					  </el-table-column>
					</el-table>
				</div>
			</div>
			
			<!-- 维护弹框   开始-->
			<el-dialog title="编辑" :visible.sync="dialogWHZH">
			  <el-form :model="addFormWH">
				<el-form-item label="资讯类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>{{nameType}}</span>
				</el-form-item>
				<el-form-item label="资讯标题:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.newsTitle" autocomplete="off" placeholder="请保持十个字以内，超出部分将无法在小程序中显示"></el-input>
				</el-form-item>
				<el-form-item label="资讯链接:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.newsUrl" autocomplete="off" placeholder="请输入该产品在中国银行手机银行中的详情页链接"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelFun">取 消</el-button>
				<el-button type="primary" @click="submitFunZH">确 定</el-button>
			  </div>
			</el-dialog>
			<!-- 维护弹框  结束-->
		</div>
</template>

<script>
export default {
	name:'headline',
  components: {},
  props: {},
  data() {
	return {
		checkedWHZH:true,
			checked:false,
			dialogFormVisibleZH:false,
			dialogWHZH:false,
			newsType:'',
			// 总行机构号
			empOrgNo:'',
			addFormWH:{
				newsTitle:'',
				newsUrl:'',
				isLock:'',
				newsType:'',
				newsId:'',
				newsPicture:''
			},
			dialogProName:'',
			formLabelWidth: '120px',
			dialogFormVisible:false,
			dialogWH:false,
			dialogProNameWH:'',
			productType:null,
			tableData:[],
			formInline: {
			  'proName':'',
			  'proOrgNo': '',
			  'proNo':'',
			  'empOrgNo':'',
			  'proTypeId':'',
			  'orgLevel':'00', // 总行
			  'isLock':''
			}
	};
  },
  watch: {},
  computed: {
	  nameType(){
		  if(this.dialogProNameWH=="01"){
			  return "中银头条"
		  }else{
			  return "最新资讯"
		  }
	  }
  },
  methods: {
	  getProfile(){
		this.$axios.get('/news/getNewsList').then((res) => {
			console.log(res.data.data.data)
			if (res.data.flag){
				const arr=[]
				res.data.data.data.forEach(item=>{
					// this.empOrgNo=item.orgNo
					if(item.orgNo =="00001"&&item.newsType =="01"){
						arr.push(item)
					}
				})
				this.tableData=arr
			} else {
				this.sessionOut();
			}	
		})
	  },
	  handleClickZH(row){
		  console.log(row)
		  this.dialogWHZH=true
		  this.addFormWH={
				newsTitle:row.newsTitle,
				newsUrl:row.newsUrl,
				// isLock:row.isLock,
				newsId:row.newsId,
				newsType:row.newsType,
				orgName:row.orgName
				// newsPicture:row.newsPicture
			}
		this.dialogProNameWH=row.newsType
	  },
	  submitFunZH(){
		  console.log(this.addFormWH)
		  this.$axios.post('/news/updateNews',this.addFormWH).then(res=>{
			this.dialogWHZH=false
			this.getProfile()
			// console.log(res.data)
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
	  cancelFun(){
		  this.dialogWHZH=false
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

  },
  created(){
		this.empOrgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
		this.getProfile()
		console.log(this.empOrgNo)
	},
  mounted() {}
};
</script>
<style scoped>
.wrapper{}
</style>