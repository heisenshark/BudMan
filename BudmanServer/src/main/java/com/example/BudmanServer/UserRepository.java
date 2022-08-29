package com.example.BudmanServer;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository
        extends MongoRepository<User,String> {
    Optional<User> findUsersByLogin(String login);
}
