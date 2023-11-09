package com.minimal.minimalTodo.repository;

import org.springframework.stereotype.Repository;
import com.minimal.minimalTodo.model.Columns;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ColumnsRepository extends JpaRepository<Columns, Integer>{
    
}
