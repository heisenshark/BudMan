package com.example.BudmanServer.transaction;

import com.example.BudmanServer.Category;
import com.example.BudmanServer.account.Account;
import com.example.BudmanServer.auth.UserDetailsImpl;
import com.example.BudmanServer.user.ERole;
import com.example.BudmanServer.user.Role;
import com.example.BudmanServer.user.UserAccount;
import com.example.BudmanServer.user.UserService;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/transactions")
@Validated
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
public class TransactionController {
    private TransactionService transactionService;
    private UserService userService;

    @CrossOrigin
    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    List<Transaction> getTransactions() {
        return transactionService.getTransactions();
    }

    @GetMapping("/filter")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @Validated
    ResponseEntity<List<Transaction>> getTransactions(
            @RequestBody TransactionRequestBody payload) {
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = userService.findUserById(u.getId());

        if (new HashSet<>(currentUser.getAccounts().stream().map(Account::getId).toList()).containsAll(payload.getAccounts())
         && new HashSet<>(currentUser.getCategories().stream().map(Category::getId).toList()).containsAll(payload.categories)
        )
            return new ResponseEntity<>
                    (transactionService.getTransactions(payload.getAccounts().stream().toList(), payload.getCategories().stream().toList()), HttpStatus.OK);
        else
            return new ResponseEntity<>(List.of(), HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/filterdate")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    ResponseEntity<List<Transaction>> getTransactionsWithDate(@RequestBody TransactionRequestBody payload) {
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = userService.findUserById(u.getId());

        if ((new HashSet<>(currentUser.getAccounts().stream().map(Account::getId).toList()).containsAll(payload.getAccounts())
                && new HashSet<>(currentUser.getCategories().stream().map(Category::getId).toList()).containsAll(payload.categories)
                || currentUser.getRoles().stream().map(Role::getName).toList().contains(ERole.ROLE_ADMIN))
        )
            if (payload.getDateEnd() == null || payload.getDateStart() == null)
                return new ResponseEntity<>
                        (transactionService
                                .getTransactions(
                                        payload.getAccounts(),
                                        payload.getCategories()
                                ), HttpStatus.OK);

            else
                return new ResponseEntity<>
                        (transactionService
                                .getTransactions(
                                        payload.getAccounts(),
                                        payload.getCategories(),
                                        payload.getDateStart(),
                                        payload.getDateEnd()
                                ), HttpStatus.OK);
        else
            return new ResponseEntity<>(List.of(), HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/filter/pagination")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @Validated
    ResponseEntity<Map<String, Object>> getTransactionsWithDate
            (@RequestBody TransactionRequestBody payload,
             @RequestParam(value = "page", defaultValue = "0")  @Min(0) int page,
             @RequestParam(value = "size", defaultValue = "10") @Max(200) @Min(0) int size) {
        Pageable paging = PageRequest.of(page, size);
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = userService.findUserById(u.getId());

        if ((new HashSet<>(currentUser.getAccounts().stream().map(Account::getId).toList()).containsAll(payload.getAccounts())
                && new HashSet<>(currentUser.getCategories().stream().map(Category::getId).toList()).containsAll(payload.categories)
                || currentUser.getRoles().stream().map(Role::getName).toList().contains(ERole.ROLE_ADMIN))
        ) {
            var pagetrans = transactionService
                    .getTransactionsPaged(
                            payload.getAccounts(),
                            payload.getCategories(),
                            payload.getDateStart(),
                            payload.getDateEnd(),
                            paging
                    );
            Map<String, Object> response = new HashMap<>();
            response.put("transactions", pagetrans.stream().toList());
            response.put("currentPage", pagetrans.getNumber());
            response.put("totalItems", pagetrans.getTotalElements());
            response.put("totalPages", pagetrans.getTotalPages());
            return new ResponseEntity<>
                    (response, HttpStatus.OK);
        } else
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleInvalidArgument(ConstraintViolationException ex){
        Map<String,String> response = new HashMap<String, String>() ;
        ex.getConstraintViolations().forEach(
                n->{
                    response.put( n.getPropertyPath().toString(),n.getMessage());
                }
        );
        return response;
    }

    @PutMapping("/add")
    ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = userService.findUserById(u.getId());
        if (currentUser.getAccounts().stream().map(Account::getId).toList().contains(transaction.getAccountId())) {
            return new ResponseEntity<>((Transaction) transactionService.addTransactionRefactored(transaction).orElse(null), HttpStatus.OK);
        } else
            return new ResponseEntity<>((Transaction) null, HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/update"
            , method = RequestMethod.PUT
            , consumes = "application/json"
            , produces = "application/json")
    ResponseEntity<Transaction> updateTransaction(@RequestBody Transaction transaction) {
        UserAccount currentUser = (UserAccount) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getAccounts().stream().map(Account::getId).toList().contains(transaction.getAccountId())) {
            var xdd = transactionService.updateTransactionRefactored(transaction);
            if (xdd.isEmpty())
                return new ResponseEntity<>((Transaction) null, HttpStatus.UNAUTHORIZED);
            else
                return new ResponseEntity<>(xdd.get(), HttpStatus.OK);
        } else
            return new ResponseEntity<>((Transaction) null, HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/delete/{transactionId}")
        //@PreAuthorize("@securityService.CanTransDelete(authentication.principal.getId(),#transactionId)")
    ResponseEntity<String> deleteTransaction(@PathVariable String transactionId) {
        UserDetailsImpl u = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var currentUser = userService.findUserById(u.getId());
        var transaction = transactionService.getTransaction(transactionId);
        if (transaction.isPresent()
                && currentUser.getAccounts().stream().map(Account::getId).toList().contains(transaction.get().getAccountId())) {
            var xdd = transactionService.deleteTransaction(currentUser.getId(), transactionId);
            if (xdd == null)
                return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
            else
                return new ResponseEntity<>(xdd, HttpStatus.OK);
        } else
            return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/getSomething"
            , method = RequestMethod.POST
            , consumes = "application/json"
            , produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> getSomething(@RequestBody String f) {
        return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
