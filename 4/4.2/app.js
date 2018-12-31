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

var userData = [
    {
        id: 1,
        name: 'Takuya Tejima',
        description: '東南アジアで働くエンジニアです。'
    },
    {
        id: 2,
        name: 'Yohei Noda',
        description: 'アウトドア・フットサルが趣味のエンジニアです。'
    }
]

var getUser = function (userId, callback) {
    setTimeout(function () {
        var filteredUsers = userData.filter(function (user) {
            return user.id === parseInt(userId, 10)
        })
        callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
}

var userDetail = {
    template: '#user-detail',
    data: function () {
        return {
            loading: false,
            user: null,
            error: null
        }
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        '$route': 'fetchData'
    },

    methods: {
        fetchData: function () {
            this.loading = true
            getUser (this.$route.params.userId, (function (err, user) {
                this.loading = false
                if (err) {
                    this.error = err.toString()
                } else {
                    this.user = user
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
        },
        {
            path: '/users/:userId',
            component: userDetail
        }
    ]
})

var app = new Vue({
    router: router
}).$mount('#app')
