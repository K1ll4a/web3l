package com.k1ll4a.service;

import com.k1ll4a.dao.HitDao;
import com.k1ll4a.model.Hit;
import com.k1ll4a.model.HitEntity;

import java.util.List;
import java.util.stream.Collectors;

public class HistoryServiceLogic {

    private final HitDao hitDao = new HitDao();

    public List<Hit> getHistory(String username) {

        List<HitEntity> entities = hitDao.findByUser(username);

        return entities.stream()
                .map(e -> new Hit(
                        e.getId(),
                        e.getX(),
                        e.getY(),
                        e.getR(),
                        e.isHit(),
                        e.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public void clearHistory(String username) {
        hitDao.clear(username);
    }
}
