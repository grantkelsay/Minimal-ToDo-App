package com.minimal.minimalTodo.repository;

import org.springframework.stereotype.Repository;

import com.minimal.minimalTodo.model.Tasks;
import com.minimal.minimalTodo.model.Users;
import com.minimal.minimalTodo.model.Columns;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer>{
    List<Tasks> findByUser(Users user);
    List<Tasks> findByColumn(Columns column);
}
