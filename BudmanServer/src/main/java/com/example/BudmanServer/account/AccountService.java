package com.example.BudmanServer.account;

import com.example.BudmanServer.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public Optional<Account> addUserAccount(String userId, String name) {
        var user = userRepository.findById(userId);
        if (user.isPresent()) {
            var u = user.get();
            if (u.getAccounts() == null) u.setAccounts(new ArrayList<Account>());
            var xd = accountRepository.insert(new Account(name));
            u.getAccounts().add(xd);
            userRepository.save(u);
            return Optional.of(xd);
        } else {
            System.out.println("user of Id " + userId + " does not exist,");
            return Optional.empty();
        }
    }

    public Optional<Account> deleteUserAccount(String userId, String accountId) {
        var user = userRepository.findById(userId);
        if (user.isEmpty() || user.get().getAccounts().stream().noneMatch(n -> Objects.equals(n.getId(), accountId)))
            return Optional.empty();

        var account = accountRepository.findById(accountId);
        account.ifPresentOrElse(
                (a) -> {
                    a.setActive(false);
                    accountRepository.save(a);
                },
                () -> {
                    System.out.println("account of Id " + accountId + " does not exist,");
                }
        );
        return account;
    }

    public Optional<Account> updateUserAccount(String userId, String accountId, String accountName, Boolean active) {
        var user = userRepository.findById(userId);
        if (user.isEmpty() || user.get().getAccounts().stream().noneMatch(n -> n.getId().equals(accountId)))
            return Optional.empty();

        var account = accountRepository.findById(accountId);
        account.ifPresentOrElse(
                (a) -> {
                    a.setName(accountName);
                    a.setActive(active);
                    accountRepository.save(a);
                },
                () -> {
                    System.out.println("account of Id " + accountId + " does not exist,");
                }
        );

        return account;
    }

}
