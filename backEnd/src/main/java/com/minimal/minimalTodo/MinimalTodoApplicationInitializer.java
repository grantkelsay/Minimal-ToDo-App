package com.minimal.minimalTodo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.minimal.minimalTodo.model.Columns;
import com.minimal.minimalTodo.model.Tasks;
import com.minimal.minimalTodo.repository.ColumnsRepository;
import com.minimal.minimalTodo.repository.TasksRepository;


@Configuration
public class MinimalTodoApplicationInitializer {

    @Bean
    CommandLineRunner initializeData(TasksRepository taskrepo, ColumnsRepository colrepo) {
        return args -> {
            Columns col1 = new Columns(1, "Todo", false);
            Columns col2 = new Columns(2, "In Progress", false);
            Columns col3 = new Columns(3, "Complete", false);
            Columns col4 = new Columns(3, "Awaiting Feedback", false);

            colrepo.save(col1);
            colrepo.save(col2);
            colrepo.save(col3);
            colrepo.save(col4);

            Tasks task1 = new Tasks(1, 1, "Do the laundry", "#33B234", false);
            Tasks task2 = new Tasks(2, 1, "Take out trash", "#3Dbc43", true);
            Tasks task3 = new Tasks(3, 3, "Walk the dog", "#55g5ad", false);

            taskrepo.save(task1);
            taskrepo.save(task2);
            taskrepo.save(task3);
        };
    }

}
