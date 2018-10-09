<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MyTitle msg="My app on Vue with Router, Vuex and API Instagram"/>
  </div>
</template>

<script>

import MyTitle from '@/components/MyTitle.vue'

export default {
  name: 'home',
  components: {
      MyTitle
  }
}
</script>
