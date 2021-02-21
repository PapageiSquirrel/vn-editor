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

.button, .button-flat {
  display: block;
  width: 100%;
  text-align: center;
  border-radius: 20px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
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
.button-blue-grey {
  border: none;
  background-color: #7d8b8c;
  color: white;
}
.button-white:hover {
  background-color: #35397a;
  color: white;
}
.button-blue-grey:hover {
  background-color: #abfffe;
  color: black;
}

.shadowed {
  box-shadow: 10px 10px 5px grey;
}
</style>