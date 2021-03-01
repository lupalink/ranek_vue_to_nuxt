<template>
  <!-- 
    rm(components): SinaproCadastroValor
    refactor(components): SinaproCadastroValor
    add(components): SinaproCadastroValor
  -->
  <div id="apps">  
    <ErroNotificacao :erros="erros"/> 
    <!-- <h3>{{this.$store.state.sinapro_categoria_titulo.nome}}</h3>      -->
    <ejs-grid
    :dataSource='data'
    ref='grid'

    height='273px' 

    :toolbar='toolbar' 
    :editSettings='editSettings' 
    :actionBegin='actionBegin'
    :actionComplete='actionComplete'
    :toolbarClick='toolbarClick'>  
      <e-columns> 
        <!-- <e-column field='valor_categoria_id' headerText='Descrição do valor' textAlign='Right' width=50></e-column> -->
        <e-column field='valor_servico.0.valor_categorias.0.valor_descricao' headerText='Descrição do valor ' width=50  :isPrimaryKey='true' ></e-column>
        <e-column field='valor_servico.0.valor' headerText='Valor' width=50></e-column>
        <!-- <e-column headerText="" width="150" :commands="commands"></e-column> -->
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import { api } from "@/services.js";
import Vue from "vue";
import { GridPlugin, Filter, Toolbar, Search, Edit, CommandColumn} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
      data: '',  
      erros: [],
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      // toolbarOptions: ['Search'], 
      formatOptions: { format:'C2', currency:'BRL' },
       filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      }, 
      commands: [{ buttonOption: { content: "Selecionar", cssClass: "e-flat" } }],
      ddldata: null,
      temp: ''
    };
  },
  provide: {
    grid: [Toolbar, Search, Edit, CommandColumn]
  },
  computed: {
    ...mapState(['auth', 'login', 'sinapro_categoria_item', 'sinapro_categoria_titulo', 'valores'])   
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_CATEGORIA_ITEM", "UPDATE_SINAPRO_VALOR"]),
    toolbarClick: function (args) {
      if (args.item.id === 'toolbarfilter') {
        // this.$refs.treegrid.filterByColumn('taskName', 'startswith', 'Testing');
        // console.log(this.$refs.grid.ej2Instances.currentViewData)
      }
    },
    salvarRegistro(){
      // console.log(this.$refs.grid.ej2Instances.currentViewData); 
      let lista = [];
      this.$refs.grid.ej2Instances.currentViewData.forEach((item) => {     
        // console.log(item);
          // listaCadastroTitulo.push(item);
          lista.push(item);
          
        })    
        this.temp = lista
        this.UPDATE_SINAPRO_VALOR(this.temp)
        // this.data = listaCadastroTitulo;

    },


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
        this.data = response.data.data[0]['valor_controles']
        // console.log(response.data.data[0]['valor_controles'])
        // let lista = [];      
        // lista.push('TODOS');   
        // response.data.data[0]['valor_controles'].forEach((item) => {     
        
        //   listaValores.push(item);
        // //   lista.push(item.nome);
          
        // })    
        // this.ddldata = lista
        // this.data = listaValores;
        // console.log(this.data)
 
      })
      .catch(error => {
        this.erros.push(error.response);
            // this.erros.push(error.response.data.message);
        // console.log(error.data)
      })
    },
    actionComplete: function (e) { 
      if (e.requestType === 'save') { 
        this.UPDATE_SINAPRO_VALOR(this.$refs.grid.ej2Instances.currentViewData)
        //  console.log(this.$refs.grid.ej2Instances.currentViewData)
      // here you can get all the data after updating 
      //  console.log(e); 
      //  console.log(this.$refs.grid.ej2Instances); 
      }else if(e.requestType === 'delete') {
       this.UPDATE_SINAPRO_VALOR(this.$refs.grid.ej2Instances.currentViewData)
      }
    }, 
    actionBegin: function(args) { 
      
    if (args.requestType === "save") {      
      this.erros = [];    
      
      // console.log(this.$refs.grid.ej2Instances); 
      // this.UPDATE_SINAPRO_VALOR({ 
      //   valor_categoria_id: args.data.valor_categoria_id,
      //   valores_valor: args.data.valores_valor
      // })
      // console.log(args)
      
        // this.UPDATE_SINAPRO_VALOR(args.data)
    






      // api.post(`/servicos`,
      // { 
      //   veiculo: "sinapro",
	    //   filtro: "titulo",
      //   usuario_id: 17,
      //   servicos_insercao_id: 7,
      //   servicos_insercao_controle_id: 54,

      //   nivel: 3,
      //   sinapro_id: this.sinapro_categoria_titulo.sinapro_id,      
      //   nome: args.data.nome,
      //   sinapro_numero_item: args.data.sinapro_numero_item,
      //   nivel_descricao: 'SINAPRO',
      //   sinapro_item_cabecalho_id: 1,  
      //   sinapro: true,        
      // })
      // .then((r) => {
      //   this.getServicos();                               
      //   // this.$refs.grid.filterByColumn('nome', 'equal', this.sinapro_categoria_item[0].nome)
      //   this.$refs.grid.filterByColumn('nome', 'equal', args.data.nome) 
      // })
      // .catch(error => {
      //   this.erros.push(error.response.data.message);
      //   // console.log(error)
      // }); 
    } else if (args.requestType === "delete") { 
        
      
      // console.log(args)
       // console.log(args.data.servico_id)
        // console.log(args.data[0]['servico_id'])
       // // alert(args.data.servico_id);      
        
      }
    },

    commandClick: function(args) {
      // debugger;
      // console.log(args.rowData)
      var rowID = args.target.parentElement
      .closest("tr")
      .getAttribute("data-uid");
      var rowData = JSON.stringify(args.rowData);
      // var rowData = args.rowData.nome;
      var rowIndex = args.target.parentElement
      .closest("tr")
      .getAttribute("aria-rowindex");
      alert(
        // "rowID: " +
        //   rowID +
        //   "\r\nrowIndex: " +
        //   rowIndex +
          "\r\nDESCRIÇÃO DO ITEM: " +
          rowData
      );
      this.UPDATE_SINAPRO_CATEGORIA_ITEM({ 
        id: args.rowData.id,
        nivel: 2,
        sinapro_id: this.sinapro_categoria_titulo.sinapro_id, 
        nome: args.rowData.nome,
        sinapro: 1,
        sinapro_numero_item: args.rowData.sinapro_numero_item,
        sinapro_item_cabecalho_id: 1  
      })  
    }
  },
  created() {
    // console.log(this.$store.state.sinapro_categoria_item)
    this.getServicos();
    // console.log(this.sinapro_categoria_titulo)
  },
}
</script>
<style>


@import '@/node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-inputs/styles/material.css';  
@import '@/node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '@/node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>