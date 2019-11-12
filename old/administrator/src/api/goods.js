import req from "@/utils/request";

// 查询所有商品
export function queryAll(page, limit) {
  return req({
    url: "/product/list",
    method: "get",
    params: {
      page: page,
      limit: limit
    }
  });
}

// 查询单个商品
export function querySingle(ID) {
  return req({
    url: "/product/get",
    method: "post",
    params: {
      id: ID
    }
  });
}

// 编辑商品
export function updateGoods(data) {
  return req({
    url: "/product/update",
    method: "post",
    params: data
  });
}

// 删除商品
export function deleteGoods(ID) {
  return req({
    url: "/product/delete",
    method: "post",
    params: {
      id: ID
    }
  });
}
