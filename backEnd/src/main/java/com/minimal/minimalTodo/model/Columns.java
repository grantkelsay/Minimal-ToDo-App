package com.minimal.minimalTodo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import com.minimal.minimalTodo.model.Tasks;

import java.util.List;
import java.util.ArrayList;

@Table(name = "Columns")
@Entity
public class Columns {
    
    @Id
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "isNew")
    private Boolean isNew;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private Users user;

    @OneToMany(mappedBy = "column")
    private List<Tasks> tasks;

    public Columns() {
        this.id = 0;
        this.title = "";
        this.isNew = false;
        this.user = new Users();
    }

    public Columns(int id, Boolean isNew,  String title, Users user) {
        this.id = id;
        this.title = title;
        this.isNew = isNew;
        this.user = user;
    }

    public List<Tasks> getTasks() {
        return tasks;
    }

    public Users getUser() {
        return user;
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

    public void setTasks(List<Tasks> tasks) {
        this.tasks = tasks;
    }

    public void setUser(Users user) {
        this.user = user;
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
