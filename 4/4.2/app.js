// JSONを返す関数
var getUsers = function (callback) {
    setTimeout(function () {
        callback (null, [
            {
                id: 1,
                name: 'Takuya Tejima'
            },
            {
                id: 2,
                name: 'Yohei Noda'
            }
        ])
    }, 1000)
}

var userList = {
    template: '#user-list',
    data: function () {
        return {
            loading: false,
            users: function () { return [] },  // 初期値の空配列
            error: null
        }
    },

    // 初期化時にデータを取得する
    created: function () {
        this.fetchData()
    },

    // $routeの変更をwatchすることでルーティングが変更された時に再度データを取得
    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function() {
            this.loading = true

            getUsers((function(err, users) {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.users = users
                }
            }).bind(this))
        }
    }
}

// ルートオプションを渡してルーターインスタンスを生成します
var router = new VueRouter({
    routes: [
        {
            path: '/top',
            component: {
                template: '<div>トップページです。</div>'
            }
        },
        {
            path: '/users',
            component: userList
        }
    ]
})

var app = new Vue({
    router: router
}).$mount('#app')
