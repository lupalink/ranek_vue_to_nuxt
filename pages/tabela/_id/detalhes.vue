<template>
  <!-- 
    refactor(pages): detalhes
    add(pages): detalhes
    rm(pages): detalhes
  -->
  <section class="usuario">
     <nav class="sidenav">
       <h3>Sinapro - Detalhes</h3>
      <ul>
        <li>    
          <nuxt-link to="inicial">Serviço</nuxt-link>          
        </li>
        <li>
          <nuxt-link to="editar">Editar</nuxt-link> 
        </li>
        <li>
          <!-- this.$router.push({path: `/produto/${postId}/details`}) -->
          <nuxt-link to="/sinapro/tabela">Tabela</nuxt-link> 
        </li>
        <!-- <li>
          <nuxt-link to="single">Detalhes</nuxt-link> 
        </li> 
         <li>
          <nuxt-link to="teste">Testes</nuxt-link> 
        </li>      -->
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
      this.$store.dispatch("deslogarUsuario");
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
  /* max-width: 900px; */
  max-width: 96%;
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
  background: #e3165b;
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
