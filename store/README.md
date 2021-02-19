# STORE

### exemplos de mutations

```javascript
  CHANGE_USER(state , payload) {
  console.log(payload.nome)
  state.auth.user.nome = payload.nome
  state.user.senha = payload.senha
}
```

```javascript
  UPDATE_SINAPRO_CATEGORIA_TITTULO(state , payload) {
  console.log(payload.nome)
  state.titulo_sinapro = payload.titulo_sinapro
  state.sinapro_categoria_titulo = payload
}
```

### exemplos de actions

```javascript
  actionBegin:function (args){
    if (args.requestType === "salvar"){
      console.log(args.data);
    }
  }
}
```

```javascript
getUsuario(context) {
  return api.get(`/usuario`).then(response => {
    context.commit("UPDATE_USUARIO", response.data);
    console.log(response.data);
    context.commit("UPDATE_LOGIN", true);
  });
}
```
