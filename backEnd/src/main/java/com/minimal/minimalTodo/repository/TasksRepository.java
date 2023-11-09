package com.minimal.minimalTodo.repository;

import org.springframework.stereotype.Repository;
import com.minimal.minimalTodo.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer>{
    
}
