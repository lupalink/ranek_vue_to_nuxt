<template>
  <!-- 
    refactor(pages): index
    add(pages): index
    rm(pages): index
  -->
  <section>    
    <h1>👍 Compre ou Venda 👎</h1>
      <ProdutosBuscar />
      <ProdutosLista /> 
  </section>
</template>


<script>
export default {
  created() {
    const token = this.$auth.$storage.state["token.local"]
    if (this.$store.state.auth.loggedIn){
      api
      .validateToken()
      .then(() => {
        this.$store.dispatch("getUsuario");
      })
    }else {
      localStorage.clear()
    }     
  }
}
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
