<template>
  <!-- 
    refactor(compoments): Usuario
    add(compoments): Usuario
    rm(compoments): Usuario
  -->
  <section class="usuario">
     <nav class="sidenav">
      <ul>
        <li>    
          <nuxt-link to="/usuario/produto">Produtos</nuxt-link>          
        </li>
        <li>
          <nuxt-link to="compras">Compras</nuxt-link> 
        </li>
        <li>
          <nuxt-link to="vendas">Vendas</nuxt-link> 
        </li>
        <li>         
          <nuxt-link to="editar">Editar Usuário</nuxt-link> 
        </li>
        <li>
          <button @click.prevent="deslogar">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <nuxt-child />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {  
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  name: "Usuario",
  methods: {
    async deslogar() {
      await this.$auth.logout()
      window.localStorage.removeItem("auth.token.local");
    }
  },
  created(){
    //  console.log( this.$store.state.auth.user)
  }
};
</script>

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a.nuxt-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
</style>
