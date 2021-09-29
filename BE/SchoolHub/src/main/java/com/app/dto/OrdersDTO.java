package com.app.dto;


public class OrdersDTO {
	private int orderId;
	private ProductDTO productdto;
	private UserDTO sellerdto;
	private UserDTO buyerdto ;
	private int amount;
	private String orderStatus;
	private String date;
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public ProductDTO getProductdto() {
		return productdto;
	}
	public void setProductdto(ProductDTO productdto) {
		this.productdto = productdto;
	}
	public UserDTO getSellerdto() {
		return sellerdto;
	}
	public void setSellerdto(UserDTO sellerdto) {
		this.sellerdto = sellerdto;
	}
	public UserDTO getBuyerdto() {
		return buyerdto;
	}
	public void setBuyerdto(UserDTO buyerdto) {
		this.buyerdto = buyerdto;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	

}
