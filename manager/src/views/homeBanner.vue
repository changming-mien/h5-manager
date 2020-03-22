<template>
	<div class="homeBanner">
		<h2>基本信息</h2>
		<div class="homeBannerForm">
			<i-form label-position="right" :label-width="100">
				<Form-item label="网站标题">
					<i-input v-model="input1" :disabled='Flag1'></i-input>
					<p @click="Flag1 = !Flag1">编辑</p>
				</Form-item>
				<Form-item label="业务范围">
					<i-input v-model="input2" :disabled='Flag2'></i-input>
					<p @click="Flag2 = !Flag2">编辑</p>
				</Form-item>
				<Form-item label="业务图标">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					<el-upload 
						class="upload-demo buttonImg"
						ref="upload" 
					    :before-remove="beforeRemove"
						:limit="1"
						action="http://119.23.241.77:8700/api/admin/upload" 
						:on-success="handleAvatarSuccess"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">浏览</el-button>
						<el-button   style="margin-left: 10px;" size="small" type="success" @click = "submitUpload">上传</el-button>
					</el-upload>
				</Form-item>
				<Form-item label="业务描述"> 
					<i-input v-model="input3" :disabled='Flag3'></i-input>
					<p @click="Flag3 = !Flag3">编辑</p>
				</Form-item>
				<Form-item label="客户标语">
					<i-input v-model="input4" :disabled='Flag4'></i-input>
					<p @click="Flag4 = !Flag4">编辑</p>
				</Form-item>
				<Form-item label="地址与联络">
					<i-input v-model="input5" :disabled='Flag5' type = "textarea"></i-input>
					<p @click="Flag5 = !Flag5">编辑</p>
				</Form-item>
				<Form-item label="业务图标">
					<img v-if="imageUrl2" :src="imageUrl2" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					<el-upload 
						class="upload-demo buttonImg"
						ref="upload2" 
					    :before-remove="beforeRemove2"
						:limit="1"
						action="http://119.23.241.77:8700/api/admin/upload" 
						:on-success="handleAvatarSuccess2"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">浏览</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click = "submitUpload2">上传</el-button>
					</el-upload>
				</Form-item>
				<Form-item label="备案号">
					<i-input v-model="input6" :disabled='Flag6'></i-input>
					<p @click="Flag6 = !Flag6">编辑</p>
				</Form-item>
				<Form-item label="Coppyright">
					<i-input v-model="input7" :disabled='Flag7'></i-input>
					<p @click="Flag7 = !Flag7">编辑</p>
				</Form-item>
				<Form-item label="keywords">
					<i-input v-model="input8" :disabled='Flag8'></i-input>
					<p @click="Flag8 = !Flag8">编辑</p>
				</Form-item>
				<Form-item label="description">
					<i-input v-model="input9" :disabled='Flag9'></i-input>
					<p @click="Flag9 = !Flag9">编辑</p>
				</Form-item>
				<Form-item>
					<i-button type="primary" class = "homeBtn" @click = "submitInfo">提交</i-button>
				</Form-item>
			</i-form>
		</div>
	</div>
</template>

<script>
	export default {
		created: function() {
			this.$axios.get('api/baseInfo').then((res) => {
				this.input1 = res.title;
				this.input2 = res.businessRange;
				this.input3 = res.businessDesc;
				this.input4 = res.customerSlogan;
				this.input5 = res.addressAndTel;
				this.input6 = res.icp;
				this.input7 = res.copyright;
				this.input8 = res.keywords;
				this.input9 = res.description;
				this.imageUrl = res.businessLogoURL;
				this.imageUrlSrc = res.businessLogoURL;
				this.imageUrl2 = res.bottomLogoURL;
				this.imageUrlSrc2 = res.bottomLogoURL;
			})
		},
		data() {
			return {
				homeBannerInfo:{
					"title":null,
					"businessRange":null,
					"businessLogoURL":null,
					"businessDesc":null,
					"customerSlogan":null,
					"addressAndTel":null,
					"bottomLogoURL":null,
					"icp":null,
					"copyright":null,
					"keywords":null,
					"description":null
				},
				imageUrlSrc:'',
				imageUrlSrc2:'',
				imageUrl:'',
				imageUrl2:'',
				input1: '',
				input2: '',
				input3: '',
				input4: '',
				input5: '',
				input6: '',
				input7: '',
				input8: '',
				input9: '',
				Flag1: true,
				Flag2: true,
				Flag3: true,
				Flag4: true,
				Flag5: true,
				Flag6: true,
				Flag7: true,
				Flag8: true,
				Flag9: true
			}
		},
		methods: {
			submitInfo(){
				this.homeBannerInfo.title = this.input1;
				this.homeBannerInfo.businessRange = this.input2;
				this.homeBannerInfo.businessDesc = this.input3;
				this.homeBannerInfo.customerSlogan = this.input4;
				this.homeBannerInfo.addressAndTel = this.input5;
				this.homeBannerInfo.icp = this.input6;
				this.homeBannerInfo.copyright = this.input7;
				this.homeBannerInfo.keywords = this.input8;
				this.homeBannerInfo.description = this.input9;
				// 图片地址
				this.homeBannerInfo.businessLogoURL = this.imageUrlSrc;
				this.homeBannerInfo.bottomLogoURL = this.imageUrlSrc2;
				this.$axios.post('api/admin/baseInfo', this.homeBannerInfo).then((res) => {
					console.log(res.id)
				})
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			submitUpload2() {
				this.$refs.upload2.submit();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.imageUrlSrc = file.response;
				console.log(this.imageUrl);
		    },
			handleAvatarSuccess2(res, file) {
				this.imageUrl2 = URL.createObjectURL(file.raw);
				this.imageUrlSrc2 =file.response ;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
					this.imageUrl = '';
				});
			},
			beforeRemove2(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
					this.imageUrl2 = '';
				});
			}
		}
	}
</script>
<style>
	.homeBanner h2 {
		color: #000000;
		padding-left: 20px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(204, 204, 204, 1);
	}

	.homeBannerForm {
		padding-top: 10px;
	}

	.homeBannerForm .ivu-form-item {
		padding-bottom: 10px;
		border-bottom: 1px solid rgba(204, 204, 204, .6);
	}

	.homeBannerForm .ivu-form-item-content {
		display: flex;
	}

	.homeBannerForm .ivu-form-item-content p {
		margin-left: 20px;
		margin-right: 20px;
		color: #FF6600;
		display: inline-block;
		width: 40px;
		cursor: pointer;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
    }
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 200px;
		height: 62.07px;
		border:1px dashed #ccc;
		margin-right: 40px;
		line-height: 62.07px;
		text-align: center;
	}
	.avatar {
		width: 200px;
		height: 62.07px;
		display: block;
		margin-right: 40px;
		border:1px dashed #ccc;
	}
	.buttonImg button {
		width:42px;
		height:25px;
		padding:0;
		background: #2A6151;
		border:0;
	}
	.buttonImg button:hover{
		background: #2A6151;
	}
	.homeBtn {
		background: #2A6151;
		border:0;
	}
</style>
