/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const method = options.method;
    let url = options.url;
    const xhr = new XMLHttpRequest();

    xhr.responseType = "json";
    const formData = new FormData();
    if (method === "GET") {
        const urlParams = Object.entries(option.data).map(([key, value]) => `${key} = ${value}`).join('&');
        url = `${url}?${urlParams}`;
    } else {
        for (let prop in options.data) {
            if (options.data.hasOwnProperty(prop)) {
                formData.append(prop, options.data[prop]);
            }
        }
    }

    xhr.open(method, url);

    xhr.send(formData);

    xhr.onload = () => {
        const response = xhr.response;

        options.callback(null, response);
    }

    xhr.onerror = () => {
        const err = new Error("Bad request");
        options.callback(err);
    }
};
