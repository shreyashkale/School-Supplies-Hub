package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	@Query ("from Orders where buyer_id=?1")
	public List<Orders> myOrders(int buyerId);
}
