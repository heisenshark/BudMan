package com.example.BudmanServer.account;

import com.example.BudmanServer.transaction.Transaction;
import com.example.BudmanServer.user.UserAccount;
import com.example.BudmanServer.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/accounts")
@AllArgsConstructor
public class AccountController {
    AccountService accountService;
    UserService userService;
    @GetMapping("/")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    List<Account> getUserAccounts() {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd!=null && !xd.getId().isEmpty())
            return userService.getUserAccounts(xd.getId());
        else
            return null;
    }

    @PostMapping("/add")
    Optional<UserAccount> addUserAccount( @RequestBody String accountName) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd!=null && !xd.getId().isEmpty())
            return accountService.addUserAccount(xd.getId(),accountName);
        else
            return Optional.empty();
    }

    @DeleteMapping("/delete/{accountId}")
    Optional<UserAccount> deleteUserAccount(@PathVariable String accountId) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd!=null && !xd.getId().isEmpty())
            return accountService.deleteUserAccount(xd.getId(), accountId);
        else
            return Optional.empty();
    }

    @PutMapping("/update/{accountId}")
    Optional<UserAccount> updateUserAccount(@PathVariable String accountId, @RequestBody String accountName) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd!=null && !xd.getId().isEmpty())
            return accountService.updateUserAccount(xd.getId(), accountId, accountName);
        else
            return Optional.empty();
    }

}
