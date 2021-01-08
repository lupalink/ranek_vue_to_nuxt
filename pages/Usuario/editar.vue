<template>
  <!-- 
    refactor(view): UsuarioEditar
    add(view): UsuarioEditar
    rm(view): UsuarioEditar
  -->
  <!-- <section> -->
    <!-- <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>
      <button class="btn" @click.prevent="pegarDados">Pegar Dados</button>
    </UsuarioForm> -->

    <form>
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="usuario.nome">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" v-model="usuario.email">
    <label for="senha">Senha</label>
    <input id="senha" name="senha" type="password" v-model="usuario.senha">
    <label for="cep">Cep</label>
    <!-- <input id="cep" name="cep" type="text" v-model="usuario.cep" @keyup="preencherCep"> -->
    <label for="rua">Logradoro</label>
    <input id="rua" name="rua" type="text" v-model="usuario.rua">
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="usuario.numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="usuario.bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="usuario.cidade">
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="usuario.estado">
    <!-- <div class="button">
      <slot></slot>
    </div>
  </form>
 -->

  <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>

  <button class="btn" @click.prevent="pegarDados">Pegar Dados</button>





    <ErroNotificacao :erros="erros"/>
  <!-- </section> -->
  </form>
</template>

<script>
 import {mapState} from 'vuex';
// import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "Editar",
  components: {
    // UsuarioForm
  },
   data() {     
    return {
      erros: [], 
      nome: ''
    };
  },
   computed: {
    usuario () {
    return this.$store.state.auth.user
    }
  },
  methods: {
    atualizarUsuario() {
      


      this.erros = [];
      api
        .put(
          '/usuario',
          {
            "nome": this.usuario.nome ,
            "email": this.usuario.email,
            // "cep": this.usuario.cep,
            "numero": this.usuario.numero,
            "rua": this.usuario.rua,
            "bairro": this.usuario.bairro,
            "cidade": this.usuario.cidade,
            "estado": this.usuario.estado
          }
        )
        .then(() => {
          // this.$store.dispatch('getUsuario', {
          this.$store.dispatch("getUsuario");
          // this.$router.push({ name: "editar" });
        })
        .catch(error => {
          this.erros.push(error.response.data.message);
        });
    },
    pegarDados(){
    console.log(this.usuario.nome)
  }
  },
  

};
</script>

<style>
</style>
