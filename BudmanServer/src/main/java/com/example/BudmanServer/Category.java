package com.example.BudmanServer;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Category {
    private String name;
    private Boolean status;
    private LocalDateTime dateCreated;

    public Category(String name, Boolean status, LocalDateTime dateCreated) {
        this.name = name;
        this.status = status;
        this.dateCreated = dateCreated;
    }
}
