package com.minimal.minimalTodo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Id;

@Table(name = "Tasks")
@Entity
public class Tasks {
    
    @Id
    private Integer id;

    @Column(name = "content")
    private String content;

    @Column(name = "columndId")
    private int columnId;

    @Column(name = "backgroundColor")
    private String color;

    @Column(name = "isNew")
    private Boolean isNew;

    @ManyToOne
    @JoinColumn(name = "userName", referencedColumnName = "userName")
    private Users user;

    public Tasks() {
        this.id = 0;
        this.columnId = 0;
        this.content = "";
        this.color = "";
        this.isNew = false;
        this.user = new Users();
    }

    public Tasks(int id, int columnId, String content, String color, Boolean isNew, Users user) {
        this.id = id;
        this.columnId = columnId;
        this.content = content;
        this.color = color;
        this.isNew = isNew;
        this.user = user;
    }

    public int getId() {
        return id;
    }


    public Users getUser() {
        return user;
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

    public void setUser(Users user) {
        this.user = user;
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
