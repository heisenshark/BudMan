package com.example.BudmanServer.transaction;

import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.transaction.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction,String>, PagingAndSortingRepository<Transaction,String> {
    List<Transaction> findTransactionsByAccount_IdInAndCategoryIdInAndDateBetween (Collection<String> account_id, Collection<Integer> categoryId, LocalDateTime date, LocalDateTime date2);
    List<Transaction> findTransactionsByAccount_IdInAndCategoryIdIn (Collection<String> account_id, Collection<Integer> categoryId);

}
