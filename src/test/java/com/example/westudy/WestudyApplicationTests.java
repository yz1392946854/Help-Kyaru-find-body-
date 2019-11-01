package com.example.westudy;

import com.example.westudy.dao.IFriendsDao;
import com.example.westudy.entity.Friends;
import com.example.westudy.utils.ResultVO;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class WestudyApplicationTests {
    @Resource
    private IFriendsDao iFriendsDao;
    @Test
    void contextLoads() {

        List<Friends> list = iFriendsDao.getFriendInfo((1-1)*10,10);
        for(int e=0;e<list.size();e++){
        System.out.println(list.get(e).getName());
        }
    }

}
