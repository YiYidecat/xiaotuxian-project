<!-- 使用render函数自己拼接创建 -->
<template>
    <div class="xtx-bread-item">
        <RouterLink v-if="to" :to="to"><slot/></RouterLink>
        <span v-else><slot/></span>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  },
  components: {
    RouterLink
  }
}
</script>
