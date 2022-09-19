package com.example.BudmanServer.account;

import com.example.BudmanServer.user.UserAccount;
import com.example.BudmanServer.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public Optional<UserAccount> addUserAccount(String userId, String name){
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    if( u.getAccounts() == null) u.setAccounts(new ArrayList<Account>());
                    u.getAccounts().stream().filter((n) -> n.getName().equals(name)).findFirst().ifPresentOrElse((a)-> {
                                ;
                            },
                            () -> {
                                var xd = accountRepository.insert(new Account(name));
                                u.getAccounts().add(xd);
                                userRepository.save(u);
                            });
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

    public Optional<UserAccount> deleteUserAccount(String userId, String accountId){
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    if( u.getAccounts() == null)
                        return;
                    u.getAccounts().stream().filter((n) -> n.getId().equals(accountId)).findFirst().ifPresentOrElse((a) -> {
                                a.setActive(false);
                                userRepository.save(u);
                            },null
                    );
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

    public Optional<UserAccount> updateUserAccount(String userId, String accountId, String accountName) {
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    if( u.getAccounts() == null)
                        return;
                    u.getAccounts().stream().filter((n) -> n.getId().equals(accountId)).findFirst().ifPresentOrElse((a) -> {
                                a.setName(accountName);
                                userRepository.save(u);
                            },null
                    );
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

}
