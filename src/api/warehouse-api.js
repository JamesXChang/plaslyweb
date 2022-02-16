export function user(token) {
  return fetch('http://140.114.79.95:8080/warehouse/user', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function basic(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/basic', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function category(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/category', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function product(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/product', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}


export function manu(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/manu', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function tag(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/tag', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function pieChartStatus(token) {
  return fetch('http://140.114.79.95:8080/warehouse/status', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function status(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/status', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function getStoreHeader(token) {
  return fetch('http://140.114.79.95:8080/warehouse/storeHeader', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function postStoreHeader(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/storeHeader', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function postStorage(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/storage', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function getSaleHeader(token) {
  return fetch('http://140.114.79.95:8080/warehouse/saleHeader', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function postSaleHeader(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/saleHeader', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function postSales(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/sales', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function uploadProduct(token, formData) {
  return fetch('http://140.114.79.95:8080/warehouse/product-xlsx', {
    method: 'POST',
    body: formData,
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function getProductFileList(token) {
  return fetch('http://140.114.79.95:8080/warehouse/product-xlsx', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function getProductExample(token) {
  return fetch('http://140.114.79.95:8080/warehouse/product-xlsx-example', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.blob();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function postProductFile(token, data) {
  return fetch('http://140.114.79.95:8080/warehouse/product-xlsx-file', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.blob();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function deleteStorage(token, target) {
  return fetch('http://140.114.79.95:8080/warehouse/storage-delete', {
    method: 'POST',
    body: JSON.stringify(target),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}

export function getNewestStorage(token) {
  return fetch('http://140.114.79.95:8080/warehouse/newest-storage', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status}`);
    }
  })
  .catch(error => {
    console.log('Error: ', error);
  })
}