/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static URL = "";
    static list(data, callback) {
        return createRequest({
            method: 'GET',
            URL: this.URL,
            body: data
        }, callback);
    }

    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create(data, callback) {
        data.append('_method', 'PUT')
        return createRequest({
            method: 'POST',
            URL: this.URL,
            body: data
        }, callback);
    }

    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove(id = '', data, callback) {
        data.append('_method', 'DELETE');
        return createRequest({
            method: 'POST',
            URL: this.URL,
            body: data
        }, callback)
    }
}
