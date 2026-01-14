package com.k1ll4a.service;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {

    public String hash(String plain) {
        return BCrypt.hashpw(plain, BCrypt.gensalt(10));
    }

    public boolean verify(String plain, String hash) {
        if (hash == null) return false;
        return BCrypt.checkpw(plain, hash);
    }
}