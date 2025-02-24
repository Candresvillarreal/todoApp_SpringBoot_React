import { apiClient } from './ApiClient';

export const retrieveHelloWorldBean = () => apiClient.get('http://localhost:8080/hello-world-bean');

/*
export const retrieveHelloWorldPathVariable = (username) => apiClient.get(`http://localhost:8080/hello-world/path-variable/${username}`,{
    headers: {
        'Authorization': 'Basic Q2FybG9zOmR1bW15 '
    }
});
*/

export const retrieveHelloWorldPathVariable = (username, token) => apiClient.get(`http://localhost:8080/hello-world/path-variable/${username}`
// ,{
//    headers: {
//        Authorization: token
//    }
//}
);

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    headers: {
        'Authorization': token
    }
});
