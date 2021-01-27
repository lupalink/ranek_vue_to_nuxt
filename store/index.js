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
  usuario_produtos: null
})
export const strict = false

// muda o valor de usuário
// passando dois arguementos, state para ter acesso aos 
// atributos e payload que vai mandar as informações que for feito um commit na mutação
export const mutations = {
  // CHANGE_USER(state , payload) {
  //   // console.log(payload.nome)
  //   state.auth.user.nome = payload.nome
  //   // state.user.senha = payload.senha
  // },
  CHANGE_USER(state, payload) {
    state.auth.user = Object.assign(state.auth.user, payload);
  },

  UPDATE_USUARIO: function (state, user) {
    state.auth.user  = user
  },
  // UPDATE_USUARIO: function (state, user) {
  //   state.authUser = user
  // },

  
  ATUALIZA_USUARIO(state, payload) {
    state.usuario = Object.assign(state.usuario, payload);
  },

  SET_USUARIO(state, payload){
    state.usuario = Object.assign({}, state.usuario, payload)
  },
  SET_POSTS(state, payload){
    state.posts = payload
  },
  // UPDATE_LOGIN(state, payload) {
  //   state.login = payload;
  // },
  // UPDATE_USUARIO(state, payload) {
  //   state.auth.user = Object.assign(state.auth.user, payload);
  // },
  UPDATE_USUARIO_PRODUTOS(state, payload) {
    state.usuario_produtos = payload;
  },
  ADD_USUARIO_PRODUTOS(state, payload) {
    state.usuario_produtos.unshit(payload);
  }
}
// add ação para pegar um usuario
export const actions = {

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
  // getUsuario(context) {
  //   return api.get(`/usuario`).then(response => {
  //     context.commit("UPDATE_USUARIO", response.data);
  //     // console.log(response.data);
  //     // context.commit("UPDATE_LOGIN", true);
  //   });
  // },

  getUsuario(context, payload) {
    // context.commit("ATUALIZA_USUARIO", payload);   
    return api.get(`/usuario`).then(response => {
      context.commit("ATUALIZA_USUARIO", response.data);
      // console.log(response.data);
      // context.commit("UPDATE_LOGIN", true);
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
    // window.localStorage.removeItem("token");
    // context.commit("UPDATE_LOGIN", false);
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


