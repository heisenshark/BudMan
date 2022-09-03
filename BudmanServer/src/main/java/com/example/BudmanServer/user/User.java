package com.example.BudmanServer.user;

import com.example.BudmanServer.Category;
import com.example.BudmanServer.account.Account;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Document
public class User implements UserDetails {
    @Id
    private String id;
    @Indexed( unique = true)
    private String login;
    private String password;
    @DBRef
    private List<Account> accounts;
    private boolean accountNonLocked;

    @Transient
    public static final String SEQUENCE_NAME = "categories_sequence";


    private List<Category> categories;
    private LocalDateTime dateCreated;

    public User(List<Category> categories,
                String login,
                String password,
                LocalDateTime dateCreated) {
        this.categories = categories;
        this.login = login;
        this.password = password;
        this.dateCreated = dateCreated;
    }

    public User(String login, String password, LocalDateTime dateCreated) {
        this.login = login;
        this.password = password;
        this.dateCreated = dateCreated;
        this.categories = List.of(new Category());
        this.categories.get(0).setId(0);
    }
    public User(){

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "read");
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
