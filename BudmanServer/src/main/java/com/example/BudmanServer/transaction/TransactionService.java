package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class TransactionService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;


    public  Optional<Transaction> addTransaction(String id, String accountId, Transaction transaction) {
        var user = userRepository.findById(id);
        var account = accountRepository.findById(accountId);
        if(user.isEmpty()
                || account.isEmpty()
                || user.get().getAccounts().stream().noneMatch(n ->n.getId().equals(accountId)))
            return Optional.empty();
        transaction.setAccount(account.get());
        transactionRepository.insert(transaction);

        return Optional.of(transaction);
    }
    public String deleteTransaction(String id, String accountId, String transactionId) {
        var user = userRepository.findById(id);
        var account = accountRepository.findById(accountId);
        var transaction = transactionRepository.findById(transactionId);
        if(user.isEmpty()
                || account.isEmpty()
                || transaction.isEmpty()
                || user.get().getAccounts().stream().noneMatch(n ->n.getId().equals(accountId))
                || !transaction.get().getAccount().getId().equals(accountId)
        ) return "";

        transactionRepository.deleteById(transactionId);
        return transactionId;
    }

    public  Optional<Transaction> updateTransaction(String id, String accountId,String transactionId, Transaction transaction) {
        var user = userRepository.findById(id);
        var account = accountRepository.findById(accountId);
        var transBefore = transactionRepository.findById(transactionId);
        if(user.isEmpty()
                || account.isEmpty()
                || transBefore.isEmpty()
                || user.get().getAccounts().stream().noneMatch(n ->n.getId().equals(accountId))
                || !transBefore.get().getAccount().getId().equals(accountId)
        ) return Optional.empty();
        var transval = transBefore.get();
        transval.setAmount(transaction.getAmount());
        transval.setCategoryId(transaction.getCategoryId());
        transval.setDate(transaction.getDate());
        transval.setName(transaction.getName());
        transval.setAccount(account.get());
        transactionRepository.save(transval);
        return Optional.of(transval);
    }

    List<Transaction> getTransactions(){
        return transactionRepository.findAll();
    }

    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories, LocalDateTime start, LocalDateTime end){
        return transactionRepository
                .findTransactionsByAccount_IdInAndCategoryIdInAndDateBetween(
                        accounts,
                        categories,
                        start,
                        end
                );
    }
    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories){
        return transactionRepository
                .findTransactionsByAccount_IdInAndCategoryIdIn(
                        accounts,
                        categories
                );
    }

}
