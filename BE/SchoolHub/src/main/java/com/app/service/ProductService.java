package com.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.dao.ProductCategoryRepository;
import com.app.dao.ProductRepository;
import com.app.dao.UserRepository;
import com.app.dto.ProductCategoryDTO;
import com.app.dto.ProductDTO;
import com.app.dto.UserDTO;
import com.app.entity.Product;
import com.app.entity.ProductCategory;
import com.app.entity.User;
import com.app.utility.CustomException;

@Transactional
@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	ProductCategoryRepository categoryRepo;
	
	
	public Product addProduct(ProductDTO productdto) throws Exception {

		Optional<User> optionalUser = userRepo.findById(productdto.getUserDTO().getUserId());
		User user = optionalUser.orElseThrow(() -> new Exception("User.not.found"));
		System.out.println(productdto);
		Optional<ProductCategory> optionalProductCategory = categoryRepo.findByCategory(productdto.getProductCategorydto().getCategory().toLowerCase());
		ProductCategory productCategory = optionalProductCategory.orElseThrow(() -> new Exception("Product.category.not.found"));
		
		Product product=new Product();
//		ProductCategory category=new ProductCategory();
//		category.setId(productdto.getCategoryDTO().getId());
//		category.setCategory(productdto.getCategoryDTO().getCategory());
//		category.setBaseValue(productdto.getCategoryDTO().getBaseValue());
		
		product.setUser(user);
		product.setProductName(productdto.getProductName());
		product.setDiscription(productdto.getDiscription());
		product.setCategory(productCategory);
		product.setPrice(productdto.getPrice());
		product.setImage(productdto.getImage());
		product.setTags(productdto.getTags());
		product.setIsSold(productdto.getIsSold());
		product.setDate(LocalDateTime.now());
		product.setCity(productdto.getCity());
		Product p = productRepository.save(product);

		return p;
	}
	
	public List<Product> findAll(Integer pageNo,String column,String method) {
		Pageable p = PageRequest.of(pageNo, 10);
		
		//List<Product> products =productRepository.findAll(p).getContent();
		List<Product> products;
		System.out.println(method);
		//List<Product> products = productRepository.findAll(Sort.by("price").descending());
		if(method.equals("desc")) {
			System.out.println(method+"inside desc");
			products = productRepository.findAll(PageRequest.of(0, 10, Sort.by(column).descending())).getContent();

		}
		else {
			products = productRepository.findAll(PageRequest.of(0, 10, Sort.by(column).ascending())).getContent();

		}
		return products;
	}
	
	public List<Product> availableProducts(UserDTO userdto) throws CustomException{
		List<Product> products=productRepository.availableProducts(userdto.getUserId());
		if (products.isEmpty()) throw new CustomException("Product.NoProductsToDisplay");
		return products;
		
	}
	
	public Optional<List<Product>> findByCity(String city) throws CustomException {
		Optional<List<Product>> products=productRepository.findByCity(city);
		if (products.isEmpty()) throw new CustomException("Product.NoProductsToDisplay");
		return products;
		
	}
	
	public List<Product> findByCategory(int id) throws CustomException {
		List<Product> products=productRepository.category(id);
		if (products.isEmpty()) throw new CustomException("Product.NoProductsToDisplay");

		return products;
		
	}
	
	public List<Product> lowToHighPrice(){
		List<Product> products=productRepository.lowToHighPrice();
		return products;
	}
	
	public List<Product> highToLowPrice(){
		List<Product> products=productRepository.highToLowPrice();
		return products;
	}
	
	public List<Product> myProducts(UserDTO userdto) throws CustomException {
		System.out.println("user ID is "+userdto.getUserId() +"and email is" + userdto.getEmail());
		List<Product> products=productRepository.myProducts(userdto.getUserId());
		if (products.isEmpty()) throw new CustomException("Product.NoProductsToDisplay");
		return products;
	}
	public Product getProductInfo(int id) throws CustomException {
		Product product = productRepository.findById(id).orElseThrow(() -> new CustomException("Product.NotFound"));
		return product;
	}
	public String removeProduct(Integer id) throws CustomException {
		Product product = productRepository.findById(id).orElseThrow(() -> new CustomException("Product.NotFound"));	
		System.out.println("reached before delete");
		product.setCategory(null);
		product.setUser(null);
		productRepository.save(product);
		productRepository.deleteById(id);
		System.out.println("reached after delete");
		return "Product Deleted Successfully";
	}
	
	public List<Product> searchProduct(String product) throws CustomException {
		List<Product> products=productRepository.searchProduct(product);
		if (products.isEmpty()) throw new CustomException("Product.NoProductsToDisplay");
		return products;
		
	}
}
