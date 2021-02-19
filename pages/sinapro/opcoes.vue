<template>
    <div id="app">    
      <!-- {{ddldata}} -->
      
<!--       
      <div v-if="data">
        <h2>Titulo</h2>
        <div class="" v-for="(datas, index) in data" :key="index">
          <span>Serviço:</span>
            <ul>
              <li>
                {{datas.categoria_sub_pai}}
              </li>
            </ul>
        </div>
      </div>
      <PaginaCarregando v-else/>
 -->








       
      <div id='container' style="width:250px;">
        <br> 
        <ejs-dropdownlist id='dropdownlist'  :dataSource='ddldata' placeholder='Selecione um serviço' :change="onChange">
        </ejs-dropdownlist>
      </div>
        <ejs-grid ref='grid' :dataSource='data' :allowFiltering='true' height='273px' :filterSettings='filterOptions' :toolbar='toolbar'  :editSettings='editSettings' :actionBegin='actionBegin'>  
            <e-columns>
               <!-- <e-column field='id' headerText='Resgistro ID' textAlign='Right' width=50  :isPrimaryKey='true'></e-column>
               <e-column field='categoria_sub_filho_id' headerText='Cabeçalho ID' textAlign='Right' width=50  :isPrimaryKey='true'></e-column> -->
                <e-column field='sinapro_id' headerText='Sinapro ID' textAlign='Right' width=50></e-column>
                <e-column field='categoria_sub_pai' headerText='Serviço' width=120></e-column>
                <e-column field='categoria_sub_filho' headerText='Cabeçalho' width=120></e-column>
                <e-column field='item' headerText='Item id' width=100></e-column>
                <e-column field='valor_categoria' headerText='Descrição valor' width=100></e-column>
                <e-column field='valor' headerText='Valor' width=100 :format='formatOptions' ></e-column>
            </e-columns>
        </ejs-grid>
        <ErroNotificacao :erros="erros"/>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { api } from "@/services.js";
import Vue from "vue";
import { GridPlugin, Filter, Toolbar, Search, Edit} from "@syncfusion/ej2-vue-grids";
import { DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);
export default {
  data() {
    return {
      data: null,
      data_sinapro_titulo: null,
      // veiculo: '',
      servicos_id: '',
      categoria_sub_filho: '',
      usuario_id: '',
      empresa_id: '',
      id: '',
      nome: '',
      categoria_sub_filho_id: '',
      item: '',
      valores_id: '',
      valores_valor: '',

      categorias: [{
        categoria_sub_pai: '',
      }],
      erros: [],
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      // toolbarOptions: ['Search'], 
      formatOptions: { format:'C2', currency:'BRL' },
       filterOptions: {
        ignoreAccent: true,
        mode: 'Immediate',
        immediateModeDelay: 200,      
      },       
      ddldata: null
      // ddldata: ['TODOS', 'ANÚNCIO PARA REVISTA', 'ANÚNCIO PARA JORNAL']
    };
  },
  provide: {
    grid: [Filter, Toolbar, Search, Edit]
  },
  computed: {
    ...mapState(["auth", "login"])
  },
  methods: {
    getServicos() {
      api.get(`servicos/buscar?veiculo=sinapro&filtro=servico&filtro=servico&usuario_id=17&servicos_praca_id=7&servicos_insercao_id=7&sinapro_id=1&empresa_id=16&nivel=2`).then(response => {
        // console.log(response.data.sinapro_categoria_titulo)
        this.data = response.data.sinapro_servico;
        // console.log(response.data.sinapro_servico)
        let lista = [];
        let listaCadastroTitulo = [];
        lista.push('TODOS');
        response.data.sinapro_categoria.forEach((item) => {     
          listaCadastroTitulo.push(item);
          lista.push(item.nome);
        })        
        // console.log(lista);
        // console.log(this.r) 
        this.ddldata = lista
        // console.log(listaCadastroTitulo)
 
      });
    },
    onChange: function(args) {
      let element = document.createElement('p');
      if (args.isInteracted) {  
        const filtro =  this.filtro = args.itemData.value
        // console.log(this.filtro)        
        if (args.itemData.value == 'TODOS') {
          this.$refs.grid.clearFiltering();
        } else {
          this.$refs.grid.filterByColumn('categoria_sub_pai', 'equal', args.itemData.value)
        }      
      } 
    },
    // recordDoubleClick: function(args) { 
    //  // you can show Dialog component here 
    //   alert("dblclick"); 
    //     console.log(args.rowData.sinapro_id); 
    //  },
     
    actionBegin: function(args) { 
    if (args.requestType === "save") { 
      // console.log(args.data); // edited data 
      console.log(args.data); // edited data 
      // PLease store this data in Vuex store 
      this.erros = [];
  
      this.categoria_sub_filho = args.categoria_sub_filho
      console.log( args.data.categoria_sub_filho)
      api.put(`servicos/atualizar/`,{
        veiculo: 'sinapro',
        filtro: 'servico',
        servicos_id: 111,      
        usuario_id: 17,
        empresa_id: 16,
        id: 102,
        nome: args.data.categoria_sub_pai,
        categoria_sub_filho: args.data.categoria_sub_filho,
        categoria_sub_filho_id: 103,
        item: args.data.item,
        valores_id: args.data.valor_id,
        valores_valor: args.data.valor,
      })
      .then(() => {
        this.getServicos();
        // this.$store.dispatch("getUsuario");
        // this.$router.push({ name: "usuario-produto" });
      })
      .catch(error => {
        this.erros.push(error.response.data.message);
        // console.log(error)
      });
  
    } else if (args.requestType === "delete") { 
       // console.log(args.data.servico_id)
        console.log(args.data[0]['servico_id'])
       // // alert(args.data.servico_id);      
      }
    }
  },
  created() {
    this.getServicos();
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