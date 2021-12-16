/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
    /**
     * Производит авторизацию с помощью User.login
     * После успешной авторизации, сбрасывает форму,
     * устанавливает состояние App.setState( 'user-logged' ) и
     * закрывает окно, в котором находится форма
     * */
    constructor(element) {
        super(element);
    }

    onSubmit(data) {
        console.log(data);
        User.login(data, () => {
            this.element.reset();
            App.getModal('login').close();
            App.setState('user-logged');
        });
    }
}
