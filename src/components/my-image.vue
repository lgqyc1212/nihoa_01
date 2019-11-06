<template>
  <div class="my-image">
    <!-- 上传按钮 -->
    <div class="but_box" @click="open">
      <img :src="value || confirmSrc" alt srcset />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div
              class="img_item"
              @click="selectedImage(item.url)"
              :class="{selected: selectedImageUrl === item.url}"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
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
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import dafaultImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      // 对话框的隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image',
      //   请求素材参数
      // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 6
      },
      // 素材列表  父组件
      images: [],
      //   总条数
      total: 0,
      // 设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 选中的图片地址
      selectedImageUrl: null,
      // 上传的图片地址
      uploadImageUrl: null,
      // 图片按钮
      confirmSrc: dafaultImage
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
      // 显示页面
      this.getImages()
      // 清空视图
      this.uploadImageUrl = null
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
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值总条数
      this.total = data.total_count
    },
    // 点击图片
    selectedImage (url) {
      // 记录点击的图片地址
      // 思路 :class={selected:条件}
      // 条件 记录上去点击图片的唯一标识 然后 去比对每次遍历的图片的唯一标识
      // 如果一致  选中  不一致  不选中
      // 此时图片地址做为唯一标识  将来提交的数据是地址不是ID
      this.selectedImageUrl = url
    },
    // 上传成功
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 点击确定
    confirmImage () {
      let src = null
      // 判断是通过什么传入的
      if (this.activeName === 'image') {
        // 使用selectedImageUrl 判断是否传入值
        if (!this.selectedImageUrl) return this.$message.info('请选择一个图片')
        // 提交组件
        this.$emit('input', this.selectedImageUrl)
        src = this.selectedImageUrl
      } else {
        // 使用uploadImageUrl 判断
        if (!this.uploadImageUrl) return this.$message.info('请上传一张图片')
        // 提交组件
        this.$emit('input', this.uploadImageUrl)
        src = this.uploadImageUrl
      }
      //   给图片按钮的src属性赋值
      this.confirmSrc = src
      //   清空视图
      this.dialogVisible = false
    }

  }
}
</script>

<style scoped lang="less" >
.my-image {
  display: inline-block;
  margin-right: 20px;
  margin-top: 5px;
}
.but_box {
  height: 150px;
  width: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
//对话框
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
//图片 全部和管理的样式
.img_item {
  width: 184px;
  height: 162px;
  position: relative;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  &.selected::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
      50px 50px;
  }
}
</style>
