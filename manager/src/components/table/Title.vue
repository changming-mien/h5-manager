<template>
  <div class="title">
      <span>{{title}}</span>
      <!-- <el-button type="primary" v-show="newTable.isShow" size="small">{{newTable.name}}</el-button> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
      title:String,
      newTable:Object
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.title{
  height: 66px;
  line-height: 66px;
}
.title span{
  font-size: 18px;
  margin-right: 10px;
  margin-left: 8px;
}

</style>