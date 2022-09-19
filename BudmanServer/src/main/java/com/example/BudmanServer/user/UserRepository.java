package com.example.BudmanServer.user;

import com.example.BudmanServer.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Optional;

public interface UserRepository
        extends MongoRepository<UserAccount,String> {
    Optional<UserAccount> findUserByLogin(String login);
    Boolean existsByLogin(@NotBlank @Size(max = 20) String login);

}
