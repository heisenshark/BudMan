package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction,String>, PagingAndSortingRepository<Transaction,String> {
    List<Transaction> findTransactionsByAccountIdInAndCategoryIdInAndDateBetween (Collection<String> account_id, Collection<Integer> categoryId, LocalDateTime date, LocalDateTime date2);
    Page<Transaction> findTransactionsByAccountIdInAndCategoryIdInAndDateBetween (Collection<String> account_id, Collection<Integer> categoryId, LocalDateTime date, LocalDateTime date2,Pageable pageable);
    List<Transaction> findTransactionsByAccountIdInAndCategoryIdIn (Collection<String> account_id, Collection<Integer> categoryId);
    Page<Transaction> findTransactionsByAccountIdInAndCategoryIdIn (Collection<String> account_id, Collection<Integer> categoryId,Pageable pageable);
    List<Transaction> findByAccountIdIn(Collection<String> account_id);
    List<Transaction> findByAccountId(String accountId);
    List<Transaction> findByAccountIdInAndCategoryIdIn(Collection<String> accountId, Collection<Integer> categoryId);
}
