package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/transactions")
@AllArgsConstructor
public class TransactionController {
    private TransactionService transactionService;


    @CrossOrigin
    @GetMapping("/")
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
    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories){
        return transactionService
                .getTransactions(
                        accounts,
                        categories
                );
    }

}
