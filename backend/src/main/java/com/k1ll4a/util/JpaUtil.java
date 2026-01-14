package com.k1ll4a.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.util.logging.Logger;

public class JpaUtil {
    private static final Logger logger = Logger.getLogger(JpaUtil.class.getName());
    private static final EntityManagerFactory emf;

    static {
        EntityManagerFactory factory = null;
        int retries = 10; // Количество попыток
        int delay = 5000; // Пауза между попытками (5 секунд)

        for (int i = 0; i < retries; i++) {
            try {
                logger.info("Попытка подключения к БД #" + (i + 1));
                factory = Persistence.createEntityManagerFactory("web3lPU");
                logger.info("Успешное подключение к базе данных!");
                break; // Выходим из цикла, если успешно
            } catch (Exception e) {
                logger.warning("БД пока недоступна: " + e.getMessage());
                if (i == retries - 1) {
                    logger.severe("Не удалось подключиться к БД после " + retries + " попыток.");
                    throw e; 
                }
                try {
                    Thread.sleep(delay);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        emf = factory;
    }

    public static EntityManager getEntityManager() {
        if (emf == null) {
            throw new IllegalStateException("EntityManagerFactory не инициализирована");
        }
        return emf.createEntityManager();
    }
}