<template>
    <div>
		<div v-if = "empOrgNo == '00001'">
			<div style = "margin-bottom: 20px;">
				 <el-button @click="addProductFunZH" type="primary" size="small">新增</el-button>
			</div>
			<div class = "classification" style= "display:flex; align-items: center; margin-bottom: 20px;">
				<div style= "margin-right:12px;font-size:14px">产品分类</div>
				 <el-radio-group v-model="tabPosition" @change = "productTypeFun" >
					<el-radio-button  :label = "item.proTypeId" v-for = "item in productType"  >{{item.proTypeName}}</el-radio-button>
				  </el-radio-group>
			</div>
			<div class = "tableInfo">
				<div class = "headOffice" >
					<p style= "font-size:20px;"> 总行产品</p>
					<el-table
					  :data="tableData"
					  border>
					  <el-table-column
						type="index"
						align = 'center'
						label="产品ID"
						width="70">
					  </el-table-column>
					  <el-table-column
						prop="proName"
						align = 'center'
						label="产品名称"
						min-width="120">
					  </el-table-column>
					  <el-table-column
						prop="proOrgName"
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
						prop="proUpDate"
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
						  <el-button type="text" size="small" @click  = "deleteFunZH(scope.row)">删除</el-button>
						</template>
					  </el-table-column>
					</el-table>
				</div>
			</div>
			<el-dialog title="新增产品" :visible.sync="dialogFormVisibleZH">
			  <el-form :model="addForm">
				<el-form-item label="产品类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>{{dialogProName}}</span>
				</el-form-item>
				<el-form-item label="产品名称:" :label-width="formLabelWidth">
				  <el-input v-model="addForm.proName" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品描述1:" :label-width="formLabelWidth" v-if="addForm.proTypeId !== '04'">
				  <el-input v-model="addForm.proDesc1" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品描述2:" :label-width="formLabelWidth" v-if="addForm.proTypeId == '04'||addForm.proTypeId == '05'||addForm.proTypeId == '06'">
				  <el-input v-model="addForm.proDesc2" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品标签:" :label-width="formLabelWidth" v-if="addForm.proTypeId !== '06'">
				  <el-input v-model="addForm.proLabel" autocomplete="off" placeholder="两个标签之间请用“/”分开"></el-input>
				</el-form-item>
				<el-form-item label="产品链接:" :label-width="formLabelWidth">
				  <el-input v-model="addForm.proUrl" autocomplete="off" placeholder="请输入有效链接"></el-input>
				</el-form-item>
				<el-form-item label="产品锁定:" :label-width="formLabelWidth">
					  <el-checkbox v-model="checked">锁定</el-checkbox>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelFun">取 消</el-button>
				<el-button type="primary" @click="addFunZH">确 定</el-button>
			  </div>
			</el-dialog>
			
			<!-- 维护弹框   开始-->
			<el-dialog title="维护产品" :visible.sync="dialogWHZH">
			  <el-form :model="addFormWH">
				<el-form-item label="产品类型:" :label-width="formLabelWidth">
				  <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
				  <span>{{addFormWH.proType}}</span>
				</el-form-item>
				<el-form-item label="产品名称:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.proName" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品描述1:" :label-width="formLabelWidth" v-if="addFormWH.proTypeId !== '04'">
				  <el-input v-model="addFormWH.proDesc1" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品描述2:" :label-width="formLabelWidth" v-if="addFormWH.proTypeId == '04'||addFormWH.proTypeId == '05'||addFormWH.proTypeId == '06'">
				  <el-input v-model="addFormWH.proDesc2" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
				</el-form-item>
				<el-form-item label="产品标签:" :label-width="formLabelWidth" v-if="addFormWH.proTypeId !== '06'">
				  <el-input v-model="addFormWH.proLabel" autocomplete="off" placeholder="两个标签之间请用“/”分开"></el-input>
				</el-form-item>
				<el-form-item label="产品链接:" :label-width="formLabelWidth">
				  <el-input v-model="addFormWH.proUrl" autocomplete="off" placeholder="请输入有效链接"></el-input>
				</el-form-item>
				<el-form-item label="产品锁定:" :label-width="formLabelWidth">
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
	<div v-if = "empOrgNo != '00001'">
		<div style = "margin-bottom: 20px;">
			 <el-button @click="addProductFun" type="primary" size="small">新增</el-button>
		</div>
		<div class = "classification" style= "display:flex; align-items: center; margin-bottom: 20px;">
			<div style= "margin-right:12px;font-size:14px">产品分类</div>
			 <el-radio-group v-model="tabPosition" @change = "productTypeFun" >
			    <el-radio-button  :label = "item.proTypeId" v-for = "item in productType"  >{{item.proTypeName}}</el-radio-button>
			  </el-radio-group>
		</div>
		<div class = "tableInfo">
			<div class = "headOffice" >
				<p style= "font-size:20px;">总行产品</p>
				<el-table
				  :data="tableData"
				  border>
				  <el-table-column
				    type="index"
					align = 'center'
				    label="产品ID"
				    width="80">
				  </el-table-column>
				  <el-table-column
				    prop="proName"
					align = 'center'
				    label="产品名称"
				    min-width="120">
				  </el-table-column>
				  <el-table-column
				    prop="proOrgName"
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
				    prop="proUpDate"
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
			  	<p style= "font-size:20px;">分行产品</p>
			  	<el-table
			  	  :data="tableDataSecond"
			  	  border>
			  	  <el-table-column
			  	   type="index"
				   align = 'center'
			  	    label="产品ID"
			  	    width="80">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="proName"
			  	    label="产品名称"
			  	    min-width="120">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="proOrgName"
			  	    label="维护人"
			  	    min-width="80">
			  	  </el-table-column>
			  	  <el-table-column
				  align = 'center'
			  	    prop="proUpDate"
			  	    label="维护更新时间"
			  	    min-width="280">
			  	  </el-table-column>
			  	  <el-table-column
			  	    label="操作"
					align = 'center'
			  	    min-width="50">
			  	    <template slot-scope="scope">
			  	      <el-button @click="handleClickSecond(scope.row)" type="text" size="small">维护</el-button>
					  <el-button type="text" size="small" @click  = "deleteFun(scope.row)">删除</el-button>
			  	    </template>
			  	  </el-table-column>
			  	</el-table>
			  </div>
		</div>
		<el-dialog title="新增产品" :visible.sync="dialogFormVisible">
		  <el-form :model="addForm">
		    <el-form-item label="产品类型:" :label-width="formLabelWidth">
		      <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
			  <span>{{dialogProName}}</span>
		    </el-form-item>
			<el-form-item label="产品名称:" :label-width="formLabelWidth">
			  <el-input v-model="addForm.proName" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品描述1:" :label-width="formLabelWidth" v-if="addForm.proTypeId !== '04'">
			  <el-input v-model="addForm.proDesc1" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品描述2:" :label-width="formLabelWidth" v-if="addForm.proTypeId == '04'||addForm.proTypeId == '05'||addForm.proTypeId == '06'">
			  <el-input v-model="addForm.proDesc2" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品标签:" :label-width="formLabelWidth" v-if="addForm.proTypeId !== '06'">
			  <el-input v-model="addForm.proLabel" autocomplete="off" placeholder="两个标签之间请用“/”分开"></el-input>
			</el-form-item>
			<el-form-item label="产品链接:" :label-width="formLabelWidth">
			  <el-input v-model="addForm.proUrl" autocomplete="off" placeholder="请输入有效链接"></el-input>
			</el-form-item>
			<!-- <el-form-item label="产品锁定:" :label-width="formLabelWidth">
				<el-radio v-model="addForm.isLock" label="1">锁定</el-radio>
				<el-radio v-model="addForm.isLock" label="2">未锁定</el-radio>
			</el-form-item> -->
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancelFun">取 消</el-button>
		    <el-button type="primary" @click="addFun">确 定</el-button>
		  </div>
		</el-dialog>
		
		<!-- 维护弹框   开始-->
		<el-dialog title="维护产品" :visible.sync="dialogWH">
		  <el-form :model="addFormWH2">
		    <el-form-item label="产品类型:" :label-width="formLabelWidth">
		      <!-- <el-input v-model="addForm.proTypeID" autocomplete="off"></el-input> -->
			  <span>{{addFormWH2.proType}}</span>
		    </el-form-item>
			<el-form-item label="产品名称:" :label-width="formLabelWidth">
			  <el-input v-model="addFormWH2.proName" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品描述1:" :label-width="formLabelWidth" v-if="addFormWH2.proTypeId !== '04'">
			  <el-input v-model="addFormWH2.proDesc1" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品描述2:" :label-width="formLabelWidth" v-if="addFormWH2.proTypeId == '04'||addFormWH2.proTypeId == '05'||addFormWH2.proTypeId == '06'">
			  <el-input v-model="addFormWH2.proDesc2" autocomplete="off" placeholder="请输入适量文字，超过部分将无法显示"></el-input>
			</el-form-item>
			<el-form-item label="产品标签:" :label-width="formLabelWidth" v-if="addFormWH2.proTypeId !== '06'">
			  <el-input v-model="addFormWH2.proLabel" autocomplete="off" placeholder="两个标签之间请用“/”分开"></el-input>
			</el-form-item>
			<el-form-item label="产品链接:" :label-width="formLabelWidth">
			  <el-input v-model="addFormWH2.proUrl" autocomplete="off" placeholder="请输入有效链接"></el-input>
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
    name: 'home',
	data() {
		return {
			checkedWHZH:true,
			checked:false,
			dialogFormVisibleZH:false,
			dialogWHZH:false,
			// 总行机构号
			empOrgNo:'',
			addForm:{
				proName:'',
				proTypeId:'',
				proOrgNo:'',
				proDesc1:'',
				proDesc2:'',
				proUrl:'',
				isLock:'1',
				proLabel:''
			},
			addFormWH:{
				proName:'',
				proTypeId:'',
				proOrgNo:'',
				proDesc1:'',
				proDesc2:'',
				proUrl:'',
				isLock:'1',
				proNo:'',
				proLabel:''
			},
			addFormWH2:{
				proName:'',
				proTypeId:'',
				proOrgNo:'',
				proDesc1:'',
				proDesc2:'',
				proUrl:'',
				isLock:'1',
				proNo:'',
				proLabel:''
			},
			dialogProName:'',
			formLabelWidth: '120px',
			dialogFormVisible:false,
			dialogWH:false,
			dialogProNameWH:'',
			productType:null,
			tableData:[],
			tableDataSecond:[],
			tabPosition: '',
			formInline: {
			  'proName':'',
			  'proOrgNo': '',
			  'proNo':'',
			  'empOrgNo':'',
			  'proTypeId':'',
			  'orgLevel':'00', // 总行
			  'isLock':'',
			  'proLabel':''
			},
			formInlineSecond:{
				'proName':'',
				'proOrgNo': '',
				'proNo':'',
				'empOrgNo':'',
				'proTypeId':'',
				'proOrgNo':'',
				'orgLevel':'11', // 分行
				'isLock':'',
				'proLabel':''
			}
		}
	},
	created(){
		this.empOrgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
		this.$axios.post('/productType/getProductType').then((res) => {
			console.log(res.data)
			if (res.data.flag){
				this.productType = res.data.data;
				this.tabPosition = this.productType[0].proTypeId
				this.formInline.proTypeId = this.productType[0].proTypeId;
				this.formInlineSecond.proTypeId = this.productType[0].proTypeId;
				
				if(this.empOrgNo== '00001'){
					this.tableZHFun();
				} else {
					this.tableZHFun();
					this.tableFHFun();
				}
				
			} else {
				this.sessionOut();
			}	
		})
		
	},
	methods: {
		tableZHFun(){
			this.$axios.post('/product/getProductInfo',this.formInline).then((res) => {
				console.log(res.data)
				if (res.data.flag){
					this.tableData = res.data.data
				} else {
					this.sessionOut();
				}
			})
		},
		tableFHFun(){
			this.formInlineSecond.proOrgNo = JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo;
			this.$axios.post('/product/getProductInfo',this.formInlineSecond).then((res) => {
				if (res.data.flag){
					this.tableDataSecond = res.data.data
				} else {
					this.sessionOut();
				}
			})
		},
		addProductFunZH(){
			this.$axios.post('/product/getProductQty',{
				proTypeId:this.tabPosition,
				proOrgNo:JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			}).then((res) => {
				if (res.data.flag){
					this.addForm.proTypeId = this.tabPosition;
					for(var i in this.productType) {
						if (this.productType[i].proTypeId == this.addForm.proTypeId){
							this.dialogProName = this.productType[i].proTypeName
						}    
					}
					this.dialogFormVisibleZH = true
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
			this.$axios.post('/product/updataProduct',this.addFormWH).then((res) => {
				console.log(res.data)
				if (res.data.flag){
					this.tableZHFun();
					this.dialogWHZH = false
				} else {
					this.sessionOut();
				}
			})
		},
		submitFun(){
			this.$axios.post('/product/updataProduct',this.addFormWH2).then((res) => {
				if (res.data.flag){
					this.tableFHFun();
					this.dialogWH = false;
				} else {
					this.sessionOut();
				}
			})
		},
		addProductFun(){
			this.$axios.post('/product/getProductQty',{
				proTypeId:this.tabPosition,
				proOrgNo:JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			}).then((res) => {
				if (res.data.flag){
					this.addForm.proTypeId = this.tabPosition;
					for(var i in this.productType) {
						if (this.productType[i].proTypeId == this.addForm.proTypeId){
							this.dialogProName = this.productType[i].proTypeName
						}    
					}
					this.dialogFormVisible = true;
				} else {
					this.$alert('已达到最大创建数量，请删除后再进行创建。', '提示', {
					  confirmButtonText: '确定',
					});
				}
				
			})
			
		},
		cancelFun(){
			this.addForm.proName = '';
			this.addForm.proOrgNo = '';
			this.addForm.proDesc1 = '';
			this.addForm.proDesc2 = '';
			this.addForm.proUrl = '';
			this.addForm.isLock = '';
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
			this.addForm.proOrgNo =JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			this.$axios.post('/product/insertProduct',this.addForm).then((res) => {
				if (res.data.flag){
					this.addForm.proName = '';
					this.addForm.proOrgNo = '';
					this.addForm.proDesc1 = '';
					this.addForm.proDesc2 = '';
					this.addForm.proUrl = '';
					this.addForm.isLock = '';
					this.tableZHFun()
					this.dialogFormVisibleZH = false;
				} else {
					this.sessionOut();
				}
			})
		},
		addFun(){
			// this.addForm.proName = '';
			// this.addForm.proOrgNo = '';
			// this.addForm.proDesc1 = '';
			// this.addForm.proDesc2 = '';
			// this.addForm.proUrl = '';
			// this.addForm.isLock = '';
			this.addForm.proOrgNo =JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			this.$axios.post('/product/insertProduct',this.addForm).then((res) => {
				if (res.data.flag){
					this.addForm.proName = '';
					this.addForm.proOrgNo = '';
					this.addForm.proDesc1 = '';
					this.addForm.proDesc2 = '';
					this.addForm.proUrl = '';
					this.addForm.isLock = '';
					this.tableZHFun()
					this.tableFHFun()
					this.dialogFormVisible = false;
				} else {
					this.sessionOut();
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
			this.$axios.post('/product/getProductQty',{
				proTypeId:this.tabPosition,
				proOrgNo:JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo
			}).then((res) => {
				if (res.data.flag){
					var copyProduct = {
						proName:'',
						proTypeId:'',
						proOrgNo:JSON.parse(localStorage.getItem('userInfo')).data.empOrgNo,
						proDesc1:'',
						proDesc2:'',
						proUrl:'',
						isLock:''
					}
					copyProduct.proName = row.proName;
					copyProduct.proTypeId = row.proTypeId;
					copyProduct.proDesc1 = row.proDesc1;
					copyProduct.proDesc2 = row.proDesc2;
					copyProduct.proUrl = row.proUrl;
					copyProduct.isLock = row.isLock;
					this.$axios.post('/product/insertProduct',copyProduct).then((res) => {
						if (res.data.flag){
							//window.location.reload()
							this.tableFHFun()
						} else {
							this.sessionOut();
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

			console.log(row)
			if (row.isLock== '1'){
				this.checkedWHZH=true;
			} else {
				this.checkedWHZH=false;
			}
			this.dialogWHZH = true;
			this.addFormWH={
				proName:row.proName,
				proTypeId:row.proTypeId,
				proType:row.proType,
				proOrgNo:row.proOrgNo,
				proDesc1:row.proDesc1,
				proDesc2:row.proDesc2,
				proUrl:row.proUrl,
				isLock:row.isLock,
				proNo:row.proNo,
				proLabel:row.proLabel
			}
			this.addFormWH.proOrgNo = JSON.parse(localStorage.getItem('userInfo')).empOrgNo;
		
		},
		handleClickSecond(row){
			this.dialogWH = true;
			this.addFormWH2={
				proName:row.proName,
				proTypeId:row.proTypeId,
				proType:row.proType,
				proOrgNo:row.proOrgNo,
				proDesc1:row.proDesc1,
				proDesc2:row.proDesc2,
				proUrl:row.proUrl,
				isLock:row.isLock,
				proNo:row.proNo,
				proLabel:row.proLabel
			}
			this.addFormWH.proOrgNo = JSON.parse(localStorage.getItem('userInfo')).empOrgNo;

		},
		productTypeFun(tab){
			this.formInline.proTypeId = tab;
			this.formInlineSecond.proTypeId = tab;
			this.$axios.post('/product/getProductInfo',this.formInline).then((res) => {
				if (res.data.flag){
					this.tableData = res.data.data
				} else {
					this.sessionOut();
				}
			})
			this.$axios.post('/product/getProductInfo',this.formInlineSecond).then((res) => {
				
				if (res.data.flag){
					this.tableDataSecond = res.data.data
				} else {
					this.sessionOut();
				}
				
			})
		},
		deleteFunZH(row){
			console.log(row)
			var that = this;
			this.$confirm('此操作经永久删除该内容，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type:'warning'}).then(() => {
					that.$axios.post('/product/deleteProduct?proNo='+row.proNo).then((res) => {
						if (res.data.flag){
								that.tableZHFun();

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
		deleteFun(row){
			var that = this;
			this.$confirm('此操作经永久删除该内容，是否继续', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type:'warning'}).then(() => {
					that.$axios.post('/product/deleteProduct?proNo='+row.proNo).then((res) => {
						if (res.data.flag){
							that.tableZHFun();
							that.tableFHFun();
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
		},
		onSubmit() {
			this.$axios.post('/product/getProductInfo',this.formInline).then((res) => {
				if (res.data.flag){
					this.tableData = res.data.data
				} else {
					that.sessionOut();
				}
			})
			this.$axios.post('/product/getProductInfo',this.formInlineSecond).then((res) => {			
				if (res.data.flag){
					this.tableDataSecond = res.data.data
				} else {
					that.sessionOut();
				}
				
			})
		}
	}
}
</script>




<style scoped>
.headOffice {
	padding-bottom: 10px;
}
</style>