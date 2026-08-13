package com.farmconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.farmconnect.entity.Order;
import com.farmconnect.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	public Order saveOrder(Order order){
		return orderRepository.save(order);
	}
	
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}
	
	public Order updateOrderStatus(
	        Long id,
	        String status) {

	    Order order =
	        orderRepository.findById(id)
	        .orElseThrow(() ->
	            new RuntimeException("Order Not Found"));

	    order.setStatus(status);

	    return orderRepository.save(order);
	}

	public void deleteOrder(Long id) {
		if(!orderRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
		}
		orderRepository.deleteById(id);
	}

}
