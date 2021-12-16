/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static URL = '/user';
    static setCurrent(user) {
        console.log(user);
        window.localStorage.user = JSON.stringify(user);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        window.localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        const currentUser = window.localStorage.user;
        if (currentUser) {
            try {
                return JSON.parse(currentUser);
            } catch {
                return null;
            }
        }
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(data, callback) {
        createRequest({
            method: 'GET',
            URL: this.URL + '/current',
            body: data
        }, response => {
            this.setCurrent(response.user);
            callback();
        });
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        createRequest({
            url: this.URL + '/login',
            method: 'POST',
            responseType: 'json',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        createRequest({
            method: 'POST',
            URL: this.URL + '/register',
            body: data
        }, response => {
            this.setCurrent(response.user);
            callback(response);
        });
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(data, callback) {
        createRequest({
            method: 'POST',
            URL: this.URL + '/logout',
            body: data
        }, () => {
            this.unsetCurrent();
            App.setState('init');
        });
    }
}
