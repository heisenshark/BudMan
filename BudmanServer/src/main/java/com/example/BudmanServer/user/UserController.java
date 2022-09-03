package com.example.BudmanServer.user;

import com.example.BudmanServer.account.AccountService;
import com.example.BudmanServer.transaction.Transaction;
import com.example.BudmanServer.transaction.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;
    @GetMapping
    public List<User> fetchAllUsers (){
        System.out.println("AAAAAAA");
        return userService.getAllUsers();
    }
    @GetMapping("/elo")
    public String getAnything (){
        System.out.println("AAAAAAA");
        return "Siema elo żelo";
    }
    @PutMapping("/modify/{id}")
    public User modifyUser(@PathVariable String id,
                           String login,
                           String password){
        return userService.updateUser(id,login,password) ;
    }
    @PostMapping("/add")
    public String addUser(String login,
                        String password){
        return userService.addUser(login,password);
    }
    @PutMapping("/{id}/category/add")
    Optional<User> addUserCategory(@PathVariable String id, String category){
        return userService.addUserCategory(id,category);
    }
    @PutMapping("/{id}/category/delete")
    Optional<User> deleteUserCategory(@PathVariable String id, Integer category){
        return userService.deleteUserCategory(id,category);
    }
    @PutMapping("/{id}/category/modify")
    Optional<User> updateUserCategory(@PathVariable String id, Integer category, String categoryName){
        return userService.updateUserCategory(id,category,categoryName);
    }

    @PutMapping("/{id}/account/add")
    Optional<User> addUserAccount(@PathVariable String id, String account){
        return accountService.addUserAccount(id,account);
    }

    @PutMapping("/{id}/account/delete")
    Optional<User> deleteUserAccount(@PathVariable String id, String accountId){
        return accountService.deleteUserAccount(id,accountId);
    }
    @PutMapping("/{id}/account/update")
    Optional<User> updateUserAccount(@PathVariable String id, String accountId, String accountName){
        return accountService.updateUserAccount(id,accountId,accountName);
    }

    @PutMapping("/{id}/{accountId}/add")
    Optional<Transaction> addTransaction(@PathVariable String id, @PathVariable String accountId, @RequestBody Transaction transaction){
        return transactionService.addTransaction(id,accountId,transaction);
    }

    @PutMapping("/{id}/{accountId}/delete")
    String deleteTransaction(@PathVariable String id, @PathVariable String accountId,String transactionId){
        return transactionService.deleteTransaction(id,accountId,transactionId);
    }

    @PutMapping("/{id}/{accountId}/update")
    Optional<Transaction> updateTransaction(@PathVariable String id, @PathVariable String accountId,String transactionId,@RequestBody Transaction transaction){
        return transactionService.updateTransaction(id,accountId,transactionId,transaction);
    }

}