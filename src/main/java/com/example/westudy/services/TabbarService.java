package com.example.westudy.services;

import com.example.westudy.dao.IFriendsDao;
import com.example.westudy.entity.Friends;
import com.example.westudy.utils.ResultVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TabbarService {
    @Resource
    private IFriendsDao iFriendsDao;
    public ResultVO getTotalPage() {
        //为什么要装箱？
        Integer list = iFriendsDao.getTotalPage()/10;
        return ResultVO.success("ok",list);
    }

    public ResultVO getFriendInfo(Integer page) {
        List<Friends> list = iFriendsDao.getFriendInfo((page-1)*10,10);
        if (list!=null){
            return ResultVO.success("ok",list);
        }else {
            return ResultVO.failMsg("error");
        }
    }
}

