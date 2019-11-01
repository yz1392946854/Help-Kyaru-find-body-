package com.example.westudy.utils;

import lombok.Data;

@Data
public class ResultVO<T> {

    private Boolean code;
    private String msg;
    //具体内容
    private T data;

    public static<T> ResultVO success(String msg, T data){
        return new ResultVO(true,msg,data);
    }

    public static<T> ResultVO fail(String msg, T data){
        return new ResultVO(false,msg,data);
    }

    public static<T> ResultVO failMsg(String msg){
        return new ResultVO(false,msg);
    }

    public static<T> ResultVO successMsg(String msg){
        return new ResultVO(true,msg);
    }

    public ResultVO(boolean code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public ResultVO(boolean code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResultVO() {
    }
}


