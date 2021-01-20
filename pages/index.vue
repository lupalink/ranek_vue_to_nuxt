<template>
  <!-- 
    refactor(compoments): Home
    add(compoments): Home
    rm(compoments): Home
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
    if (!window.localStorage.token) {
      window.localStorage.removeItem("auth.token.local");
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
