// 定义API接口，在home-category.vue组件获取数据，护理获得品牌数据
import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 首页-广告区域（pc-小程序）
 * param{*}distributionSite广告区域展示位置（投放位置，1为首页，2为分类商品页）默认是1
 * @returns
 */
export const findBanner = (distributionSite = 1) => {
  return request('/home/banner', 'get', { distributionSite: distributionSite })
}

/**
 * 首页-新鲜好物
 * @param{*}limit 默认值是4，指定响应数据中商品的数量
 * @returns
 */
export const findNew = (limit = 4) => {
  return request('/home/new', 'get', { limit: limit })
}

/**
 * 首页-人气推荐
 * @param 无请求参数
 * @returns
 */
export const RecommendHot = () => {
  return request('/home/hot', 'get')
}

/**
 * 首页-热门品牌
 * @param{*}limit 默认值是4，指定响应数据中商品的数量
 * @returns
 */
export const findHotBrand = (limit = 4) => {
  return request('/home/brand', 'get', { limit: limit })
}

/**
 * 首页-商品区块
 * @param 无请求参数
 * @returns
 */
export const GetGoods = () => {
  return request('/home/goods', 'get')
}
