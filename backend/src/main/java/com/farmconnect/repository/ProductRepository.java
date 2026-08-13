package com.farmconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmconnect.entity.Product;

public interface ProductRepository 
	extends JpaRepository<Product, Long> {
	 boolean existsByName(String name);

}
