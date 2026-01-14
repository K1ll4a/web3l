package com.k1ll4a.dao;

import com.k1ll4a.model.HitEntity;
import com.k1ll4a.util.JpaUtil;
import jakarta.persistence.EntityManager;

import java.util.List;

public class HitDao {

    public HitEntity save(HitEntity hit) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(hit);
            em.getTransaction().commit();
            return hit; // После commit id уже присвоен
        } finally {
            em.close();
        }
    }

    public List<HitEntity> findByUser(String username) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            return em.createQuery(
                    "SELECT h FROM HitEntity h WHERE h.username = :u",
                    HitEntity.class
            ).setParameter("u", username)
             .getResultList();
        } finally {
            em.close();
        }
    }

    public void clear(String username) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.createQuery(
                    "DELETE FROM HitEntity h WHERE h.username = :u"
            ).setParameter("u", username)
             .executeUpdate();
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}
