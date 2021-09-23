<template>
  <div id="news_sys">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'news_sys',
  mounted(){
    this.$store.commit('getSession');
    this.$i18n.locale = this.$store.state.language;
    this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
      
    }
  },
  methods:{
  },
}
</script>

<style lang="less">

</style>
