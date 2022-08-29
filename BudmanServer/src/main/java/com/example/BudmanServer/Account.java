package com.example.BudmanServer;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Account {
    @Id
    private String id;
    @DBRef
    private User user;
    private String name;
    private Integer balance;
    private LocalDateTime dateCreated;
    public Account(User userId, String name, Integer balance, LocalDateTime dateCreated) {
        this.user = userId;
        this.name = name;
        this.balance = balance;
        this.dateCreated = dateCreated;
    }
}
