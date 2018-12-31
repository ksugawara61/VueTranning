var userList = {
    template: '#user-list'
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
