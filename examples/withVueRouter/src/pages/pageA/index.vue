<!--
@Author: houshengwei
@Date:   2018/07/23
@Last modified by:   houshengwei
@Last modified time: 2018/07/23
-->

<template lang="html">
  <div class="pageA">
    <h1>this is pageA</h1>
    <p>GO TO:</p>
    <ul>
      <li><router-link :to="{ name: 'subPageA1' }">subPageA1</router-link></li>
      <li><router-link :to="{ name: 'subPageA2' }">subPageA2</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'pageA'
}
</script>

<style lang="css">
</style>
