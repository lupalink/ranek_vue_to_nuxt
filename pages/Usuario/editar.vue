<template>
  <!-- 
    refactor(view): UsuarioEditar
    add(view): UsuarioEditar
    rm(view): UsuarioEditar
  -->
  <form>
      
    <label for="nome">Nome</label>
    <input id="nome" name="nome" type="text" v-model="auth.user.nome">
   <label for="email">Email</label>
    <input id="email" name="email" type="email" v-model="auth.user.email">
    <label for="senha">Senha</label>
    <input id="senha" name="senha" type="password" v-model="auth.user.senha">
    <label for="cep">Cep</label>
   <input id="cep" name="cep" type="text" v-model="auth.user.cep" @keyup="preencherCep"> 
    <label for="rua">Logradoro</label>
    <input id="rua" name="rua" type="text" v-model="auth.user.rua">
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="auth.user.numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="auth.user.bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="auth.user.cidade">
    <label for="estado">Estado</label>    <input id="estado" name="estado" type="text" v-model="auth.user.estado"> 
    <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuário</button>

    <!-- <button class="btn" @click.prevent="pegarDados">Pegar Dados</button> -->





    <ErroNotificacao :erros="erros"/>

  </form>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapGetters, mapMutations} from 'vuex';
  import { api } from "@/services.js";
  export default {
    data() {     
      return {
        erros: [], 
        nome: ''
      };
    },
    computed: {
      ...mapState(["auth"])
    },
    methods: {
      ...mapMutations(["CHANGE_USER"]),

      atualizarUsuario() {        
        this.CHANGE_USER({
        nome: this.auth.user.nome,
        email: this.auth.user.email,
        cep: this.auth.user.cep,
        numero: this.auth.user.numero,
        rua: this.auth.user.rua,
        cidade: this.auth.user.cidade,
        bairro: this.auth.user.bairro,
        estado: this.auth.user.estado,   
      });


      this.erros = [];
      api
        .put(
          '/usuario',
          {
            "nome": this.auth.user.nome ,
            "email": this.auth.user.email,
            "cep": this.auth.user.cep,
            "numero": this.auth.user.numero,
            "rua": this.auth.user.rua,
            "bairro": this.auth.user.bairro,
            "cidade": this.auth.user.cidade,
            "estado": this.auth.user.estado,
            "senha": this.auth.user.senha
          }
        )
        .then(() => {
          // this.$store.dispatch('getUsuario', {
          // this.$store.dispatch("getUsuario");
          this.$router.push({ name: "Usuario" });
        })
        .catch(error => {
          console.log('erro')
          this.erros.push(error.response.data.message);
        });



    },

  getCep(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  },

    preencherCep() {
      const cep = this.auth.user.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        this.getCep(cep).then(response => {
          this.auth.user.rua = response.data.logradouro;
          this.auth.user.bairro = response.data.bairro;
          this.auth.user.estado = response.data.uf;
          this.auth.user.cidade = response.data.localidade;
        });
      }
    },      
    pegarDados(){
      console.log(this.auth.user.nome)
    }
    },
    created(){
      // console.log(user)
    }
    

  };
</script>

<style>
</style>
