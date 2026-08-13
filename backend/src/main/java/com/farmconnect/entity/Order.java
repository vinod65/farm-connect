package com.farmconnect.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty; // Import Jackson annotation

@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Buyer name is required")
	@JsonProperty("buyer_name") // Accepts buyer_name from React
	private String buyerName;
	
	@NotBlank(message = "Product name is required")
	@JsonProperty("product_name") // Accepts product_name from React
	private String productName;
	
	@NotNull(message = "Price is required")
	@DecimalMin(value = "0.01", message = "Price must be greater than 0"
		)
	private Double price;
	
	@NotNull(message = "Quantity is required")
	@Min(value = 1, message = "Quantity must be greater than 0")
	private Integer quantity;
	
	
	@NotNull(message = "Total price is required")
	@DecimalMin(
		    value = "0.01",
		    message = "Total price must be greater than 0"
		)
	@JsonProperty("total_price") // Accepts total_price from React
	private Double totalPrice;
	
	@NotBlank(message = "Status is required")
	private String status;
	
	@NotBlank(message = "Buyer email is required")
	@JsonProperty("buyer_email")
	private String buyerEmail;

	public Order() {
		super();
	}

	public Order(Long id,
	        String buyerName,
	        String buyerEmail,
	        String productName,
	        Double price,
	        Integer quantity,
	        Double totalPrice,
	        String status) {

	    this.id = id;
	    this.buyerName = buyerName;
	    this.buyerEmail = buyerEmail;
	    this.productName = productName;
	    this.price = price;
	    this.quantity = quantity;
	    this.totalPrice = totalPrice;
	    this.status = status;
	}

	public Long getId() { return id; }
	public void setId(long id) { this.id = id; }
	public String getBuyerName() { return buyerName; }
	public void setBuyerName(String buyerName) { this.buyerName = buyerName; }
	public String getProductName() { return productName; }
	public void setProductName(String productName) { this.productName = productName; }
	public Double getPrice() { return price; }
	public void setPrice(Double price) { this.price = price; }
	public Integer getQuantity() { return quantity; }
	public void setQuantity(Integer quantity) { this.quantity = quantity; }
	public Double getTotalPrice() { return totalPrice; }
	public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }
	public String getBuyerEmail() {
	    return buyerEmail;
	}

	public void setBuyerEmail(String buyerEmail) {
	    this.buyerEmail = buyerEmail;
	}
	
	
	@Override
	public String toString() {
	    return "Order [id=" + id
	            + ", buyerName=" + buyerName
	            + ", buyerEmail=" + buyerEmail
	            + ", productName=" + productName
	            + ", price=" + price
	            + ", quantity=" + quantity
	            + ", totalPrice=" + totalPrice
	            + ", status=" + status + "]";
	}}

