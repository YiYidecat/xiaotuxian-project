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
