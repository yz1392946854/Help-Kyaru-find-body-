package com.example.westudy.controller;
import com.example.westudy.services.TabbarService;
import com.example.westudy.utils.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("tabbar")
public class TabbarController {
    @Resource
    private TabbarService tabbarService;
    @RequestMapping("getFriendInfo")
    public ResultVO getFriendInfo(HttpServletRequest request){
        String page = request.getParameter("page");
        return tabbarService.getFriendInfo(Integer.valueOf(page));
    }
    @RequestMapping("getTotalPage")
    public ResultVO getTotalPage(HttpServletRequest request){
        return tabbarService.getTotalPage();
    }
}
