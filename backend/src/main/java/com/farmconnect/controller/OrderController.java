package com.farmconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.farmconnect.entity.Order;
import com.farmconnect.service.OrderService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/orders")
	public Order saveOrder(@Valid @RequestBody Order order){
		return orderService.saveOrder(order);
	}
	
	@GetMapping("/orders")
	public List<Order> getAllOrders() {
		return orderService.getAllOrders();
	}
	
	@PutMapping("/orders/{id}/{status}")
	public Order updateOrderStatus(
	        @PathVariable Long id,
	        @PathVariable String status) {

	    return orderService
	            .updateOrderStatus(id, status);
	}
	
	@DeleteMapping("/orders/{id}")
	public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
		 orderService.deleteOrder(id);
		 return ResponseEntity.ok("Order deleted successfully");
	}
	

}
