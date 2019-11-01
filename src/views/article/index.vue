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
          <!-- 频道组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <!-- v-model 绑定的数组  【起始时间，结束时间】 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px"></el-image>
            <div slot="error">
              <!-- <img src="../../assets/error.gif" width="150" height="100"> -->
            </div>
          </template>
        </el-table-column>

        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="text-align: center;margin-top:20px"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import PageOne from '@/test/page'
export default {
  // components: { PageOne }, // 一个组件在另一个组件里调用
  data () {
    return {
      // 筛选参数
      // 使用axios提交数据时候  如果数据的值为null是不会提交改字段
      reqParams: {
        status: null,
        channel_id: 4,
        begin_pubdate: null,
        end_pubdate: null,
        // 当前页码 每一页显示条数
        page: 1,
        per_page: 10
      },
      // 频道选项数据
      channelOptions: [
        { value: 1, label: 'java' },
        { value: 2, label: '前端' }
      ],
      // 日历数组
      dateArr: [],
      // 文字列表
      articles: [],
      // 文章总条数
      total: 0
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文章列表数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值文章列表依赖数据
      this.articles = data.results
      // 赋值文章总条数依赖数据
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 选择日期触发的事件函数
    changeDate (dateArr) {
      // dateArr 的数据格式[date,date]
      // 前端需要的是字符串格式  dateArr的数据格式是[String,String]
      // 数据清理后的 dateArr的值 null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选查询
    search () {
      // 准备日期数据
      // 进行数据获取
      // 如果频道的值 '' 时候 修改为 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 回到第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除文章成功')
      // 更新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
