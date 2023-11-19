package com.minimal.minimalTodo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import com.minimal.minimalTodo.model.Columns;


@Table(name = "Tasks")
@Entity
public class Tasks {
    
    @Id
    private Integer id;

    @Column(name = "content")
    private String content;

    @Column(name = "backgroundColor")
    private String color;

    @Column(name = "isNew")
    private Boolean isNew;

    @JsonIgnoreProperties("tasks")
    @ManyToOne
    @JoinColumn(name = "columnId", referencedColumnName = "id")
    private Columns column;

    public Tasks() {
        this.id = 0;
        this.column = new Columns();
        this.column.setId(0);
        this.content = "";
        this.color = "";
        this.isNew = false;
    }

    public Tasks(int id, int columnId, String content, String color, Boolean isNew, Columns col) {
        this.id = id;
        this.column = col;
        this.column.setId(columnId);
        this.content = content;
        this.color = color;
        this.isNew = isNew;
    }

    public int getId() {
        return id;
    }

    public Columns getColumn() {
        return column;
    }

    public int getColumnId() {
        return this.column.getId();
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

    public void setColumn(Columns col) {
        this.column = col;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setColumnId(int columnId) {
        this.column.setId(columnId);
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
