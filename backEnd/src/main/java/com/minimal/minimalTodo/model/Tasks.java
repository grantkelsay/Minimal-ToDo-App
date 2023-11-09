package com.minimal.minimalTodo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;


@Table(name = "todoTasks")
@Entity
public class Tasks {
    
    @Id
    private Integer id;

    @Column(name = "columnId")
    private int columnId;

    @Column(name = "content")
    private String content;

    @Column(name = "backgroundColor")
    private String color;

    @Column(name = "isNew")
    private Boolean isNew;

    public Tasks() {
        this.id = 0;
        this.columnId = 0;
        this.content = "";
        this.color = "";
        this.isNew = false;
    }

    public Tasks(int id, int columnId, String content, String color, Boolean isNew) {
        this.id = id;
        this.columnId = columnId;
        this.content = content;
        this.color = color;
        this.isNew = isNew;
    }

    public int getId() {
        return id;
    }

    public int getColumnId() {
        return columnId;
    }

    public String getContent() {
        return content;
    }

    public String getColor() {
        return color;
    }

    public Boolean getIsNew() {
        return isNew;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setColumnId(int columnId) {
        this.columnId = columnId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }
}
