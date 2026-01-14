package com.k1ll4a.dao;

import com.k1ll4a.model.UserEntity;
import com.k1ll4a.util.JpaUtil;
import jakarta.persistence.EntityManager;

public class UserDao {

    public boolean exists(String username) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            return em.find(UserEntity.class, username) != null;
        } finally {
            em.close();
        }
    }

    public void save(UserEntity user) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public UserEntity find(String username) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            return em.find(UserEntity.class, username);
        } finally {
            em.close();
        }
    }
}
