package com.metrolinea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* @SpringBootApplication
 */
@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class})
public class AppSistemaIaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppSistemaIaApplication.class, args);
	}

}
