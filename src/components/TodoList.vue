<template>
	<div class="todos-list">
		<div
			v-for="(todo, id ) in todos"
			:key="id"
			class="todos-list__block"
			:class="{ 'todos-list__block__done': todo.completed, 'todos-list__block--onEdit': todo == editedTodo }"
			:id="todo.id"
		>
			<div class="todos-list__block_view" @dblclick="editTodo(todo)" @touchstart="editTodo(todo)">
				<input type="checkbox" :value="todo.id" @change="markComplete( todo )" v-model="completedTODO" />
				<span class="todos-list__block-text">{{ todo.title }}</span>
				<span class="todos-list__block-text todos-list__block-text_right">{{ todo.dateExp }}</span>
				<button class="btn-del" @click="delTodo(todo.id)"></button>
			</div>
			<div class="todos-list__block_edit">
				<input
					class="todos-list__block-text_huge"
					id="editTitle"
					type="text"
					v-model.trim="todo.title"
					required
					@blur="editDone(todo)"
					@keyup.enter="editDone(todo)"
					@keyup.esc="editCancel(todo)"
				/>
				<input
					class
					id="editDateExp"
					type="date"
					required
					v-model="todo.dateExp"
					@blur="editDone(todo)"
					@keyup.enter="editDone(todo)"
					@keyup.esc="editCancel(todo)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TodoList",
	data() {
		return {
			editedTodo: null,
			tmpTitle: "",
			tmpDateExp: ""
		};
	},
	methods: {
		markComplete(todo) {
			todo.completed = !todo.completed;
			this.$store.dispatch("MUTATE_TODO_MARK", todo);
		},
		editTodo(todo) {
			this.tmpTitle = todo.title;
			this.tmpDateExp = todo.dateExp;
			this.editedTodo = todo;
		},
		editDone(todo) {
			this.editedTodo = null;
			this.$store.dispatch("MUTATE_TODO_EDIT", todo);
		},

		editCancel(todo) {
			this.editedTodo = null;
			todo.title = this.tmpTitle;
			todo.dateExp = this.tmpDateExp;
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
.todos-list__block {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
	text-align: left;
	&:hover {
		background: lighten($color: darkgray, $amount: 30%);
		& .btn-del {
			display: inline-block;
		}
	}
	&-text {
		display: inline-flex;
		word-break: break-word;
		transition: color 0.4s;
		max-width: 260px;
		margin-left: 40px;
		&_right {
			float: right;
			padding-right: 60px;
		}
		&_huge {
			width: 55%;
		}
	}
	&_edit {
		display: none;
	}
	&__done {
		text-decoration: line-through;
	}
	&--onEdit .todos-list__block_view {
		display: none;
	}
	&--onEdit .todos-list__block_edit {
		display: flex;
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
	.todos-list__block {
		&-text {
			max-width: 130px;
			&_right {
				padding-right: 25px;
			}
		}
	}
}
@media screen and (max-width: 425px) {
	.todos-list__block {
		font-size: 12px;
	}
	.btn-del {
		width: 10px;
		height: 0px;
		font-size: 15px;
	}
}
</style>
