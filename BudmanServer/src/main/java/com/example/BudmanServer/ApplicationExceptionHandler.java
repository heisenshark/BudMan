package com.example.BudmanServer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Map<String,String> handleInvalidArgument(ConstraintViolationException ex){
        Map<String,String> response = new HashMap<String, String>() ;
//        ex.getConstraintViolations().forEach(
//                n->{
//                    response.put( n.getConstraintDescriptor().getMessageTemplate(),n.getMessage());
//                }
//        );
        response.put("kupa","siku");
        return response;
    }
}
