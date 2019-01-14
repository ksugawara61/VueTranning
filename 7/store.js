import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // タスクの初期ステート
        tasks: [
            {
                id: 1,
                name: '牛乳を買う',
                labelIds: [1,2],
                done: false
            },
            {
                id: 2,
                name: 'Vue.jsの本を買う',
                labelIds: [1,3],
                done: true
            }
        ],

        labels: [
            {
                id: 1,
                text: '買い物'
            },
            {
                id: 2,
                text: '食料'
            },
            {
                id: 3,
                text: '本'
            }
        ],

        // 次に追加するタスクID
        nextTaskId: 3,
        nextLabelId: 4
    },

    mutations: {
        // タスクを追加
        addTask(state, { name, labelIds }) {
            state.tasks.push({
                id: state.nextTaskId,
                name,
                labelIds,
                done: false
            });

            // 次に追加するIDを更新
            state.nextTaskId;
        },

        // タスクの完了状態を変更
        toggleTaskStatus(state, { id }) {
            const filtered = state.tasks.filter(task => {
                return task.id === id
            });

            filtered.forEach(task => {
                task.done = !task.done
            });
        },

        // ラベルを追加
        addLabel(state, { text }) {
            state.labels.push({
                id: state.nextLabelId,
                text
            });

            state.nextLabelId++;
        }
    }
});

export default store
