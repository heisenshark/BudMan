package com.example.BudmanServer;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Document
public class User {
    @Id
    private String id;
    private String name;
    private List<Category> categories;
    @Indexed( unique = true)
    private String login;
    private String password;
    private LocalDateTime dateCreated;

    public User(String name,
                List<Category> categories,
                String login,
                String password,
                LocalDateTime dateCreated) {
        this.name = name;
        this.categories = categories;
        this.login = login;
        this.password = password;
        this.dateCreated = dateCreated;
    }
}
