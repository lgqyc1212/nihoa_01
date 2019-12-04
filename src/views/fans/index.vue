<template>
  <el-card>
    <div slot="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <my-bread>粉丝管理</my-bread>
      </el-breadcrumb>
    </div>

    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="粉丝列表" name="first">
        <!-- // 列表 -->
        <div class="fans_list">
          <div class="fans_item" v-for="item in fansFirst" :key="item.id.toString()">
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p>{{item.name}}</p>
            <el-button type="promary" size="small" plain>+关注</el-button>
          </div>
        </div>
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
      <el-tab-pane label="粉丝画像" name="second">
        <div ref="dom" style="width: 100%;height:400px;"></div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import echarts from 'echarts'
import defanltImage from '../../assets/avatar.jpg'
export default {
  data () {
    return {
      defanltImage,
      activeName: 'second',
      fansFirst: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0
    }
  },
  created () {
    // 粉丝列表数据
    this.getFansFirst()
  },
  methods: {
    async getFansFirst () {
      const {
        data: { data }
      } = await this.$http.get('/followers', { params: this.reqParams })
      this.fansFirst = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansFirst()
    }
  },
  // echarts
  mounted () {
    // 注意：获取dom需要在dom渲染完毕后
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    // 配置及数据
    const option = {
      backgroundColor: '#2c343c',
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ],
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myEcharts.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.fans_list {
  .fans_item {
    width: 150px;
    height: 190px;
    text-align: center;
    border: 1px dashed #ddd;
    padding-top: 20px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
