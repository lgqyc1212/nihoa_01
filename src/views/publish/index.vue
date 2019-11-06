<template>
  <div class="container-pubish">
    <el-card>
      <!-- 面包屑导航 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px" size="small">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <!-- editorOption配置对象 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images = []">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 图片一张 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]" ></my-image>
          </div>
          <!-- 图片三张 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 频道组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 修改 -->
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true) ">存入草稿</el-button>
        </el-form-item>
        <!-- 发表 -->
        <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true) ">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交给后台的文章数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        // 频道组件
        channel_id: null
      },
      // 富文本
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  // 当路由规格没有发生改变的时候 ，组件是不会重新初始化
  // 只有组件初始化的时候才会只会执行一次
  // 监听地址地址栏参数的改变，执行下面的代码
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  },
  created () {
    // 判断是否带id值 ，进行数据的拉取和重置
    this.toggleArticleStatus()
    // // 判断当前是否是编辑
    // const articleId = this.$route.query.id
    // if (articleId) {
    //   // 获取当前文章信息
    //   this.getArticle(articleId)
    // } else {
    //   // 重置数据不能为空对象  模版中 articleForm.cover.images
    //   this.articleForm = {
    //     title: null,
    //     content: null,
    //     cover: {
    //       type: 1,
    //       images: []
    //     },
    //     channel_id: null
    //   }
    // }
  },
  methods: {
    // 切换发布与修改
    toggleArticleStatus () {
      // 判断当前是否是编辑
      const articleId = this.$route.query.id
      if (articleId) {
      // 获取当前文章信息
        this.getArtcle(articleId)
      } else {
      // 重置数据不能为空对象  模版中 articleForm.cover.images
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    },
    async getArtcle (id) {
      const { data: { data } } = await this.$http.get(`articles/${id}`)
      this.articleForm = data
    },
    // 修改逻辑
    async update (draft) {
      // 发表 存入草稿
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 去内容管理
      this.$router.push('/article')
    },
    // 发布逻辑
    async create (draft) {
      // 发表 存入草稿
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿' : '发表成功')
      // 去内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
