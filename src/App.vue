<template>
  <div id="app">
    <MainCanvas />
  </div>
</template>

<script>
// VUES
import MainCanvas from './components/MainCanvas.vue'

export default {
  name: 'app',
  components: {
    MainCanvas
  }
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

input {
  width: 100%;
}

.button, .button-flat {
  width: 100%;
  text-align: center;
  border-radius: 20px;
  text-decoration: none;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
}
.button-icon {
  width: 5%;
  min-width: 30px;
  max-width: 40px;
}

.button-clear {
  border: none;
}
.button-clear:hover {
  background-color: #7d8b8c;
  color: white;
}

.button-white {
  border: 1px solid #35397a;
  background-color: #fff;
  color: #35397a;
}
.button-white:hover {
  background-color: #35397a;
  color: white;
}

.button-blue-grey {
  border: none;
  background-color: #7d8b8c;
  color: white;
}
.button-blue-grey:hover {
  background-color: #abfffe;
  color: black;
}

.button-red {
  border: 1px solid #5c1e19;
  background-color: #ffc2bd;
  color: #5c1e19;
}
.button-red:hover {
  background-color: #5c1e19;
  color: #fff;
}

.button-green {
  border: 1px solid #345915;
  background-color: #c0e6a1;
  color: #345915;
  width: 5%;
  min-width: 30px;
  max-width: 40px;
}
.button-green:hover {
  background-color: #345915;
  color: #fff;
}

.shadowed {
  box-shadow: 10px 10px 5px grey;
}
.card-bordered {
  margin: 10px;
  border: solid 1px black;
}
.toolbox {
  margin: 10px;
}
</style>