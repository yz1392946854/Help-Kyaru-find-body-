package com.example.westudy.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("page")
public class PageController {
    @RequestMapping("index")
    public String index(){return "/index/index";}
    @RequestMapping("me")
    public String me(){return "/index/me";}
    @RequestMapping("cubic")
    public String playerchoose(){return "/index/cubic";}
    @RequestMapping("studentinfo")
    public String studentinfo(){return "/index/friendinfo";}
    @RequestMapping("game1")
    public String game1(){return "/index/game1";}
    @RequestMapping("recruit")
    public String recruit(){return "/index/recruit";}
}
