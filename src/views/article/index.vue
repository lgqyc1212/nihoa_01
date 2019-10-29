<template>
  <div>
    <!-- 筛选条件布局 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <!-- <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
          <my-bread>内容管理</my-bread>

        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <page-one>
      <div slot="content">
      </div>
      <div slot="footer">底部</div>
    </page-one>
    <page-one>
        <!-- scope作用域的意思 -->
      <!-- <div slot="content"  slot-scope="scope">内容 {{scope.lgq}} </div> -->
       <template v-slot:content="scope">内容 {{scope.lgq}}</template>
      <div slot="footer">底部</div>
    </page-one>
  </div>
</template>

<script>
import PageOne from '@/test/page'
export default {
  components: { PageOne }, // 一个组件在另一个组件里调用
  data () {
    return {
      // 筛选参数
      // 使用axios提交数据时候  如果数据的值为null是不会提交改字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道选项数据
      channelOptions: [
        { value: 1, label: 'java' },
        { value: 2, label: '前端' }
      ],
      // 日历数组
      dateArr: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
