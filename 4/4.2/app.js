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

// 認証メソッド
var Auth = {
    login: function (email, pass, cb) {
        // ダミーデータを使った擬似ログイン
        setTimeout( function () {
            if (email === 'vue@example.com' && pass === 'vue') {
                // ログイン成功時はローカルストレージにtokenを保存する
                localStorage.token = Math.random().toString(36).substring(7)
                if (cb) {
                    cb(true)
                } else {
                    cb(false)
                }
            }
        }, 0)
    },

    logout: function () {
        delete localStorage.token
    },

    loggedIn: function () {
        // ローカルストレージにtokenがあればログイン状態とみなす
        return !!localStorage.token
    }
}

// JSONを返す関数
var getUsers = function (callback) {
    setTimeout(function () {
        callback (null, userData)
    }, 1000)
}

var getUser = function (userId, callback) {
    setTimeout(function () {
        var filteredUsers = userData.filter(function (user) {
            return user.id === parseInt(userId, 10)
        })
        callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
}

// 新規ユーザ作成メソッド
var postUser = function (params, callback) {
    setTimeout(function () {
        params.id = userData.length + 1 // idは追加されるごとに自動increment
        userData.push(params)
        callback(null, params)
    }, 1000)
}

var UserList = {
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

var UserCreate = {
    template: '#user-create',
    data: function () {
        return {
            sending: false,
            user: this.defaultUser(),
            error: null
        }
    },

    created: function () {
    },

    methods: {
        defaultUser: function () {
            return {
                name: '',
                description: ''
            }
        } ,

        createUser: function () {
            if (this.user.name.trim() === '') {
                this.error = 'Nameは必須です'
                return
            }
            if (this.user.description.trim() === '') {
                this.error = 'Descriptionは必須です'
                return
            }

            postUser(this.user, (function (err, user) {
                this.sending = false
                if (err) {
                    this.error = err.toString();
                } else {
                    this.error = null
                    // デフォルトでフォームをリセット
                    this.user = this.defaultUser()
                    alert('新規ユーザーが登録されました')
                    this.$router.push('/users')
                }
            }).bind(this))
        }
    }
}

var UserDetail = {
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

var Login = {
    template: '#login',
    data: function () {
        return {
            email: 'vue@example.com',
            pass: '',
            error: false
        }
    },
    methods: {
        login: function () {
            Auth.login(this.email, this.pass, (function (loggedIn) {
                if (!loggedIn) {
                    this.error = true
                } else {
                    // redirectパラメーターが付いている場合はそのパスに遷移
                    this.$router.replace(this.$route.query.redirect || '/')
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
            component: UserList
        },
        {
            path: '/users/new',
            component: UserCreate,
            beforeEnter: function (to, from, next) {
                if (!Auth.loggedIn()) {
                    next({
                        path: '/login',
                        query: { redirect: to.fullPath}
                    })
                } else {
                    next()
                }
            }
        },
        {
            path: '/users/:userId',
            component: UserDetail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/logout',
            beforeEnter: function (to, from, next) {
                Auth.logout()
                next('/')
            }
        }
    ]
})

var app = new Vue({
    data: {
        Auth: Auth
    },
    router: router
}).$mount('#app')
