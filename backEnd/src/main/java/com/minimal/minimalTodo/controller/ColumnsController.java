package com.minimal.minimalTodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minimal.minimalTodo.model.Columns;
import com.minimal.minimalTodo.repository.ColumnsRepository;

import java.util.List;

@RestController
public class ColumnsController {
    
    private final ColumnsRepository todoColsRepository;

    @Autowired
    public ColumnsController(ColumnsRepository todoColsRepository) {
        this.todoColsRepository = todoColsRepository;
    }

    @GetMapping("/columns")
    public List<Columns> columns() {
        return todoColsRepository.findAll();
    }
}
