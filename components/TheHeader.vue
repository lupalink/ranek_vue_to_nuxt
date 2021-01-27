<template>
  <!-- 
    refactor(compoments): TheHeader
    add(compoments): TheHeader
    rm(compoments): TheHeader
  -->

  <header>
    <nav>
      <nuxt-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </nuxt-link> 
      <nuxt-link v-if="this.$store.state.auth.loggedIn" class="btn" to="/usuario/produto">{{nome}}</nuxt-link>
      <nuxt-link v-else class="btn" to="/login">Vender / Login</nuxt-link> 
     

      <!-- <select class="btn"> -->
       
  <!-- <option selected><nuxt-link v-if="this.$store.state.auth.loggedIn" class="btn" to="/">{{nome}}</nuxt-link></option>
   
  
  <option @click="logout" value="logout">Logout</option>
    <a class="navbar-item" @click="logout">Logout</a>
  </select> -->


    </nav>
  </header>
</template>
<script>

export default {
  computed: {
    nome() {
      return this.$store.state.auth.user.nome.replace(/ .*/, "");
      // return this.$store.state.usuario.nome.replace(/ .*/, "");
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
