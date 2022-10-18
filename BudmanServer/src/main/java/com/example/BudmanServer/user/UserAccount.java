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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document
public class UserAccount implements UserDetails{
    @Id
    private String id;
    @Indexed( unique = true)
    @NotBlank
    @Size(max = 20)
    private String username;
    @NotBlank
    @Size(max = 120)
    private String password;
    @DBRef
    private List<Account> accounts;

    @DBRef // roles do not appear twice pog
    private Set<Role> roles = new HashSet<>();
    @Transient
    public static final String SEQUENCE_NAME = "categories_sequence";


    private List<Category> categories;
    private LocalDateTime dateCreated;

    public UserAccount(List<Category> categories,
                       String username,
                       String password,
                       LocalDateTime dateCreated) {
        this.categories = categories;
        this.username = username;
        this.password = password;
        this.dateCreated = dateCreated;
    }

    public UserAccount(String username, String password, LocalDateTime dateCreated) {
        this.username = username;
        this.password = password;
        this.dateCreated = dateCreated;
        this.categories = List.of(new Category());
        this.categories.get(0).setId(0);
    }
    public UserAccount(){

    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(ERole.ROLE_USER.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
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


