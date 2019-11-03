<template>
<el-card>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <my-bread>个人设置</my-bread>
      </el-breadcrumb>
    </div>
    <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号："> {{userForm.id}}</el-form-item>
            <el-form-item label="手机："> {{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
                  <el-input v-model="userForm.name" autofocus="autofocus"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="userForm.intro">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >保存设置</el-button>
            </el-form-item>
          </el-form>
    </el-col>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        id: null,
        mobile: null,
        name: null,
        email: null,
        intro: null

      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>
