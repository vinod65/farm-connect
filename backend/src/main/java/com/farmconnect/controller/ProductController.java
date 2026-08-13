package com.farmconnect.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.farmconnect.entity.Product;
import com.farmconnect.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@PostMapping("/products")
	public Product saveProduct(@Valid @RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.ok("Product Deleted Successfully");
	}
	
	@PutMapping("/products/{id}")
	public Product updateProduct(
	        @PathVariable Long id,
	        @Valid @RequestBody Product product) {

	    return productService
	            .updateProduct(id, product);
	}
	
	@GetMapping("/products/count")
	public long getProductCount() {

	    return productService.getProductCount();
	}
	
	@GetMapping("/products/quantity")
	public long getTotalQuantity() {
		return productService.getTotalQuantity();
	}
	
	}

