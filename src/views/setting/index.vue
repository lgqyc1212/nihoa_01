<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <my-bread>个人设置</my-bread>
        </el-breadcrumb>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadphoto"
            :show-file-list="false"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/local'
export default {
  data () {
    return {
      userForm: {
        id: null,
        mobile: null,
        name: null,
        email: null,
        intro: null,
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    created () {
    // 显示用户信息
      const user = local.getUser() || {}
      this.uploadImageUrl = user.photo
    },
    // 点击保存
    async saveInfo () {
      const { name, email, intro } = this.userForm
      await this.$http.patch('user/profile', { name, email, intro })
      // 提示
      this.$message.success('保存成功')
      // 该home组件，使用非父子传值
      eventBus.$emit('updateName', name)
      // 该本地存储
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 修改用户头像
    // ({ file }) 解构赋值
    async uploadphoto ({ file }) {
      // 阿里百秀 自己来上传图片，使用xhr配合formData进行图片上传
      // 现在     自己来上传图片，使用axios配合formData进行图片上传
      // 获取图片对象  data.file 获取
      // result.file 是你选着图片后的文件对象
      // 获取文件对象  文档没有记录
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 提示
      this.$message.success('修改头像成功')
      // 预览
      this.userForm.photo = data.photo
      // 更新home组件头像
      eventBus.$emit('updatePhoto', data.photo)
      // 更新本地储存的头像
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  p {
    text-align: center;
  }
}
</style>
