package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.user.UserRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/transactions")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@AllArgsConstructor
public class TransactionController {
    private TransactionService transactionService;




    @CrossOrigin
    @GetMapping("/")
    //@PreAuthorize("hasRole('ADMIN')")
    List<Transaction> getTransactions(){
        return transactionService.getTransactions();
    }

//    @GetMapping("/filter")
//    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories, LocalDateTime start, LocalDateTime end){
//        return transactionService
//                .getTransactions(
//                        accounts,
//                        categories,
//                        start,
//                        end
//                );
//    }

    @GetMapping("/filter")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @PreAuthorize("hasRole('ADMIN') or @securityService.ValidateFilter(authentication.principal.getId(),#accounts,#categories)")
    List<Transaction> getTransactions(
                                     @RequestParam Set<String> accounts,
    @RequestParam Set<Integer> categories){
        return transactionService
                .getTransactions(
                        accounts.stream().toList(),
                        categories.stream().toList()
                );
    }
    @GetMapping("/filter2")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @PreAuthorize("hasRole('ADMIN') or @securityService.ValidateFilter(authentication.principal.getId(),#accounts,#categories)")
    List<Transaction> getTransactions(
                                     @RequestParam Set<String> accounts,
    @RequestParam Set<Integer> categories,@RequestBody LocalDateTime dateStart,@RequestBody LocalDateTime dateEnd){
        return transactionService
                .getTransactions(
                        accounts.stream().toList(),
                        categories.stream().toList(),
                        dateStart,
                        dateEnd
                );
    }

}
