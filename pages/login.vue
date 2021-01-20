<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="password">
      <button class="btn" @click.prevent="logar">Logar</button>
      <ErroNotificacao :erros = "erros"/>
    </form>
    <p class="perdeu">
      <a href="http://localhost/wp_ranek/wp-login.php?action=lostpassword" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCriar/>
  </section>
</template>

<script>
import Notification from '~/components/Notification'
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      erros: []
    }
  },
  methods: {
    async logar() {
      this.erros = [];
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>

