package com.example.BudmanServer.account;

import com.example.BudmanServer.transaction.Transaction;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Account {
    @Id
    private String id;
    private String userId;
    private String name;
    private BigDecimal balance;
    private Boolean active;
    private LocalDateTime dateCreated;
    public Account(String name) {
        this.name = name;
        this.dateCreated = LocalDateTime.now();
        this.active = true;
        this.balance = BigDecimal.valueOf(0);
    }
}
