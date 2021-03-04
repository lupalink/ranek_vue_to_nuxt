<template>
  <div id="app">  
    <ErroNotificacao :erros="erros"/>
    <ejs-button cssClass='e-primary' v-on:click.native="salvarRegistro" >Salvar Registro</ejs-button>

    <ejs-tab id='element'>
      
      <div class="e-tab-header">
        <div>Título do serviço</div>
        <div>Descrição do serivço </div>
        <div>Valores do serviço</div>     
      </div>

      <div class="e-content">
       
        <div>
          <SinaproCadastroTitulo />
        </div>

        <div>
          <SinaproCadastroItem />
        </div>
        
        <div>
          <SinaproCadastroValor />
        </div>        
            
      </div>
   
    </ejs-tab>
    
  </div>
  
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import Vue from 'vue';
import { api } from "@/services.js";
import { TabPlugin } from '@syncfusion/ej2-vue-navigations';
import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
Vue.use(ButtonPlugin);
Vue.use(TabPlugin);
export default {
  data(){
    return {
      erros: [],
      servico_id: 'teste',      
    }
  },
  computed: {
    ...mapState(['sinapro_categoria_item', 'sinapro_categoria_titulo', 'sinapro_servico'],
    ),
    id(id_servico) {
      var id_servico = this.$store.state.sinapro_servico
      return id_servico;
    },
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_ITEM", "UPDATE_SINAPRO_VALOR", "UPDATE_SINAPRO_SERVICO"]),
    
    salvarRegistro(){
      //  debugger;

      this.erros = [];         
      api.post(`/servicos`,
      {
        veiculo: "sinapro",
	      filtro: "servico",
        usuario_id: 17,
        servicos_insercao_id: 7,
        servicos_insercao_controle_id: 54,

        servicos_categoria_sub_pai_id: this.sinapro_categoria_titulo.id,
        servicos_categoria_sub_filho_id: this.sinapro_categoria_item.id,
        servicos_observacao: ''
      })
      .then((response) => {
        this.servico_id = response.data.data['servico'].servicos_id
        // console.log(this.servico_id)
        // console.log(response.data.data['servico'].servicos_id)
        this.UPDATE_SINAPRO_SERVICO(response.data.data['servico'].servicos_id)
        // this.$router.push({ name: "sinapro-opcoes" });
        // this.erros.push(error.response.data.message);
        this.SalvarValores()
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
      })
    
      
       
      
      
      // console.log(this.servico_id)
    
      // api.post(`/servicos`,
      // {
      //   veiculo: "sinapro",
	    //   filtro: "valor",
      //   usuario_id: 17,
      //   // servicos_insercao_id: 7,
      //   // servicos_insercao_controle_id: 54,

      //   servicos_id: this.$store.state.sinapro_servico,
      //   valores: this.$store.state.valores,

      // })
      // .then((response) => {
      //   console.log(response.data.data)
      //   // this.UPDATE_SINAPRO_SERVICO(response.data.data)
      //   // this.$router.push({ name: "sinapro-opcoes" });
      //   // this.erros.push(error.response.data.message);
      // })
      // .catch(error => {
      //   this.erros.push(error.response.data.message);
      // });
    },
    SalvarValores(){
    console.log(this.$store.state.sinapro_servico)
      api.post(`/servicos`,
      {
        veiculo: "sinapro",
	      filtro: "valor",
        usuario_id: 17,
        // servicos_insercao_id: 7,
        // servicos_insercao_controle_id: 54,

        servicos_id: this.$store.state.sinapro_servico,
        valores: this.$store.state.valores,

      })
      .then((response) => {
        console.log(response.data.data)
        // this.UPDATE_SINAPRO_SERVICO(response.data.data)
        // this.$router.push({ name: "sinapro-opcoes" });
        // this.erros.push(error.response.data.message);
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
      });
    }
  },
  created(){
    // this.id_item = this.sinapro_categoria_item[0].id
    // console.log(this.sinapro_categoria_titulo)
    //  console.log(this.sinapro_categoria_item[0].id)
    // console.log(this.$store.state.sinapro_categoria_item)
  }
}
</script>
<style>
  @import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "@/node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
  @import "@/node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
  @import "@/node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";


  @import '@/node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '@/node_modules/@syncfusion/ej2-buttons/styles/material.css';
</style>