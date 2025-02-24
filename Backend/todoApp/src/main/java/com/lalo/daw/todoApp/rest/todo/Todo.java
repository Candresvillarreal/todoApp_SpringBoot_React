package com.lalo.daw.todoApp.rest.todo;

import java.time.LocalDate;

public class Todo {

    public enum DoneStatus {
        SI, No
    }
    public Todo() {

    }

    public Todo(int id, String username, String description, LocalDate targetDate, DoneStatus done) {
        super();
        this.id = id;
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
        this.done = done;
    }

    private int id;

    private String username;

    private String description;
    private LocalDate targetDate;
    //private boolean done;
    private DoneStatus done;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    //public boolean getDone() {
    //    return done;
    //}

    //public void setDone(boolean done) {
    //    this.done = done;
    //}

    public DoneStatus getDone() {
        return done;
    }

    public void setDone(DoneStatus done) {
        this.done = done;
    }

    @Override
    public String toString() {
        return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", targetDate="
               + targetDate + ", done=" + done + "]";
    }

}
