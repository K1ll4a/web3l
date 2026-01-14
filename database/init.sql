CREATE DATABASE IF NOT EXISTS web3l
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE web3l;

CREATE TABLE IF NOT EXISTS users (
    username      VARCHAR(64) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS hits (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(64) NOT NULL,
    x          DOUBLE NOT NULL,
    y          DOUBLE NOT NULL,
    r          DOUBLE NOT NULL,
    hit        BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    CONSTRAINT fk_hits_user FOREIGN KEY (username)
    REFERENCES users(username)
    ON DELETE CASCADE
    );
