package com.example.BudmanServer.account;

import com.example.BudmanServer.auth.UserDetailsImpl;
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
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class AccountController {
    AccountService accountService;
    UserService userService;
    @GetMapping("/")
    List<Account> getUserAccounts() {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser!=null && !currentUser.getId().isEmpty())
            return userService.getUserAccounts(currentUser.getId());
        else
            return null;
    }

    @PostMapping("/add")
    Optional<Account> addUserAccount( @RequestParam String accountName) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser!=null && !currentUser.getId().isEmpty())
            return accountService.addUserAccount(currentUser.getId(),accountName);
        else
            return Optional.empty();
    }

    @DeleteMapping("/delete/{accountId}")
    Optional<Account> deleteUserAccount(@PathVariable String accountId) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser!=null && !currentUser.getId().isEmpty())
            return accountService.deleteUserAccount(currentUser.getId(),accountId);
        else
            return Optional.empty();

    }

    @PutMapping("/update/{accountId}")
    Optional<Account> updateUserAccount(@PathVariable String accountId, @RequestParam String accountName,@RequestParam Boolean active) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser!=null && !currentUser.getId().isEmpty())
            return accountService.updateUserAccount(currentUser.getId(), accountId, accountName,active);
        else
            return Optional.empty();
    }

}
