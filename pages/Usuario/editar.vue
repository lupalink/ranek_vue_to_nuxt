<template>
  <!-- 
    refactor(view): UsuarioEditar
    add(view): UsuarioEditar
    rm(view): UsuarioEditar
  -->
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros"/>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm
  },
   data() {
    return {
      erros: []
    };
  },
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api
        .put(
          '/usuario',
          this.$store.state.auth.user      
        )
        .then(() => {
              console.log(this.$store.state.auth.user);
          // this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
          // <nuxt-link to="/usuario">Produtos</nuxt-link>  
        })
        .catch(error => {
          // console.log('erro');
          // this.erros.push(error);
          this.erros.push(error.response.data.message);
        });
    }
  }
};
</script>

<style>
</style>
