<template>
  <div id="app">
		<transition name="fade" mode="out-in">
			<router-view style="height:100%;"></router-view>
		</transition>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>
  @import './assets/css/app.css';
</style>
