package com.example.BudmanServer.user;

import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.account.AccountService;
import com.example.BudmanServer.auth.UserDetailsImpl;
import com.example.BudmanServer.transaction.Transaction;
import com.example.BudmanServer.transaction.TransactionService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class UserController {

    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserAccount> fetchAllUsers() {
        System.out.println("AAAAAAA");
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    UserAccount getUser(@PathVariable String id) {
        return userService.findUserById(id);
    }

    @PostMapping("/categories/add")
    Optional<UserAccount> deleteUserCategory(@RequestParam String category) {
        //TODO: tutaj trzeba coś zmienić bo nie działa, z UserAccount na UserDetailsImple
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser==null)
            return Optional.empty();
        return userService.addUserCategory(currentUser.getId(), category);
    }

    @DeleteMapping("/categories/delete/{category}")
    Optional<UserAccount> deleteUserCategory(@PathVariable Integer category) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser==null)
            return Optional.empty();
        return userService.deleteUserCategory(currentUser.getId(), category);
    }

    @PutMapping("/categories/update")
    Optional<UserAccount> updateUserCategory(@RequestParam Integer category,@RequestParam String name) {
        UserDetailsImpl currentUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(currentUser==null)
            return Optional.empty();
        return userService.updateUserCategory(currentUser.getId(), category, name);
    }

}