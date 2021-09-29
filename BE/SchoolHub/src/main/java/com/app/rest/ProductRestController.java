package com.app.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductCategoryDTO;
import com.app.dto.ProductDTO;
import com.app.dto.UserDTO;
import com.app.entity.Product;
import com.app.service.ProductService;
import com.app.utility.CustomException;


@CrossOrigin
@RestController
@RequestMapping("/product-api")
public class ProductRestController {

	@Autowired
	private ProductService productService;
	

	@GetMapping("/product/{pageNo}/{column}/{method}")
	public ResponseEntity<List<Product>> findAll(@PathVariable Integer pageNo,@PathVariable String column,@PathVariable String method ) {
		return new ResponseEntity<>(productService.findAll(pageNo , column , method),HttpStatus.OK);
	}
	
//	@GetMapping("/product/{id}")
//	public ResponseEntity<Optional<Product>> getuser(@PathVariable int id) {
//		Optional<Product> product=productService.findById(id);
//		return new ResponseEntity<>(product,HttpStatus.OK);
//	}
	
	@PostMapping("/product")
	public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productdto ) throws Exception  {
		Product product=productService.addProduct(productdto );
		return new ResponseEntity<>(product,HttpStatus.OK);
	}
	
	@PostMapping("/availableProducts")
	
	public ResponseEntity<List<Product>> availableProducts(@RequestBody UserDTO userdto) throws CustomException {
		return new ResponseEntity<>(productService.availableProducts(userdto),HttpStatus.OK);
				
	}
	
	@GetMapping("/product-by-city/{city}")
	public ResponseEntity<Optional<List<Product>>> findByCity(@PathVariable String city) throws CustomException {
		return new ResponseEntity<>(productService.findByCity(city),HttpStatus.OK);
				
	}
	
	@GetMapping("/product-by-category/{id}")
	public ResponseEntity <List<Product>> findByCategory(@PathVariable int id) throws CustomException {
		return new ResponseEntity<>(productService.findByCategory(id),HttpStatus.OK);
				
	}
	
	@GetMapping("/product-lowToHighPrice")
	public ResponseEntity<List<Product>> lowToHighPrice(){
		return new ResponseEntity<>(productService.lowToHighPrice(),HttpStatus.OK); 
	}
	
	@GetMapping("/product-highToLowPrice")
	public ResponseEntity<List<Product>> highToLowPrice(){
		return new ResponseEntity<>(productService.highToLowPrice(),HttpStatus.OK); 
	}
	@GetMapping("/product/{productId}")
	public ResponseEntity<Product> getProductInfo(@PathVariable int productId) throws CustomException{
		return new ResponseEntity<>(productService.getProductInfo(productId),HttpStatus.OK); 
	}
	 
	@PostMapping("/myproducts")
	public ResponseEntity<List<Product>> myProducts(@RequestBody UserDTO userdto) throws CustomException{
		return new ResponseEntity<>(productService.myProducts(userdto),HttpStatus.OK); 
		
	}
	
	@DeleteMapping("/removeProduct/{productId}")
	public ResponseEntity<String> removeProduct(@PathVariable Integer productId ) throws CustomException{
		System.out.println("reached rest delete");
		return new ResponseEntity<>(productService.removeProduct(productId),HttpStatus.OK); 
		
	}
	
	@GetMapping("/search-product/{product}")
	public ResponseEntity<List<Product>> searchProduct(@PathVariable String product) throws CustomException{
		return new ResponseEntity<>(productService.searchProduct(product),HttpStatus.OK); 
	}
}
