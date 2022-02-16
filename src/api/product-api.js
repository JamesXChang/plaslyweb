export function getHeaderList() {
    return fetch('http://140.114.79.95:8080/ecommerce/header', { 
            method: 'GET',
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

export function getProductList(requirement) {
    return fetch('http://140.114.79.95:8080/ecommerce/data', { 
            method: 'POST',
            body: JSON.stringify(requirement),
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