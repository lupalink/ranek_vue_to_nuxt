// refactor(store): index
// add(store): index
// rm(store): index 

import { api } from "@/services.js";

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}

export const state = () => ({
  usuario: {
    id: "",
    nome: "",
    email: "",
    senha: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: ""
  },
  usuario_produtos: null,
  sinapro_categoria_titulo: {
    id: '',
    nivel: '',
    sinapro_id: '', 
    nome: '',     
    sinapro: '',
    nivel_descricao: ''      
  },
  sinapro_categoria_item: {
    id: '',
    nivel: '',
    sinapro_id: '', 
    nome: '',
    sinapro_numero_item: '',
    sinapro: '',
    sinapro_item_cabecalho_id: '',
    nivel_descricao: '' 
  },
  sinapro_servico: {
    id: '',
  },
  valores: [],
  alterar_valores: null,
  valores_atualizar: null,
  valor_descricao: null,
  todo: null
})
export const strict = false

export const mutations = {

  UPDATE_TODO(state, payload, ) {      
    state.valores[payload.index].valor_categoria_id = payload.params.valor_categoria_id
    state.valores[payload.index].valores_valor = payload.params.valores_valor
  },

  REMOVE_TODO(state, payload) {
    state.valores.splice(payload, 1)
  },
  

  CHANGE_USER(state, payload) {
    state.auth.user = Object.assign(state.auth.user, payload);
  },

  DEFALUT_SINAPRO_VALOR(state, payload) {
    state.valores = [];
  },


  UPDATE_SINAPRO_VALOR(state, payload) {
    state.valores.push(payload)
    // state.alterar_valores = (payload)
  },

  // verificar como vai ficar
  UPDATE_SINAPRO_VALOR_DESCRICAO_DROPDOWNLIST(state, payload) {    
    state.alterar_valores = (payload)
  },
  
  UPDATE_SINAPRO_VALOR_CADASTRO(state, payload) {
    state.valores = (payload)
  },

  UPDATE_SINAPRO_VALORES_ATUALIZAR(state, payload) {
    state.valores_atualizar = (payload)
  },

  UPDATE_SINAPRO_VALOR_DESCRICAO(state, payload) {
    state.valor_descricao = (payload)
  },

  UPDATE_SINAPRO_CATEGORIA_TITTULO(state , payload) {
    state.sinapro_categoria_titulo = payload
  },

  UPDATE_SINAPRO_SERVICO(state , payload) {
    state.sinapro_servico = payload
  },
  
  UPDATE_SINAPRO_CATEGORIA_ITEM(state , payload) {
    state.sinapro_categoria_item = payload
  },

  UPDATE_USUARIO: function (state, user) {
    state.auth.user  = user
  },

  ATUALIZA_USUARIO(state, payload) {
    state.usuario = Object.assign(state.usuario, payload);
  },

  SET_USUARIO(state, payload){
    state.usuario = Object.assign({}, state.usuario, payload)
  },
  SET_POSTS(state, payload){
    state.posts = payload
  },

  UPDATE_USUARIO_PRODUTOS(state, payload) {
    state.usuario_produtos = payload;
  },

  ADD_USUARIO_PRODUTOS(state, payload) {
    state.usuario_produtos.unshit(payload);
  }
}
// add ação para pegar um usuario
export const actions = {

  async removeTodo({ commit }, todo) {
    try {
      commit('REMOVE_TODO', todo)
    } catch (error) {
      // TODO notif error
    }
  },

  async updateTodo(context, payload) {
    // try {     
      console.log('esse é a ação ', payload)
      context.commit('UPDATE_TODO', payload)
    // } catch (error) {
      // TODO notif error
    // }
  },

  async updatePost({commit}, payload){
    const {data} = await this.$axios.put(`/usuario`, payload)
    commit('UPDATE_USUARIO', data)
  },

  setPost({ commit }, payload) {
    commit('SET_POST', payload)
  },
  getUsuarioProdutos(context) {
      return api
      .get(`/produto?usuario_id=${context.state.auth.user.id}`)
      .then(response => {
        context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
      });
  },
  // ação para criar usuário
  criarUsuario(context, payload) {
    context.commit("ATUALIZA_USUARIO", { id: payload.email });
    return api.post("/usuario", payload);
  },  
  async logarUsuario(context, payload) {
    await this.$auth.loginWith('local', {
      data: {
        username: payload.email,
        password: payload.senha
      }
    })
  },
  deslogarUsuario(context) {
    context.commit("ATUALIZA_USUARIO", {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    });
  }
}







































// import Vuex from 'vuex'
// import userModule from './modules/user'

// const createStore = () => {
//   return new Vuex.Store({
//     modules: {
//       user: userModule
//     }
//   })
// }
// export default createStore

// export const getters = {
//   isAuthenticated(state) {
//     return state.auth.loggedIn
//   },

//   loggedInUser(state) {
//     return state.auth.user
//   },
// }


