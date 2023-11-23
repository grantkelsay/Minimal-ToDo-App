package com.minimal.minimalTodo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.minimal.minimalTodo.model.Columns;
import com.minimal.minimalTodo.model.Tasks;
import com.minimal.minimalTodo.model.Users;
import com.minimal.minimalTodo.repository.ColumnsRepository;
import com.minimal.minimalTodo.repository.TasksRepository;
import com.minimal.minimalTodo.repository.UsersRepository;


@Configuration
public class MinimalTodoApplicationInitializer {

    @Bean
    CommandLineRunner initializeData(TasksRepository taskrepo, ColumnsRepository colrepo, UsersRepository userrepo) {
        return args -> {

            Users user1 = new Users("Sophia", "Sophia30");
            Users user2 = new Users("Grant", "12345");

            userrepo.save(user1);
            userrepo.save(user2);

            Columns col1 = new Columns(1, false, "Todo", user1);
            Columns col2 = new Columns(2, false, "In Progress", user1);
            Columns col3 = new Columns(3, false, "Complete", user2);
            Columns col4 = new Columns(4, false, "Awaiting Feedback", user2);

            colrepo.save(col1);
            colrepo.save(col2);
            colrepo.save(col3);
            colrepo.save(col4);

            Tasks task1 = new Tasks("#6200EE", 1, "Do the laundry", 1, false, user1);
            Tasks task2 = new Tasks("#6200EE", 2, "Take out trash", 2, false, user2);

            taskrepo.save(task1);
            taskrepo.save(task2);
        };
    }

}
