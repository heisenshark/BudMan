package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.Account;
import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document
public class Transaction {
    @Id
    @Generated
    private String id;
    @DBRef
    private Account account;
    private String name;
    private BigDecimal amount;
    private Integer categoryId;
    private LocalDateTime date;

    public Transaction(String name, BigDecimal amount,  Integer categoryId, LocalDateTime date,Account account) {
        this.name = name;
        this.amount = amount;
        this.categoryId = categoryId;
        this.date = date;
        this.account = account;
    }

    public Transaction(){

    }
}
