<template>
  <!-- 
    refactor(compoments): ProdutosLista
    add(compoments): ProdutosLista
    rm(compoments): ProdutosLista
  -->
  <section class="produtos-container">
    <transition mode="out-in">  
    <div v-if="produtos && produtos.length" class="produtos" key="produtos">
      <div class="produto" v-for="(produto, index) in produtos" :key="index">
        <!-- aponta a rota para produto com parametro da props id: informando que id está em produto -->
        <router-link :to="{name: 'produto-id-details', params: {id: produto.id}}">
          <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo" />
          <p class="preco">{{produto.preco}}</p>
          <h2 class="titulo">{{produto.nome}}</h2>
          <p>{{produto.descricao}}</p>
        </router-link>
           <!-- <button style="float: right; padding: 3px 0" type="text" @click="viewDetails(produto.id)">View Details</button> -->
        
      </div>
      <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina" />
    </div>
    <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
      <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>
    </div>
    <PaginaCarregando key="carregando" v-else/>
    </transition>
  </section>
</template>

<script>
import Vuex from 'vuex'
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
import axios from 'axios'
export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar,
  },
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },

  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    // faz um fech na api e apresenta os dados quando ativado a primeira vez
    getProdutos() {
      this.produtos = null;    
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers["x-total-count"]);
        this.produtos = response.data;
      });
    },
     viewDetails(postId){
        this.$router.push({path: `/produto/${postId}/details`})
      }
  },
  watch: {
    url() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>

