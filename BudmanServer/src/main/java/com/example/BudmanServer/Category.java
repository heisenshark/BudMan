package com.example.BudmanServer;

import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
public class Category {
    @Id
    private Integer id;//took an L, cant really make this stuff auto increment at adding it to embeded doc
    private String name;
    private Boolean status;
    private LocalDateTime dateCreated;

    public Category(Integer id,String name, Boolean status) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.dateCreated = LocalDateTime.now();
    }

    public Category() {//kinda dangerous but good I guess
        this.name = "DefaultCategory";
        this.status = false;
        this.dateCreated = LocalDateTime.now();
    }
}
