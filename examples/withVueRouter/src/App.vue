<!--
@Author: houshengwei
@Date:   2018/07/23
@Last modified by:   houshengwei
@Last modified time: 2018/07/23
-->

<template>
  <div id="app">
    <p>Please open the chrome-dev-tool and switch to vuex, then click the links below, watch changes of the vuex store.</p>
    <ul>
      <li><router-link :to="{ name: 'pageA' }">Mount pageA</router-link></li>
      <li><router-link :to="{ name: 'pageB' }">Mount pageB</router-link></li>
    </ul>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.router-link-active{
  color: red;
}
</style>
