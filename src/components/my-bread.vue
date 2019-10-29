<template>
  <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb>
         <slot></slot>
      </el-breadcrumb>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>

</style>
