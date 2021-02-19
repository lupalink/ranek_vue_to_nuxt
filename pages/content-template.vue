<template>
  <div id="app">
    <ejs-tab id='element'>
      <div class="e-tab-header">
        <div>Orçamento</div>
        <div>CRUD </div>
        <div>Em construção</div>
      </div>

      <div class="e-content">
        <div>
          <!-- <grind/> -->
        </div>

        <div>
          <!-- <grind/> -->
        </div>

        <div>
          seção em construção
        </div>
        
      </div>
    </ejs-tab>
  </div>
</template>
<script>
import Vue from 'vue';
import { TabPlugin } from '@syncfusion/ej2-vue-navigations';
// import grind from '@/components/grind.vue';

Vue.use(TabPlugin);
export default {
  // components: { grind },
  name: 'app',
   data: function(){
    return {
    }
   }
}
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
</style>