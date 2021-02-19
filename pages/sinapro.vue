<template>
  <!-- 
    refactor(pages): Usuario
    add(pages): Usuario
    rm(pages): Usuario
  -->
  <section class="usuario">
     <nav class="sidenav">
       <h3>Sinapro</h3>
      <ul>
        <li>    
          <nuxt-link to="/sinapro/inicial">Orçamento</nuxt-link>          
        </li>
        <li>
          <nuxt-link to="cadastro">Cadastro</nuxt-link> 
        </li>
        <li>
          <nuxt-link to="opcoes">Tabela</nuxt-link> 
        </li>
         <!-- <li>
          <nuxt-link to="sinapro">Sinapro</nuxt-link> 
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
