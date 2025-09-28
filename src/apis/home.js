// 定义API接口，在home-category.vue组件获取数据，护理获得品牌数据
import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
