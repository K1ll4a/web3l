package com.k1ll4a.service;

import com.k1ll4a.dao.UserDao;
import com.k1ll4a.model.User;
import com.k1ll4a.model.UserEntity;

public class AuthService {

    private final UserDao userDao = new UserDao();

    public boolean register(User user) {
        if (userDao.exists(user.getUsername())) {
            return false;
        }

        UserEntity entity = new UserEntity(
                user.getUsername(),
                user.getPasswordHash()
        );

        userDao.save(entity);
        return true;
    }

    public boolean login(User user) {
        UserEntity entity = userDao.find(user.getUsername());
        if (entity == null) {
            return false;
        }

        return entity.getPasswordHash().equals(user.getPasswordHash());
    }

    public boolean userExists(String username) {
        return userDao.exists(username);
    }
}
