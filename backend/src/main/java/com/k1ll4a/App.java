package com.k1ll4a;

import com.k1ll4a.util.JpaUtil;
import com.k1ll4a.ws.GeometryService;
import com.k1ll4a.ws.HistoryService;
import com.k1ll4a.ws.UserService;
import jakarta.persistence.EntityManager;
import jakarta.xml.ws.Endpoint;

public class App {

    public static void main(String[] args) {

        String host = System.getenv().getOrDefault("BACKEND_HOST", "0.0.0.0");
        String port = System.getenv().getOrDefault("BACKEND_PORT", "8080");
        String baseUrl = "http://" + host + ":" + port + "/ws";

        // ✅ Инициализация JPA
        EntityManager em = JpaUtil.getEntityManager();
        em.close();

        // ✅ Публикация SOAP-сервисов
        Endpoint.publish(baseUrl + "/users", new UserService());
        Endpoint.publish(baseUrl + "/geometry", new GeometryService());
        Endpoint.publish(baseUrl + "/history", new HistoryService());

        System.out.println("SOAP services started at " + baseUrl);
    }
}
