package com.k1ll4a.ws;

import com.k1ll4a.model.User;
import com.k1ll4a.service.AuthService;
import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;

@WebService(serviceName = "UserService", targetNamespace = "http://ws.k1ll4a.com/")
public class UserService {

    private final AuthService authService = new AuthService();

    @WebMethod
    public boolean register(
            @WebParam(name = "username") String username,
            @WebParam(name = "password") String password) {
        return authService.register(new User(username, password));
    }

    @WebMethod
    public boolean login(
            @WebParam(name = "username") String username,
            @WebParam(name = "password") String password) {
        return authService.login(new User(username, password));
    }

    @WebMethod
    public boolean validateSession(@WebParam(name = "username") String username) {
        return authService.userExists(username);
    }
}
