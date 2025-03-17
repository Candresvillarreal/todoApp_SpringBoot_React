package com.lalo.daw.todoApp.rest.todo.repository;

import com.lalo.daw.todoApp.rest.todo.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

    //Creo los métodos que necesito implementar en TodoJpaResource.java (los que no existen en TodoRepository)

    List<Todo> findByUsername(String username);

}
