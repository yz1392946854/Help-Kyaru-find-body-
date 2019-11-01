package com.example.westudy.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Friends implements Serializable {
    private  int id;
    private  String name;
    private  String tel;

    public  int getId() {
        return id;
    }

    public  String getName() {
        return name;
    }

    public  String getTel() {
        return tel;
    }
}
