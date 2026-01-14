package com.k1ll4a.model;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Hit implements Serializable {

    private Long id;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private LocalDateTime createdAt;

   
    public Hit() {}

    
    public Hit(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    
    public Hit(Long id, double x, double y, double r, boolean hit, LocalDateTime createdAt) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public double getX() { return x; }
    public void setX(double x) { this.x = x; }
    
    public double getY() { return y; }
    public void setY(double y) { this.y = y; }
    
    public double getR() { return r; }
    public void setR(double r) { this.r = r; }
    
    public boolean isHit() { return hit; }
    public void setHit(boolean hit) { this.hit = hit; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
