<template>
  <!-- 
    refactor(pages): empresas
    add(pages): empresas
    rm(pages): empresas
  -->
  <section>
    <!-- <div v-if="data">
      <h2>Empresas</h2>
      <div class="produtos-wrapper" v-for="(data, index) in data" :key="index">
        <ProdutoItem v-if="data.id" :produto="data.id">
          <p class="vendedor">
            <span>Empresa:</span>
            {{data.nome}}
            <br><br>
            <span>CNPJ:</span>
            {{data.cnpj}}
            <br><br>
            <span>Endereço:</span>
            {{data.endereco}}




          </p>



        </ProdutoItem>
      </div>
    </div>
    <PaginaCarregando v-else/> -->


  <div id="app">
    
    <ejs-grid :dataSource="data" :allowPaging="true" :allowSorting="true" :allowFiltering="true" :allowGrouping='true' :pageSettings='pageSettings'>
      <e-columns>
        <e-column field='nome' headerText='Nome' textAlign='Left'></e-column>
        <e-column field='cnpj' headerText='CNPJ' textAlign='Center'></e-column>
        <e-column field='cidade.nome' headerText='Cidade' textAlign='Center'></e-column>
         <!-- <e-column field='endereco' headerText='Endereço'></e-column>
          <e-column field='bairro' headerText='Bairro'></e-column> -->
      </e-columns>
    </ejs-grid>
  </div>











  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";

import Vue from 'vue';
import { GridPlugin, Page, Sort, Filter, Group } from '@syncfusion/ej2-vue-grids';
Vue.use(GridPlugin);

export default {
  data() {
    return {
      data: null,
      pageSettings: { pageSize: 5 }
    };
  },
  provide: {
    grid: [Page, Sort, Filter, Group]
  },







  
  computed: {
    ...mapState(["auth", "login"])
  },
  methods: {
    getCompras() {
      api.get(`empresas/buscar?nome=`).then(response => {
        this.data = response.data;
      });
    }
  },
  watch: {
    // login() {
    //   this.getCompras();
    // }
  },
  created() {
    // if (this.login) {
      this.getCompras();
    // }
  }
};
</script>

<style scoped>
@import url("https://cdn.syncfusion.com/ej2/material.css");
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>

