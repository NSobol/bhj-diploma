/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
    /**
     * Производит регистрацию с помощью User.register
     * После успешной регистрации устанавливает
     * состояние App.setState( 'user-logged' )
     * и закрывает окно, в котором находится форма
     * */
    constructor(element) {
        super(element);
    }

    onSubmit(data) {
        User.register(data, response => {
            App.getForm('register').element.reset();
            App.getModal('register').close();
            App.setState('user-logged');
        });
    }
}
