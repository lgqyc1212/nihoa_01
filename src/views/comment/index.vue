<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <my-bread>评论管理</my-bread>
        </el-breadcrumb>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="180"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column width="120" label="操作">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini" >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else size="mini" type="danger">关闭评论</el-button>
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
export default {
  data () {
    return {
      comments: [],
      // 参数
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取评论信息
    this.getComment()
  },
  methods: {
    // 改变文章评论状态
    toggleStatus (row) {
      const text1 = '你已经打开人家咯'
      const text2 = '你干什么，关人家'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          this.$message.success('修改文章评论状态成功')
          // 修改数据驱动视图更新
          row.comment_status = data.allow_comment
        })
        .catch(() => {})
    },
    //   分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComment()
    },
    async getComment () {
      const {
        data: { data }
      } = await this.$http.get('articles', {
        params: this.reqParams
      })
      this.comments = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scope lang="less">
</style>
