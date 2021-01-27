<template>
  <!-- 
    refactor(pages): UsuarioEditar
    add(pages): UsuarioEditar
    rm(pages): UsuarioEditar
  -->
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
      <!-- <button class="btn" @click.prevent="teste">teste</button> -->
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
      
      api.put(
        '/usuario',
        this.$store.state.usuario
      )
      .then(() => {
        this.$store.dispatch("getUsuario");
        this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
      });
    },

  },
  created(){
    this.$store.dispatch("getUsuario");
  }
};
</script>

<style>
</style>
