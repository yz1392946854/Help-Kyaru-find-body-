package com.example.westudy.services;

import com.example.westudy.dao.IFriendsDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class GameService {
    @Resource
    IFriendsDao iFriendsDao;
    public int getHighScore() {
        return iFriendsDao.getHighScore();
    }
}
