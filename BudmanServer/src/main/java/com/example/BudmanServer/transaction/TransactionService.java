package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class TransactionService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final MongoTemplate mongoTemplate;

    public Optional<Transaction> addTransaction(String id, String accountId, Transaction transaction) {
        var user = userRepository.findById(id);
        var account = accountRepository.findById(accountId);
        if (user.isEmpty()
                || account.isEmpty()
                || user.get().getAccounts().stream().noneMatch(n -> n.getId().equals(accountId)))
            return Optional.empty();
        transaction.setAccountId(account.get().getId());
        transactionRepository.insert(transaction);

        return Optional.of(transaction);
    }

    public Optional<Transaction> addTransactionRefactored(Transaction transaction) {
        transaction.setId(null);
        var account = accountRepository.findById(transaction.getAccountId());
        if (account.isEmpty())
            return Optional.empty();
        transactionRepository.insert(transaction);
        return Optional.of(transaction);
    }


    public String deleteTransaction(String id, String transactionId) {
        var usr = userRepository.findById(id);
        var tr = transactionRepository.findById(transactionId);

        if (usr.isPresent() && tr.isPresent() && usr.get().getAccounts().stream().map(Account::getId).toList().contains(tr.get().getAccountId())) {
            transactionRepository.deleteById(transactionId);
            return transactionId;
        } else
            return null;
    }

    public Optional<Transaction> updateTransaction(String id, String accountId, Transaction transaction) {
        var user = userRepository.findById(id);
        var account = accountRepository.findById(accountId);
        var transBefore = transactionRepository.findById(transaction.getId());
        if (user.isEmpty()
                || account.isEmpty()
                || transBefore.isEmpty()
                || user.get().getAccounts().stream().noneMatch(n -> n.getId().equals(accountId))
                || !transBefore.get().getAccountId().equals(accountId)
        ) return Optional.empty();
        var transval = transBefore.get();
        transval.setAmount(transaction.getAmount());
        transval.setCategoryId(transaction.getCategoryId());
        transval.setDate(transaction.getDate());
        transval.setName(transaction.getName());
        transval.setAccountId(account.get().getId());
        transactionRepository.save(transval);
        return Optional.of(transval);
    }

    public Optional<Transaction> updateTransactionRefactored(Transaction transaction) {
        var transBefore = transactionRepository.findById(transaction.getId());
        if (
                accountRepository.findById(transaction.getAccountId()).isEmpty() ||
                        transBefore.isEmpty() ||
                        !transBefore.get().getAccountId().equals(transaction.getAccountId())
        ) return Optional.empty();

        var updatedTrans = new Transaction(
                transaction.getName(),
                transaction.getAmount(),
                transaction.getCategoryId(),
                transaction.getDate(),
                transaction.getAccountId()
        );
        updatedTrans.setId(transaction.getId());
        transactionRepository.save(updatedTrans);
        return Optional.of(updatedTrans);
    }

    Optional<Transaction> getTransaction(String id ) {
        return transactionRepository.findById(id);
    }
    List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories, LocalDateTime start, LocalDateTime end) {
        return transactionRepository.findTransactionsByAccountIdInAndCategoryIdInAndDateBetween(
                accounts,
                categories,
                start,
                end);
    }
    Page<Transaction> getTransactionsPaged(List<String> accounts, List<Integer> categories, LocalDateTime start, LocalDateTime end, Pageable pageable ) {

        if(start!=null&&end!=null)
            return transactionRepository.findTransactionsByAccountIdInAndCategoryIdInAndDateBetween(
                accounts,
                categories,
                start,
                end,
                pageable);
        else
            return transactionRepository.findTransactionsByAccountIdInAndCategoryIdIn(
                accounts,
                categories,
                pageable);

    }

    List<Transaction> getTransactions(List<String> accounts, List<Integer> categories) {
        var xd = transactionRepository.findTransactionsByAccountIdInAndCategoryIdIn(
                accounts,
                categories);
        return xd;
    }

    Page<Transaction> getTransactionsPaged(List<String> accounts, List<Integer> categories, Pageable pageable) {
        var xd = transactionRepository.findTransactionsByAccountIdInAndCategoryIdIn(
                accounts,
                categories,
                pageable);
        return xd;
    }

    List<Transaction> getTransactions2(List<String> accounts, List<Integer> categories) {
        var lol = transactionRepository.findByAccountIdIn(accounts);
        return null;
    }


    public Optional<Transaction> findById(String id) {
        return transactionRepository.findById(id);
    }
}
