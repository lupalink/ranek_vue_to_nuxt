<template>
  <div>
    <div
      id="target"
      class="control-section; position:relative"
      style="height: 400px"
    >
      <!-- Render Button to open the Dialog -->
      <ejs-button id="dlgbtn" v-on:click.native="btnClick">Cadastrar um novo</ejs-button>
      <!-- Render Dialog -->
      <ejs-dialog
        :visible='false' 
        ref="footerDialog"
        :header="header"
        :target="target"
        :width="width"
        :buttons="buttons"
        :open="dlgOpen"
        :close="dlgClose"
        :content="contenttemplateVue"
        style="max-height: 450px"
      >
      </ejs-dialog>
              <!-- :height="height" -->

    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { DialogPlugin } from "@syncfusion/ej2-vue-popups";
import { ButtonPlugin } from "@syncfusion/ej2-vue-buttons";
import { GridPlugin, Toolbar, Search } from "@syncfusion/ej2-vue-grids";

import contentTemplateVue from "../content-template.vue";
Vue.use(GridPlugin);
Vue.use(DialogPlugin);
Vue.use(ButtonPlugin);

export default {
  data: function () {
    return {
      target: "#target",
      width: "40%",
      height: "100%",
      // maxHeight: "600px",
      header: "Component inside Dialog",

      toolbarOptions: ["Search"],
      // content: document.getElementById("grid"),
      buttons: [
        {
          click: this.dlgButtonClick,
          buttonModel: { content: "OK", isPrimary: true },
        },
        { click: this.dlgButtonClick, buttonModel: { content: "Cancel" } },
      ],
    };
  },
  provide: {
    grid: [Toolbar, Search],
  },
  mounted: function () {
    document.getElementById("dlgbtn").focus();
  },
  methods: {
    btnClick: function () {
      this.$refs.footerDialog.show();
    },
    dlgClose: function () {
      document.getElementById("dlgbtn").style.display = "";
    },

    dlgOpen: function (args) {        
      args.preventFocus = true;
      document.getElementById("dlgbtn").style.display = "true";
    },
    dlgButtonClick: function () {
      this.$refs.footerDialog.hide();
    },
    contenttemplateVue: function () {
      return { template: contentTemplateVue };
    },
   
  },
created(){

}
};
</script>
<style scoped>



@import "@/node_modules/@syncfusion/ej2-base/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
@import "@/node_modules/@syncfusion/ej2-vue-grids/styles/material.css";

ejs-dialog {
  max-height: 775px !important;
}
</style>