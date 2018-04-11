var app = new Vue({
    el: '#app',
    methods: { 
        openFbLoginDialog () {
            FB.login(this.checkLoginState, { scope: 'email' })
        },
        checkLoginState: function (response) {
            if (response.status === 'connected') {
                FB.api('/me', { fields: 'name,email' }, function(profile) {
                    console.log('Bem vindo ao Fiscaluno, ' + profile.name + '.');
                    console.log(response);
                    show: true;
                    return (profile.name);
                });
            } else if (response.status === 'not_authorized') {
                console.log('ERRO: não autorizado.');
            } else {
                console.log('ERRO: usuário não logado no facebook.');
            }
        }
    }
})