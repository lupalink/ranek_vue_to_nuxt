<template>
  <div>
    <h2>{{this.$route.params.id}}</h2>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route.params.id)
  }
}
</script>

<style>

</style>