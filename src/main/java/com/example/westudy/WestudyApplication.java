package com.example.westudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication

//public class WestudyApplication {

public class WestudyApplication extends SpringBootServletInitializer {
			// 配置war包
			@Override
			protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
				return builder.sources(WestudyApplication.class);
			}
        public static void main(String[] args) {
            SpringApplication.run(WestudyApplication.class, args);
    }

}
