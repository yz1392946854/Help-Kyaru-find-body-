package com.example.westudy.controller;

import com.example.westudy.services.GameService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("score")
public class GameController {
    @Resource
    GameService gameService;
@RequestMapping("game1")
    public int getHighScore(HttpServletRequest request){
    int score = gameService.getHighScore();
    return score;

}
}
