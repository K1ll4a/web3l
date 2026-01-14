package com.k1ll4a.ws;

import com.k1ll4a.model.Hit;
import com.k1ll4a.service.GeometryServiceLogic;
import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;

@WebService(serviceName = "GeometryService", targetNamespace = "http://ws.k1ll4a.com/")
public class GeometryService {

    private final GeometryServiceLogic logic = new GeometryServiceLogic();

    @WebMethod
    public Hit checkHit(
            @WebParam(name = "username") String username,
            @WebParam(name = "x") double x,
            @WebParam(name = "y") double y,
            @WebParam(name = "r") double r) {
        Hit hit = new Hit(x, y, r);
        return logic.check(hit, username);
    }
}
