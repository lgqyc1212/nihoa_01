<template>
  <el-card>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <my-bread>粉丝管理</my-bread>
      </el-breadcrumb>
    </div>

    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="粉丝列表" name="first">
        粉丝列表
        <el-pagination
          style="text-align: center;margin-top:20px"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
          @current-change="pager"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="second">粉丝画像</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'photo',
      fans: [],
      reqParams: {
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  // created () {
  //   // 粉丝列表数据
  //   this.getFans()
  // },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    }
    // async getFans () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('followers', { params: this.reqParams })
    //   this.fans = data.results
    //   this.total = data.total_count
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
