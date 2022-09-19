package com.example.BudmanServer.auth;

import com.example.BudmanServer.Category;
import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service("securityService")
public class SecurityService {

    @Autowired
    UserService userService;
    Logger logger = LoggerFactory.getLogger(SecurityService.class);
    Authentication authentication;

    public boolean ValidateFilter(String id, List<String> accounts, List<Integer> categories) {
        this.authentication = SecurityContextHolder.getContext().getAuthentication();
        var user = userService.findUserById(id);
        if (user == null) return false;
        var accountsValid = new HashSet<>(user.getAccounts().stream().map(Account::getId).toList()).containsAll(accounts);
        var categoriesValid = new HashSet<>(user.getCategories().stream().map(Category::getId).toList()).containsAll(categories);
        return accountsValid && categoriesValid;
    }

}
