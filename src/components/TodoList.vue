<template>
	<div class="todos-list">
		<div
			v-for="(todo, id ) in todos"
			:key="id"
			class="todos-list_block"
			:class="{ 'todos-list_block__done': todo.completed }"
		>
			<div :id="todo.id">
				<input type="checkbox" :value="todo.id" @change="markComplete( todo )" v-model="completedTODO" />
				<span class="todos-list_block-text" @dblclick="editTodo(todo)">{{ todo.title }}</span>
				<span class="todos-list_block-text todos-list_block-text--right">{{ todo.dateExp }}</span>
				<input
					class="edit"
					type="text"
					v-model="todo.title"
					@blur="doneEdit(todo)"
					@keyup.enter="doneEdit(todo)"
					@keyup.esc="cancelEdit(todo)"
				/>
				<button class="btn-del" @click="delTodo(todo.id)"></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TodoList",
	data() {
		return {
			onEdit: true,
			editedTodo: null,
			editedTitle: "",
			editedDateExp: ""
		};
	},
	methods: {
		markComplete(todo) {
			todo.completed = !todo.completed;
			this.$store.dispatch("MUTATE_TODO_MARK", todo);
		},
		editTodo(todo) {
			(this.tmpTitle = todo.title),
				(this.tmpDateExp = todo.dateExp),
				(this.editedTodo = todo);
			console.log("TCL: editTodo -> editedTodo", this.editedTodo);
		},
		doneEdit: function(todo) {
			// if (!this.editedTodo) {
			//   return
			// }
			// this.editedTodo = null
			// todo.title = todo.title.trim()
			// if (!todo.title) {
			//   this.removeTodo(todo)
			// }
		},

		cancelEdit: function(todo) {
			// this.editedTodo = null
			// todo.title = this.beforeEditCache
		},

		delTodo(todoId) {
			this.$store.dispatch("MUTATE_TODO_DELETE", todoId);
		}
	},
	computed: {
		todos() {
			return this.$store.getters.GET_TODOS;
		},
		completedTODO: {
			get: function() {
				return this.$store.getters.GET_TODO_COMPLETED;
			},
			set: function(value) {
				this.$emit("input", value);
			}
		}
	},
	created() {
		this.$store.dispatch("LOAD_TODO");
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todos-list_block {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
	text-align: left;
	&:hover .btn-del {
		display: inline-block;
	}
	&-text {
		display: inline-flex;
		word-break: break-word;
		transition: color 0.4s;
		max-width: 260px;
		margin-left: 40px;
		&--right {
			float: right;
			padding-right: 60px;
		}
	}
	&__done {
		text-decoration: line-through;
	}
}
.btn-del {
	display: none;
	position: absolute;
	right: 10px;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	-webkit-transition: color 0.2s ease-out;
	transition: color 0.2s ease-out;
	&:hover {
		color: #af5b5e;
		cursor: pointer;
	}
	&:after {
		content: "×";
	}
}
@media screen and (max-width: 375px) {
	.todos-list_block {
		&-text {
			max-width: 130px;
			&--right {
				padding-right: 25px;
			}
		}
	}
}
@media screen and (max-width: 425px) {
	.todos-list_block {
		font-size: 12px;
	}
	.btn-del {
		width: 10px;
		height: 0px;
		font-size: 15px;
	}
}
</style>
