<template>
  <div class="container">
    <el-row>
      <el-col>
        <el-button icon="el-icon-download" size="small" @click="handleDownload"
          >导出</el-button
        >
      </el-col>
      <el-col class="search-options">
        <el-button plain size="small" v-popover:popover>高级搜索</el-button>
      </el-col>
      <el-col class="search-input">
        <el-input
          placeholder="请输入内容"
          v-model="inputVal"
          class="input-with-select"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            size="small"
          ></el-button>
        </el-input>
      </el-col>
      <el-popover
        ref="popover"
        placement="bottom"
        width="360"
        v-model="visible"
      >
        <el-form ref="search" :model="search" label-width="80px">
          <el-form-item label="订单编码:">
            <el-input v-model="search.code" size="small"></el-input>
          </el-form-item>
          <el-form-item label="收货人:">
            <el-input v-model="search.consignee" size="small"></el-input>
          </el-form-item>
          <el-form-item label="下单时间:">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="search.date1"
                style="width: 100%;"
                size="small"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="search.date2"
                style="width: 100%;"
                size="small"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            style="color: #f56c6c;"
            @click="visible = false"
            >清空</el-button
          >
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="visible = false"
            >确定</el-button
          >
        </div>
      </el-popover>
    </el-row>

    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="id" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="seri" label="序列名称" align="center" width="160">
      </el-table-column>
      <el-table-column prop="category" label="商品分类" align="center">
      </el-table-column>
      <el-table-column label="序列详情页" align="center" width="180">
        <template slot-scope="scope">
          <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
            <div v-html="details"></div>
          </el-dialog>
          <el-button
            type="primary"
            size="mini"
            @click="showDetail(scope.row.details)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="date" label="修改时间" align="center" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      inputVal: "",
      visible: false,
      search: {},
      list: [
        {
          id: 1,
          date: "2016-05-02",
          category: "后厨类-保鲜盒类-加强保鲜盒",
          seri: "2256",
          details:
            "<div><img src='https://dummyimage.com/600x400/000/fff' alt=''><img src='https://dummyimage.com/600x400/777/fff' alt=''><img src='https://dummyimage.com/600x400/e3e3e3/fff' alt=''></div>"
        },
        {
          id: 2,
          date: "2016-05-02",
          category: "后厨类-保鲜盒类-加强保鲜盒",
          seri: "2256",
          details:
            "<div><img src='https://dummyimage.com/600x400/000/fff' alt=''><img src='https://dummyimage.com/600x400/777/fff' alt=''><img src='https://dummyimage.com/600x400/e3e3e3/fff' alt=''></div>"
        },
        {
          id: 3,
          date: "2016-05-02",
          category: "后厨类-保鲜盒类-加强保鲜盒",
          seri: "2256",
          details:
            "<div><img src='https://dummyimage.com/600x400/000/fff' alt=''><img src='https://dummyimage.com/600x400/777/fff' alt=''><img src='https://dummyimage.com/600x400/e3e3e3/fff' alt=''></div>"
        },
        {
          id: 4,
          date: "2016-05-02",
          category: "后厨类-保鲜盒类-加强保鲜盒",
          seri: "2256",
          details:
            "<div><img src='https://dummyimage.com/600x400/000/fff' alt=''><img src='https://dummyimage.com/600x400/777/fff' alt=''><img src='https://dummyimage.com/600x400/e3e3e3/fff' alt=''></div>"
        }
      ],
      details: {},
      detailDialogVisible: false
    };
  },
  methods: {
    showDetail(detail) {
      console.log(detail);
      this.details = detail;
      this.detailDialogVisible = true;
    }
  }
};
</script>

<style scoped></style>
