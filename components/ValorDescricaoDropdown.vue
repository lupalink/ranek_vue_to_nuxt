
<template>
  <!-- 
    refactor(compoments): ValorDescricaoDropdown
    add(compoments): ValorDescricaoDropdown
    rm(compoments): UsuaValorDescricaoDropdownrioForm
  -->
  <ejs-dropdownlist
    name="descricaoValoresDropdown"
    id="dropdownlist"
    v-model="data.valor_servico[0].valor_categorias[0].valor_descricao"
    :change="doCustomAction.bind(this)"
    placeholder="Selecione um item"
    :dataSource="valores"
    :fields="fieldsValores"
    :allowFiltering='true'
  ></ejs-dropdownlist>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  data() {
    return {
      valores: this.$store.state.alterar_valores,
      fieldsValores: { text: "nome", value: "nome" }
    };
  },
  methods: {
    ...mapMutations(["UPDATE_SINAPRO_VALOR_DESCRICAO"]),
    doCustomAction: function(args) {       
      this.$eventHub.$emit("descricaoDoValor", args.itemData);
     this.UPDATE_SINAPRO_VALOR_DESCRICAO(args.itemData)
      console.log(args.itemData)
    }
  },
};
</script>

<style>
</style>