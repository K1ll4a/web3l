package com.k1ll4a.service;

import com.k1ll4a.dao.HitDao;
import com.k1ll4a.model.Hit;
import com.k1ll4a.model.HitEntity;

/**
 * Бизнес-логика проверки попадания точки в область
 */
public class GeometryServiceLogic {

    private final HitDao hitDao = new HitDao();

    /**
     * Проверка попадания точки и сохранение результата
     */
    public Hit check(Hit hit, String username) {

        double x = hit.getX();
        double y = hit.getY();
        double r = hit.getR();

        boolean result = checkArea(x, y, r);

        // Сохраняем в БД как Entity
        HitEntity entity = new HitEntity(
                username,
                x,
                y,
                r,
                result
        );
        entity = hitDao.save(entity); // Получаем entity с присвоенным id

        // Возвращаем Hit с данными из сохраненной entity
        return new Hit(
                entity.getId(),
                entity.getX(),
                entity.getY(),
                entity.getR(),
                entity.isHit(),
                entity.getCreatedAt()
        );
    }

    /**
     * Геометрическая проверка области
     */
    private boolean checkArea(double x, double y, double r) {

        // 1 квадрант — четверть круга
        if (x >= 0 && y >= 0) {
            return (x * x + y * y) <= (r * r);
        }

        // 2 квадрант — прямоугольник
        if (x <= 0 && y >= 0) {
            return x >= -r && y <= r / 2;
        }

        // 4 квадрант — треугольник
        if (x >= 0 && y <= 0) {
            return y >= x - r;
        }

        // 3 квадрант — пусто
        return false;
    }
}
