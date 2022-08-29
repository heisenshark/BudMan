package com.example.BudmanServer;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Transaction {
    @Id
    private String id;
    @DBRef
    private Account account;
    private String name;
    private Integer amount;
    private String category;
    private LocalDateTime date;

    public Transaction(Account account,String name, Integer amount,  String category, LocalDateTime date) {
        this.account = account;
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
}
