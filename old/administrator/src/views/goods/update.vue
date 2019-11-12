<template>
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
    <el-table-column label="商品分类" align="center" width="120">
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
    <el-table-column label="商品" align="center" width="380px">
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
    <el-table-column label="详情" align="center">
      <template slot-scope="scope">
        <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
          <div v-html="goodsDetail"></div>
        </el-dialog>
        <el-button
          type="primary"
          size="mini"
          @click="showDetail(scope.row.description)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <el-table-column
      label="市场价"
      prop="marketPrice"
      align="center"
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
          <el-button size="mini" type="success" @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="warning" @click="handleNC(scope.row)"
            >库存</el-button
          >
          <el-button
            size="mini"
            v-if="scope.row.isOnSale === '0'"
            type="primary"
            @click="handleUpdate(scope.row)"
            >草稿</el-button
          >
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.isOnSale === '1'"
            @click="handleUpdate(scope.row)"
            >上架</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </el-col>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "update",
  data() {
    return {
      listLoading: false,
      detailDialogVisible: false,
      goodsDetail: "",
      tags: [
        { text: "新品", value: "0" },
        { text: "热销", value: "1" },
        { text: "推荐", value: "2" },
        { text: "促销", value: "3" }
      ],
      data: {
        listImgs: [
          {
            id: 1,
            code: 23456489564,
            ncCaseSize: "285x265x666",
            specCapacity: "0.5l",
            description: "asdasdasdasd",
            ncMeterageUnit: "L",
            ncPackage: 12,
            specColor: "lanse",
            ncMaterial: "PC"
          },
          {
            id: 2,
            code: 23456489564,
            ncCaseSize: "285x265x666",
            specCapacity: "0.5l",
            description: "asdasdasdasd",
            ncMeterageUnit: "L",
            ncPackage: 12,
            specColor: "lanse",
            ncMaterial: "PC"
          },
          {
            id: 3,
            code: 23456489564,
            ncCaseSize: "285x265x666",
            specCapacity: "0.5l",
            description: "asdasdasdasd",
            ncMeterageUnit: "L",
            ncPackage: 12,
            specColor: "lanse",
            ncMaterial: "PC"
          }
        ],
        parentCategoryName: "后厨类",
        productImg: "https://dummyimage.com/100x80/000/fff",
        name: "100x80",
        marketPrice: "32.6",
        tag: ["remai", "xinpin"]
      }
    };
  }
};
</script>

<style scoped></style>
