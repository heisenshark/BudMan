package com.example.BudmanServer.transaction;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TransactionRequestBody {
    List<String> accounts;
    List<Integer> categories;
    LocalDateTime dateStart;
    LocalDateTime dateEnd;
    String userId;
}
