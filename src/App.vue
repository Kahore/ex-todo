<template>
	<div id="app">
		<div id="nav">
			<app-header></app-header>
			<router-link to="/">Home</router-link>|
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</div>
</template>
<script>
export default {
	components: {
		"app-header": () => import("@/components/Header.vue")
	}
};
</script>

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-left: 25%;
}
body {
	min-width: 230px;
	max-width: 700px;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	outline: none;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
input[type="checkbox"] {
	position: absolute;
	text-align: center;
	width: 40px;
	height: auto;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none;
}
@media screen and (max-width: 768px) {
	#app {
		margin-left: 0%;
		padding: 10px;
	}
}
</style>
