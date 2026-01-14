package com.k1ll4a.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hits")
public class HitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private double x;
    private double y;
    private double r;
    private boolean hit;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public HitEntity() {}

    public HitEntity(String username, double x, double y, double r, boolean hit) {
        this.username = username;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public double getX() { return x; }
    public double getY() { return y; }
    public double getR() { return r; }
    public boolean isHit() { return hit; }

    // ✅ ОБЯЗАТЕЛЬНЫЙ ГЕТТЕР
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
