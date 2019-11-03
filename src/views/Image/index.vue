<template>
  <div class="container-image" v-loading="loading">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <my-bread>素材管理</my-bread>
        </el-breadcrumb>
      </div>
      <div class="btn_box">
        <!-- 按钮左 -->
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 按钮右 -->
        <el-button style="float:right" size="small" type="success" @click="openDialog()">添加素材</el-button>
        <!-- 列表素材 -->
        <div class="img_list">
          <div class="img_item" v-for="item in images" :key="item.id">
            <img :src="item.url" />
            <div class="footel" v-if="!reqParams.collect">
              <span
                class="el-icon-star-off"
                @click="toggleStatus(item)"
                :class="{red:item.is_collected}"
              ></span>
              <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          style=" text-align: center"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          @current-change="pager"
        ></el-pagination>
        <!-- 添加框 -->
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 加载数据
      loading: false,
      // 列表素材
      images: [],
      // 总条数
      total: 0,
      // 添加框显示
      dialogVisible: false,
      // 长传成功后的图片地址
      imageUrl: null,
      headers: {
        Authorization:
        `Bearer ${local.getUser().token}`

      }
    }
  },
  created () { // 获取素材列表信息
    this.getImages()
  },
  methods: {
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 数据请求成功
      this.images = data.results
      // 赋值总条数
      this.total = data.total_count

      this.loading = false
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 添加收藏与取消收藏
    async toggleStatus (item) {
      // 修改请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后 修改样式
      item.is_collected = data.collect
      // 提示
      this.$message.success(
        (data.collect ? '添加成功' : '取消添加') + ' 成功 '
      )
    },
    // 删除素材
    deleteImage (id) {
      this.$confirm('此操作永远删除该图片，是否继续', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了成功
          await this.$http.delete(`user/images/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          // 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击了取消
        })
    },
    // 添加图片
    //  打开对话框
    openDialog () {
      this.dialogVisible = true
      // 其他业务  清空预览图
      this.imageUrl = null
    },
    // 上传图片成功
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台给的地址 给imageUrl赋值
      // res.data.url 才是地址 res叫响应主题  显示图片
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 209px;
    height: 180px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footel {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        font-size: 17px;
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
