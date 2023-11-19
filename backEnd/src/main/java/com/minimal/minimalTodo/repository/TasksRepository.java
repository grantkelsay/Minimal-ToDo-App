package com.minimal.minimalTodo.repository;

import org.springframework.stereotype.Repository;
import com.minimal.minimalTodo.model.Tasks;
import com.minimal.minimalTodo.model.Columns;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Tasks, Integer>{
    List<Tasks> findByColumn(Columns column);
}
