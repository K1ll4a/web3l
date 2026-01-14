package com.k1ll4a.ws;

import com.k1ll4a.model.Hit;
import com.k1ll4a.service.HistoryServiceLogic;
import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;

import java.util.List;

@WebService(serviceName = "HistoryService", targetNamespace = "http://ws.k1ll4a.com/")
public class HistoryService {

    private final HistoryServiceLogic logic = new HistoryServiceLogic();

    @WebMethod
    public List<Hit> getHistory(@WebParam(name = "username") String username) {
        return logic.getHistory(username);
    }

    @WebMethod
    public void clearHistory(@WebParam(name = "username") String username) {
        logic.clearHistory(username);
    }
}
