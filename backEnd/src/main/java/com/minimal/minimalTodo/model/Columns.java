package com.minimal.minimalTodo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

@Table(name = "todoCols")
@Entity
public class Columns {
    
    @Id
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "isNew")
    private Boolean isNew;

    public Columns() {
        this.id = 0;
        this.title = "";
        this.isNew = false;
    }

    public Columns(int id, Boolean isNew,  String title) {
        this.id = id;
        this.title = title;
        this.isNew = isNew;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getIsNew() {
        return isNew;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }


}
