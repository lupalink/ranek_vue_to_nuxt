export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  UsuarioProdutos(state) {
    usuario_produtos: null
  }
}

export const  mutations = {
  UPDATE_USUARIO(state, payload) {
    state.user = Object.assign(state.user, payload);
  }
}

export const actions = {
  getUsuarioProdutos(context) {
    // o id é passado pelo context
    // a ação puxa pelo id registrado no login
    return api
    .get(`/produto?usuario_id=${context.state.user.id}`)
    .then(response => {
      context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
    });
  }
}
  