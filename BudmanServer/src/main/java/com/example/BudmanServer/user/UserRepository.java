package com.example.BudmanServer.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Optional;

public interface UserRepository
        extends MongoRepository<UserAccount,String>{
    Optional<UserAccount> findUserByUsername(String username);
    Boolean existsByUsername(@NotBlank @Size(max = 20) String username);

}
