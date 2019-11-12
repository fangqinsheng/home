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

    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="正在查询中。。。"
      fit
      highlight-current-row
    >
      <el-table-column type="expand" width="80">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-col :md="12">
              <el-form-item label="产品画廊">
                <img
                  class="gallery"
                  v-for="pic in props.row.listImgs"
                  :key="pic.id"
                  :src="pic"
                />
              </el-form-item>
              <el-form-item label="产品编码">
                <span>{{ props.row.code }}</span>
              </el-form-item>
              <el-form-item label="产品规格">
                <span>{{ props.row.spec }}</span>
              </el-form-item>
              <el-form-item label="外箱规格">
                <span>{{ props.row.ncCaseSize }}</span>
              </el-form-item>
              <el-form-item label="容量">
                <span>{{ props.row.specCapacity }}</span>
              </el-form-item>
              <el-form-item label="产品描述">
                <!--                    <span>{{ props.row.description }}</span>-->
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="计量单位">
                <span>{{ props.row.ncMeterageUnit }}</span>
              </el-form-item>
              <el-form-item label="装数">
                <span>{{ props.row.ncPackage }}</span>
              </el-form-item>
              <el-form-item label="容量">
                <span>{{ props.row.specCapacity }}</span>
              </el-form-item>
              <el-form-item label="材质">
                <span>{{ props.row.ncMaterial }}</span>
              </el-form-item>
            </el-col>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" align="center" width="220">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.parentCategoryName === '后厨类'">{{
            scope.row.parentCategoryName
          }}</el-tag>
          <el-tag
            v-if="scope.row.parentCategoryName === '楼面类'"
            type="success"
            >{{ scope.row.parentCategoryName }}</el-tag
          >
          <el-tag
            v-if="scope.row.parentCategoryName === '周转类'"
            type="warning"
            >{{ scope.row.parentCategoryName }}</el-tag
          >
          <el-tag v-if="scope.row.parentCategoryName === '其他'" type="info">{{
            scope.row.parentCategoryName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品">
        <template slot-scope="scope">
          <img
            class="gallery"
            :src="scope.row.productImg"
            width="100"
            height="80"
          />
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="终端价"
        prop="marketPrice"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        label="批发价"
        prop="marketPrice"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="sale"
        label="标签"
        align="center"
        :filters="tags"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="160"
      >
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tag"
            :key="item"
            style="margin-left: 5px; margin-bottom: 5px;"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-col>
            <el-button
              size="mini"
              type="success"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="warning" @click="handleNC(scope.row)"
              >库存</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.isOnSale === '0'"
              type="danger"
              @click="handleUpdate(scope.row)"
              >下架</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.isOnSale === '1'"
              @click="handleUpdate(scope.row)"
              >上架</el-button
            >
          </el-col>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "update",
  data() {
    return {
      search: {},
      listLoading: false,
      tags: [
        { text: "新品", value: "0" },
        { text: "热销", value: "1" },
        { text: "推荐", value: "2" },
        { text: "促销", value: "3" }
      ],
      data: [
        {
          id: 1,
          listImgs: [
            "https://dummyimage.com/50x50/000/fff",
            "https://dummyimage.com/50x50/000/fff"
          ],
          code: 23456489564,
          ncCaseSize: "285x265x666",
          specCapacity: "0.5l",
          description: "asdasdasdasd",
          ncMeterageUnit: "L",
          ncPackage: 12,
          specColor: "lanse",
          ncMaterial: "PC",
          parentCategoryName: "后厨类",
          productImg: "https://dummyimage.com/100x80/000/fff",
          name: "100x80",
          marketPrice: "32.6",
          isOnSale: "0",
          tag: [
            { name: "xinpin", id: 1 },
            { name: "remai", id: 2 }
          ]
        },
        {
          id: 2,
          listImgs: [
            "https://dummyimage.com/50x50/000/fff",
            "https://dummyimage.com/50x50/000/fff"
          ],
          code: 23456489564,
          ncCaseSize: "285x265x666",
          specCapacity: "0.5l",
          description: "asdasdasdasd",
          ncMeterageUnit: "L",
          ncPackage: 12,
          specColor: "lanse",
          ncMaterial: "PC",
          parentCategoryName: "后厨类",
          productImg: "https://dummyimage.com/100x80/000/fff",
          name: "100x80",
          marketPrice: "32.6",
          isOnSale: "1",
          tag: [
            { name: "xinpin", id: 1 },
            { name: "remai", id: 2 }
          ]
        },
        {
          id: 3,
          listImgs: [
            "https://dummyimage.com/50x50/000/fff",
            "https://dummyimage.com/50x50/000/fff"
          ],
          code: 23456489564,
          ncCaseSize: "285x265x666",
          specCapacity: "0.5l",
          description: "asdasdasdasd",
          ncMeterageUnit: "L",
          ncPackage: 12,
          specColor: "lanse",
          ncMaterial: "PC",
          parentCategoryName: "后厨类",
          productImg: "https://dummyimage.com/100x80/000/fff",
          name: "100x80",
          isOnSale: 0,
          marketPrice: "32.6",
          tag: [
            { name: "xinpin", id: 1 },
            { name: "remai", id: 2 }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.goods {
  .filter {
    margin-bottom: 20px;
    .el-input {
      margin-right: 10px;
    }
  }
  .content {
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 100px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.gallery {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
