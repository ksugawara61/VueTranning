<template>
    <div>
        <h2>タスク一覧</h2>
        <ul>
            <li v-for="task in tasks" v-bind:key="task.id">
                <input type="checkbox" v-bind:checked="task.done" v-on:change="toggleTaskStatus(task)">
                {{ task.name }}
                -
                <span v-for="id in task.labelIds" v-bind:key="id">
                    {{ getLabelText(id) }}
                </span>
            </li>
        </ul>

        <form v-on:submit.prevent="addTask">
            <input type="text" v-model="newTaskName" placeholder="新しいタスク">
        </form>

        <h2>ラベル一覧</h2>
        <ul>
            <li v-for="label in labels" v-bind:key="label.id">
                <input type="checkbox" v-bind:value="label.id" v-model="newTaskLabelIds">
                {{ label.text }}
            </li>
        </ul>

        <form v-on:submit.prevent="addLabel">
            <input type="text" v-model="newLabelText" placeholder="新しいラベル">
        </form>

        <h2>ラベルでフィルタ</h2>
        <ul>
            <li v-for="label in labels" v-bind:key="label.id">
                <input type="radio" v-bind:checked="label.id === filter" v-on:change="changeFilter(label.id)">
                {{ label.text }}
            </li>
            <li>
                <input type="radio" v-bind:checked="filter === null" v-on:change="changeFilter(null)">
                フィルタしない
            </li>
        </ul>

        <h2>保存と復元</h2>
        <button type="button" v-on:click="save">保存</button>
        <button type="button" v-on:click="restore">復元</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 新しいタスク名を一時的に保存
            newTaskName: '',

            // 新しいタスクに紐づくラベル一覧を一時的に保持
            newTaskLabelIds: [],

            // 新しいラベル名を一時的に保持
            newLabelText: ''
        }
    },

    computed: {
        tasks() {
            return this.$store.getters.filteredTasks // storeを読み込む処理
        },

        labels() {
            return this.$store.state.labels
        },

        filter() {
            return this.$store.state.filter
        }
    },

    methods: {
        addTask() {
            this.$store.commit('addTask', {
                name: this.newTaskName,
                labelIds: this.newTaskLabelIds
            });
            this.newTaskName = '';
            this.newTaskLabelIds = [];
        },

        toggleTaskStatus (task) {
            this.$store.commit('toggleTaskStatus', {
                id: task.id
            });
        },

        addLabel() {
            this.$store.commit('addLabel', {
                text: this.newLabelText
            });
            this.newLabelText = '';
        },

        getLabelText(id) {
            const label = this.labels.filter(label => label.id === id)[0];
            return label ? label.text : '';
        },

        // フィルタする対象のラベルを変更
        changeFilter(labelId) {
            this.$store.commit('changeFilter', {
                filter: labelId
            });
        },

        // 現在の状態を保存
        save() {
            this.$store.dispatch('save');
        },

        // 保存されている状態を復元
        restore() {
            this.$store.dispatch('restore');
        }
    }
}
</script>