// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据:首页——全部分类
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取商品分类数据当中的一级类目
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id: id })
}
