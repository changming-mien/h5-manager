<template>
    <div class="">
    		<el-upload
		  class="upload-demo"
		  :action="uploadImgCommon"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :file-list="fileList2"
		  list-type="picture"
		  :on-success="success"
		  >
		  
		  <!--:before-upload="success2"
		  :on-change="onchange"-->
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">&nbsp;&nbsp;
		  	只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
    </div>
</template>
<script>
	import {http} from './http'
	const {
		uploadImgCommon
	} = http;
export default {
    name: '',
    data () {
        return {
        		uploadImgCommon,
        		fileList2:[],
        }
    },
    props:["imgurl"],
    components: {
    },
    created() {},
    mounted() {
    		this.fileList2=this.imgurl?[{name:'',url:this.imgurl}]:[]
    },
    methods: {
    		handleRemove(file, fileList) {
	        console.log(file, fileList);
	    },
	    handlePreview(file) {
	        console.log(file);
	    },
	    success(file, fileList){
	    		if(file.code=="0000"){
	    			this.fileList2=[];
//		    		console.log(77777,file, fileList)
		    		this.fileList2=[{url:file.data,name:''}]
		    		this.$emit('emitimg',file.data)
		    		this.$message({
		          message: '上传成功！',
		          type: 'success'
		        });
	    		}else{
	    			this.$message({
		          message: '上传失败！',
		          type: 'warning'
		        });
	    		}
	    		
	    },
//	    success2(file, fileList){
//	    		console.log(888888,file, fileList)
//	    },
//	    onchange(a,b){
//	    	console.log(999999,a,b)
//	    }
    },
    filters: {}
}
</script>
<style scoped>

</style>