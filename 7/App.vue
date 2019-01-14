<template>
    <div>
        <h2>タスク一覧</h2>
        <ul>
            <li v-for="task in tasks" v-bind:key="task.id">
                <input type="checkbox" v-bind:checked="task.done" v-on:change="toggleTaskStatus(task)">
                {{ task.name }}
            </li>
        </ul>

        <form v-on:submit.prevent="addTask">
            <input type="text" v-model="newTaskName" placeholder="新しいタスク">
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 新しいタスク名を一時的に保存
            newTaskName: ''
        }
    },

    computed: {
        tasks() {
            return this.$store.state.tasks // storeを読み込む処理
        }
    },

    methods: {
        addTask() {
            this.$store.commit('addTask', {
                name: this.newTaskName
            });
            this.newTaskName = '';
        },

        toggleTaskStatus (task) {
            this.$store.commit('toggleTaskStatus', {
                id: task.id
            });
        }
    }
}
</script>