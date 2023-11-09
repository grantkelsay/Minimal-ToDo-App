package com.minimal.minimalTodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minimal.minimalTodo.model.Tasks;
import com.minimal.minimalTodo.repository.TasksRepository;

import java.util.List;

@RestController
public class TasksController {
    
    private final TasksRepository todoTasksRepository;

    @Autowired
    public TasksController(TasksRepository todoTasksRepository) {
        this.todoTasksRepository = todoTasksRepository;
    }

    @GetMapping("/tasks")
    public List<Tasks> tasks() {
        return todoTasksRepository.findAll();
    }

}
