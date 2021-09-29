package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	@Query ("from Product where isSold=false and user_id!=?1")
	public List<Product> availableProducts(Integer userId);
	
	public Optional<List<Product>> findByCity(String city);
	
	@Query ("from Product where category_id=?1")
	public List<Product> category(Integer categoryId);
	
	@Query ("from Product order by price")
	public List<Product> lowToHighPrice();
	
	@Query ("from Product order by price desc")
	public List<Product> highToLowPrice();
	
	@Query ("from Product where user_id=?1")
	public List<Product> myProducts(Integer userId);
	
	@Query ("from Product where product_name LIKE %?1% or tags LIKE %?1%")
	public List<Product>searchProduct(String product);
}
