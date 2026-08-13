package com.farmconnect.entity;

import jakarta.persistence.Entity;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Product name is required")
	private String name;
	
	@NotBlank(message = "Category is required")
	private String category;
	
	@NotNull(message = "Price is required")
	@DecimalMin(
		    value = "0.01",
		    message = "Price must be greater than 0"
		)
	private Double price;
	
	@NotBlank(message = "Description is required")
	private String description;
	
	@NotNull(message = "Quantity is required")
	@Min(value = 1, message = "Quantity must be greater than 0")
	private Integer quantity;
	
	@NotBlank(message = "Image URL is required")
	private String imageUrl;
	
	public Product() {
		super();
	}

	public Product(Long id, String name, String category, Double price, String description, Integer quantity, String imageUrl) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.imageUrl = imageUrl;
	}

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getCategory() { return category; }
	public void setCategory(String category) { this.category = category; }

	public Double getPrice() { return price; }
	public void setPrice(Double price) { this.price = price; }

	public String getDescription() { return description; } // Fixed uppercase D
	public void setDescription(String description) { this.description = description; }

	public Integer getQuantity() { return quantity; }
	public void setQuantity(Integer quantity) { this.quantity = quantity; }

	public String getImageUrl() { return imageUrl; }
	public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", category=" + category + ", price=" + price 
				+ ", description=" + description + ", quantity=" + quantity + ", imageUrl=" + imageUrl + "]";
	}
}
