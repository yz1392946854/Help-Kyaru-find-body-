package com.example.westudy.dao;

import com.example.westudy.entity.Friends;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface IFriendsDao {
    /**
     * 查询总页数，10条一页
     * @return
     */
    int getTotalPage();

    /**
     * 滚动加载所有数据
     * @param start
     * @param pageNum
     * @return
     */
    List<Friends> getFriendInfo(@Param("start") Integer start,@Param("pageNum") Integer pageNum);

    int getHighScore();
}
