/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
    /**
     * Получает информацию о счёте
     * */
    static get(id = '', callback) {
        return createRequest({
            method: 'GET',
            URL: this.URL,
            body: data
        }, callback);
    }
}
