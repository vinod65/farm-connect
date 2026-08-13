package com.farmconnect.service;
import java.util.List;

import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farmconnect.entity.Product;
import com.farmconnect.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Product saveProduct(Product product) {
		if(productRepository.existsByName(
		        product.getName().trim())) {

		    throw new RuntimeException(
		        "Product already exists");
		}
		return productRepository.save(product);
	}
	
	public void deleteProduct(Long id) {

	    if(!productRepository.existsById(id)) {

	        throw new RuntimeException(
	            "Product Not Found"
	        );
	    }

	    productRepository.deleteById(id);
	}
	
	public Product updateProduct (Long id, Product updatedProduct) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Product Not Found")); 
		
		product.setName(updatedProduct.getName());
		product.setCategory(updatedProduct.getCategory());
		product.setPrice(
		        updatedProduct.getPrice());

		    product.setQuantity(
		        updatedProduct.getQuantity());

		    product.setImageUrl(
		        updatedProduct.getImageUrl());

		    product.setDescription(
		        updatedProduct.getDescription());

		    return productRepository.save(product);
		
	}

	public long getProductCount() {

	    return productRepository.count();
	}

	public long getTotalQuantity() {	
		return productRepository.findAll().stream()
				.mapToLong(Product::getQuantity).sum();
	}
	
	
}
