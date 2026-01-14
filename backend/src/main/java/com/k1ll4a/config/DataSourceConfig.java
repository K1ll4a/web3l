package com.k1ll4a.config;

import javax.sql.DataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class DataSourceConfig {

    private static DataSource dataSource;

    public static DataSource getDataSource() {
        if (dataSource == null) {
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl("jdbc:mysql://" + 
                System.getenv().getOrDefault("DB_HOST", "localhost") + ":" + 
                System.getenv().getOrDefault("DB_PORT", "3306") + "/" + 
                System.getenv().getOrDefault("DB_NAME", "web3l"));
            config.setUsername(System.getenv().getOrDefault("DB_USER", "web3l"));
            config.setPassword(System.getenv().getOrDefault("DB_PASSWORD", "web3l"));
            config.addDataSourceProperty("serverTimezone", "UTC");
            dataSource = new HikariDataSource(config);
        }
        return dataSource;
    }
}
