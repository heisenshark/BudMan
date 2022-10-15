package com.example.BudmanServer.user;

import com.example.BudmanServer.Category;
import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.auth.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//import org.springframework.security.core.userdetails.User;
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;

    public List<UserAccount> getAllUsers(){
        return userRepository.findAll();
    }

    public UserAccount updateUser(String userId, String login, String password) {
        var user = userRepository.findById(userId);
        user.ifPresent((u)->{
            u.setUsername(login);
            u.setPassword(password);
            userRepository.save(u);
        });
        return user.orElse(null);
    }

    public String addUser(String login, String password) {
        if(userRepository.findUserByUsername(login).isPresent())
        {
            System.out.println("couldn't add user with login "+login);
            return "";
        }
        else {
            var ussr = new UserAccount(login,password, LocalDateTime.now());
            userRepository.insert(ussr);
            return ussr.getId();
        }
    }
    public Optional<UserAccount> addUserCategory(String userId, String category){
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
                    System.out.println("added category "+ category+" to user "+u.getUsername()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }
    public Optional<UserAccount> deleteUserCategory(String userId, Integer categoryId){
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    var v = u.getCategories();
                    var cat = v.get(categoryId);
                    if(cat!=null)cat.setStatus(false);
                    u.setCategories(v);
                    userRepository.save(u);
                    System.out.println("deleted category "+ cat +"  from user  "+u.getUsername()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

    public Optional<UserAccount> updateUserCategory(String userId, Integer categoryId, String categoryName) {
        var user = userRepository.findById(userId);
        user.ifPresentOrElse(
                (u) -> {
                    var v = u.getCategories();
                    var cat = v.get(categoryId);
                    if(cat!=null)cat.setName(categoryName);
                    u.setCategories(v);
                    userRepository.save(u);
                    System.out.println("deleted category "+ cat +"  from user  "+u.getUsername()+".");
                },
                () -> {
                    System.out.println("user of Id "+userId+" does not exist,");
                }
        );
        return user;
    }

    public UserDetails loadUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }

    public UserAccount findUserById(String id){
        var xd = userRepository.findById(id).orElse(null);
        if(xd ==null)return null;
        xd.setPassword("");
        return xd;
    }
    public UserDetailsImpl findOneById(String id) {
        var u = userRepository.findById(id);
        return u.map(UserDetailsImpl::build).orElse(null);
    }

    public List<Account> getUserAccounts(String id) {
        if(userRepository.findById(id).isPresent())
            return userRepository.findById(id).get().getAccounts();
        return null;
    }
}
