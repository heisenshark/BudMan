package com.example.BudmanServer;

import com.example.BudmanServer.account.AccountRepository;
import com.example.BudmanServer.transaction.TransactionRepository;
import com.example.BudmanServer.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class BudmanServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudmanServerApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserRepository userRepository,
							 TransactionRepository transactionRepository,
							 AccountRepository accountRepository,
							 MongoTemplate mongoTemplate
	){
//		return args ->{
//			String login = "edfgdfgdfg";
//			User user = new User(
//					"name",
//					List.of(new Category("catego345ry1",true,LocalDateTime.now()),new Category("cat345egory2",true,LocalDateTime.now())),
//					login,
//					"password",
//					LocalDateTime.now()
//			);
//
//			Query query = new Query();
//			query.addCriteria(Criteria.where("login").is(login));
//
//			var cat = new Category("sdfsdf",true,LocalDateTime.now());
//			var dupa = userRepository.insert(user);
//			var account = accountRepository.insert(new Account(dupa,"asdasd",234,LocalDateTime.now()));
//			var trans = transactionRepository.insert( new Transaction( account,"ccsss",234,cat.getName(),LocalDateTime.now()));
//
//
//			var users = mongoTemplate.find(query,User.class);
//
//
//			//			repository.findUsersByLogin(login).ifPresentOrElse(
////					s ->{
////
////					},
////					() ->{
////
////			}
////
////			);
//
//			if(users.size()>1){
//				throw new IllegalStateException("found many students with that login: "+ login);
//			}else if(users.isEmpty())
//			{
//				System.out.println("inserting user to database...");
//				userRepository.insert(user);
//			}
//			else{
//				System.out.println(user+"\nalready exist");
//			}
//			//repository.insert(user);
//		};
		return null;
	}

}
