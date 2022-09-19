package com.example.BudmanServer.user;

import com.example.BudmanServer.account.AccountService;
import com.example.BudmanServer.transaction.Transaction;
import com.example.BudmanServer.transaction.TransactionService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/users")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserAccount> fetchAllUsers (){
        System.out.println("AAAAAAA");
        return userService.getAllUsers();
    }
//    @PutMapping("/modify/{id}")
//    public UserAccount modifyUser(@PathVariable String id,
//                                  String login,
//                                  String password){
//        return userService.updateUser(id,login,password) ;
//    }
//    @PostMapping("/add")
//    public String addUser(String login,
//                        String password){
//        return userService.addUser(login,password);
//    }
    @PutMapping("/{id}/category/add")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> addUserCategory(@PathVariable String id, String category){
        return userService.addUserCategory(id,category);
    }
    @PutMapping("/{id}/category/delete")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> deleteUserCategory(@PathVariable String id, Integer category){
        return userService.deleteUserCategory(id,category);
    }
    @PutMapping("/{id}/category/modify")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> updateUserCategory(@PathVariable String id, Integer category, String categoryName){
        return userService.updateUserCategory(id,category,categoryName);
    }

    @PutMapping("/{id}/account/add")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> addUserAccount(@PathVariable String id,@RequestParam @NonNull @NotBlank String account){
        return accountService.addUserAccount(id,account);
    }

    @PutMapping("/{id}/account/delete")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> deleteUserAccount(@PathVariable String id, String accountId){
        return accountService.deleteUserAccount(id,accountId);
    }
    @PutMapping("/{id}/account/update")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<UserAccount> updateUserAccount(@PathVariable String id, String accountId, String accountName){
        return accountService.updateUserAccount(id,accountId,accountName);
    }

    @PutMapping("/{id}/account/{accountId}/add")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<Transaction> addTransaction(@PathVariable String id, @PathVariable String accountId, @RequestBody Transaction transaction){
        return transactionService.addTransaction(id,accountId,transaction);
    }

    @PutMapping("/{id}/{accountId}/delete")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    String deleteTransaction(@PathVariable String id, @PathVariable String accountId,String transactionId){
        return transactionService.deleteTransaction(id,accountId,transactionId);
    }

    @PutMapping("/{id}/{accountId}/update")
    @PreAuthorize("authentication.principal.getId().equals(#id)")
    Optional<Transaction> updateTransaction(@PathVariable String id, @PathVariable String accountId,String transactionId,@RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,accountId,transactionId,transaction);
    }

}