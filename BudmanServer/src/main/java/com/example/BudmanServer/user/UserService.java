package com.example.BudmanServer.user;

import com.example.BudmanServer.Category;
import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.account.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User updateUser(String userId, String login, String password) {
        var user = userRepository.findById(userId);
        user.ifPresent((u)->{
            u.setLogin(login);
            u.setPassword(password);
            userRepository.save(u);
        });
        return user.orElse(null);
    }

    public String addUser(String login, String password) {
        if(userRepository.findUserByLogin(login).isPresent())
        {
            System.out.println("couldn't add user with login "+login);
            return "";
        }
        else {
            var ussr = new User(login,password, LocalDateTime.now());
            userRepository.insert(ussr);
            return ussr.getId();
        }
    }
    public Optional<User> addUserCategory(String userId, String category){
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    var v = u.getCategories();
                    var cat = v.stream().filter(n -> n.getName().equals(category)).findFirst();
                    if(cat.isEmpty())
                        v.add(new Category(v.size(), category,true));
                    else cat.ifPresent((n) -> {n.setStatus(true);});
                    u.setCategories(v);
                    userRepository.save(u);
                    System.out.println("added category "+ category+" to user "+u.getLogin()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }
    public Optional<User> deleteUserCategory(String userId, Integer categoryId){
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    var v = u.getCategories();
                    var cat = v.get(categoryId);
                    if(cat!=null)cat.setStatus(false);
                    u.setCategories(v);
                    userRepository.save(u);
                    System.out.println("deleted category "+ cat +"  from user  "+u.getLogin()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

    public Optional<User> updateUserCategory(String userId, Integer categoryId, String categoryName) {
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    var v = u.getCategories();
                    var cat = v.get(categoryId);
                    if(cat!=null)cat.setName(categoryName);
                    u.setCategories(v);
                    userRepository.save(u);
                    System.out.println("deleted category "+ cat +"  from user  "+u.getLogin()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

}
