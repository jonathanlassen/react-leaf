import { authHeader } from './AuthHeader';


export const userService = {
    login,
    logout,
    getAll,
    register,
    claim,
    update
};


function claim(name, telephone, address, url, zip, id, user, description, statecode, city ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, telephone, address, url, zip, id, user, description, statecode, city })
    };

    return fetch(`http://localhost:3000/api/claim`, requestOptions)
    .then(handleResponse)
    .then(claim => {
        localStorage.setItem('user', JSON.stringify(claim));
       
    });

}

function update(name, telephone, address, url, zip, id, user, description,statecode, city ) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, telephone, address, url, zip, id, user, description, statecode, city })
    };

    return fetch(`http://localhost:3000/api/shop`, requestOptions)
    .then(handleResponse)
    .then(claim => {
       
       
    });

}

function logout() {
    localStorage.removeItem('user');
    return;
}


function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:3000/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}
function register(username, password, email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email})
    };

    return fetch(`http://localhost:3000/api/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}