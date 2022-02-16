export function register(data) {
    return fetch('http://140.114.79.95:8080/user/account', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

export function login(data) {
    return fetch('http://140.114.79.95:8080/user/login', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}

export function forgetPwd(data) {
    return fetch('http://140.114.79.95:8080/user/forget', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}`);
            }
        })
        .catch(error => {
            console.log('Error: ', error);
        });
}