<template>
   <div class='container-page'>
    <!-- 头 -->
    <p>header</p>
    <!-- 内容 -->
    <div>
      <!-- 留一个坑 -->
      <!-- 默认插槽：当你只有一处内容需要插入 -->
      <!-- 备用内容：当你不插入内容的时候，默认显示一些结构。 -->
      <slot name="content" :lgq="pageName" test="测试">备用内容</slot>
    </div>
    <!-- 底 -->
    <p>
      <!-- 留一个坑 -->
      <slot name="footer">footer</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'// 组件于组件的数据是独立的
    }
  }
}
</script>

<style>

</style>
