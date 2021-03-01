<template>
  <section class="">
   
    <transition mode="out-in">  

      <div v-if="servicos && servicos.length" class="" key="servicos">
        <div class="servicos" v-for="(servico, index) in servicos" :key="index">  
          
          <SinaproComboboxTitulo />
          <SinaproComboboxItem />
          <!-- <SinaproDetalheValor /> -->
          <SinaproValorAlterar/>
        </div>
        
      </div>
      
      <div v-else-if="servicos && servicos.length === 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>
      </div>
      <PaginaCarregando key="carregando" v-else/>
    </transition>
    
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import { api } from "@/services.js";
export default {
  data(){
    return {
      servicos: null    }
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_TITTULO", "UPDATE_SINAPRO_CATEGORIA_ITEM"]),
    
    getServicos() {
      let id = this.$route.params.id
      api.get(`servicos/buscar?
        veiculo=sinapro
        &filtro=servicoDetalhe    
        &usuario_id=17
        &empresa_id=16
        &servicos_id=${id}
        &servicos_praca_id=7
        &servicos_insercao_id=7
        &servicos_insercao_controle_id=
        &sinapro_id=1
        &nivel=2`
      ).then(response => {
        // console.log(response.data.data[0][0])
        // console.log(response.data.data.servico[0]['categoria_subs'][0]['categoria_pai_servicos'].categoria_veiculo)
        //  console.log(response.data.data.servico[0]['categoria_subs'][0]['categoria_filho_servicos'])
        // let lista = [];
        // let listaCadastroTitulo = [];
     
        // lista.push('TODOS');   
        // response.data.sinapro_categoria.forEach((item) => {     
        
        //   listaCadastroTitulo.push(item);
        //   lista.push(item.nome);
          
        // })    
        // this.ddldata = lista
        this.servicos = response.data.data[0];

         this.UPDATE_SINAPRO_CATEGORIA_TITTULO({     
        nome:response.data.data[0][0]['categoria_subs'][0]['categoria_pai_servicos'].categoria_veiculo,   
        })
        
        this.UPDATE_SINAPRO_CATEGORIA_ITEM({     
        nome:response.data.data[0][0]['categoria_subs'][0]['categoria_filho_servicos'].nome,   
        })
 
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      })
    }, 
  },  
  created(){
    this.getServicos();
  }
}
</script>

<style>

/* .servicos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin: 30px;
} */
</style>