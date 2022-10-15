package com.example.BudmanServer.user;

import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.account.AccountService;
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
    @GetMapping("/{id}")
    UserAccount getUser(@PathVariable String id) {
        return userService.findUserById(id);
    }

    @PutMapping("/categories/add/")
    Optional<UserAccount> deleteUserCategory(@RequestParam String category) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd==null)
            return Optional.empty();
        return userService.addUserCategory(xd.getId(), category);
    }

    @PutMapping("/categories/delete/{category}")
    Optional<UserAccount> deleteUserCategory(@PathVariable Integer category) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd==null)
            return Optional.empty();
        return userService.deleteUserCategory(xd.getId(), category);
    }

    @PutMapping("/categories/update")
    Optional<UserAccount> updateUserCategory( Integer category, String categoryName) {
        UserAccount xd = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(xd==null)
            return Optional.empty();
        return userService.updateUserCategory(xd.getId(), category, categoryName);
    }




}