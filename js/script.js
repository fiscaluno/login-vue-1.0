Vue.component('connected', {
    'template': '<label v-if="$root.connected">Connected using Facebook as {{ $root.userName }}</label>'
});

var app = new Vue({
    el: '#app',
    data() {
        return {
            connected: false,
            userName: null
        }
    },
    methods: {
        openFbLoginDialog () {
            FB.login(this.checkLoginState, { scope: 'email' })
        },
        setUserName(username) {
            this.$root.userName = username
        },
        setConnected() {
            this.$root.connected = true
        },
        checkLoginState: function (response) {
            if (response.status === 'connected') {
                this.setConnected()
                FB.api('/me', { fields: 'name,email' }, (profile) => {
                    this.setUserName(profile.name)
                })
            } else if (response.status === 'not_authorized') {
                console.log('ERRO: não autorizado.');
            } else {
                console.log('ERRO: usuário não logado no facebook.');
            }
        }
    }
})
