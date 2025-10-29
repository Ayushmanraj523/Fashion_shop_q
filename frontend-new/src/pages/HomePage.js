import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductImage from '../components/ProductImage';
import LiveChat from '../components/LiveChat';

const HomePage = ({ addToCart, categoryFilter, setCategoryFilter, isLoggedIn, setShowLoginModal, searchQuery, setSearchQuery, sortBy, setSortBy, priceRange, setPriceRange, selectedBrands, setSelectedBrands, ratingFilter, setRatingFilter }) => {
  const navigate = useNavigate();
  const { category: selectedCategory, subCategory: selectedSubCategory } = categoryFilter;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLiveChat, setShowLiveChat] = useState(false);

  const allProducts = [
    // Men's T-Shirts
    { 
      name: 'Men Cotton T-Shirt', 
      price: '₹599', 
      originalPrice: '₹999',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '40% OFF',
      tag: 'New',
      category: 'men',
      subCategory: 'tshirt',
      brand: 'Fashion Hub'
    },
    { 
      name: 'Men Graphic T-Shirt', 
      price: '₹699', 
      originalPrice: '₹1199',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '42% OFF',
      tag: 'Trending',
      category: 'men',
      subCategory: 'tshirt',
      brand: 'Style Co'
    },
    { 
      name: 'Men V-Neck T-Shirt', 
      price: '₹549', 
      originalPrice: '₹899',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=400&fit=crop&auto=format',
      rating: 4.2,
      discount: '39% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'tshirt',
      brand: 'Urban Style'
    },
    { 
      name: 'Men Striped T-Shirt', 
      price: '₹649', 
      originalPrice: '₹1099',
      image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '41% OFF',
      tag: 'Bestseller',
      category: 'men',
      subCategory: 'tshirt',
      brand: 'Fashion Hub'
    },
    // Men's Shirts
    { 
      name: 'Men Polo Shirt', 
      price: '₹799', 
      originalPrice: '₹1299',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '38% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Style Co'
    },
    { 
      name: 'Men Casual Shirt', 
      price: '₹899', 
      originalPrice: '₹1499',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '40% OFF',
      tag: 'New',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Fashion Hub'
    },
    { 
      name: 'Men Denim Shirt', 
      price: '₹1099', 
      originalPrice: '₹1799',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '39% OFF',
      tag: 'Trending',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Denim Co'
    },
    { 
      name: 'Men Check Shirt', 
      price: '₹749', 
      originalPrice: '₹1249',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop&auto=format',
      rating: 4.2,
      discount: '40% OFF',
      tag: 'Classic',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Style Co'
    },
    // Men's Hoodies
    { 
      name: 'Men Hoodie', 
      price: '₹1199', 
      originalPrice: '₹1999',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '40% OFF',
      tag: 'Trending',
      category: 'men',
      subCategory: 'hoodie',
      brand: 'Urban Style'
    },
    { 
      name: 'Men Zip Hoodie', 
      price: '₹1399', 
      originalPrice: '₹2299',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '39% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'hoodie',
      brand: 'Style Co'
    },
    { 
      name: 'Men Pullover Hoodie', 
      price: '₹1099', 
      originalPrice: '₹1799',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '39% OFF',
      tag: 'Cozy',
      category: 'men',
      subCategory: 'hoodie',
      brand: 'Urban Style'
    },
    { 
      name: 'Men Chinos', 
      price: '₹999', 
      originalPrice: '₹1,699',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop',
      rating: 4.2,
      discount: '41% OFF',
      tag: 'New',
      category: 'men',
      subCategory: 'pants',
      brand: 'Casual Co'
    },
    { 
      name: 'Men Formal Shirt', 
      price: '₹899', 
      originalPrice: '₹1,499',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Bestseller',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Style Co'
    },
    // Men's Jeans
    { 
      name: 'Men Slim Fit Jeans', 
      price: '₹1299', 
      originalPrice: '₹2199',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '41% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'jeans',
      brand: 'Denim Co'
    },
    { 
      name: 'Men Regular Fit Jeans', 
      price: '₹1199', 
      originalPrice: '₹1999',
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '40% OFF',
      tag: 'Classic',
      category: 'men',
      subCategory: 'jeans',
      brand: 'Denim Co'
    },
    { 
      name: 'Men Ripped Jeans', 
      price: '₹1399', 
      originalPrice: '₹2299',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '39% OFF',
      tag: 'Trendy',
      category: 'men',
      subCategory: 'jeans',
      brand: 'Urban Style'
    },
    // Men's Shoes
    { 
      name: 'Men Running Shoes', 
      price: '₹2499', 
      originalPrice: '₹3999',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop&auto=format',
      rating: 4.7,
      discount: '38% OFF',
      tag: 'Trending',
      category: 'men',
      subCategory: 'shoes',
      brand: 'SportMax'
    },
    { 
      name: 'Men Casual Sneakers', 
      price: '₹1999', 
      originalPrice: '₹3299',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '39% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'shoes',
      brand: 'SportMax'
    },
    { 
      name: 'Men Formal Shoes', 
      price: '₹2799', 
      originalPrice: '₹4599',
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '39% OFF',
      tag: 'Professional',
      category: 'men',
      subCategory: 'shoes',
      brand: 'Elegance'
    },
    { 
      name: 'Men Boots', 
      price: '₹3199', 
      originalPrice: '₹5299',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Rugged',
      category: 'men',
      subCategory: 'shoes',
      brand: 'Urban Style'
    },
    // Women's Dresses
    { 
      name: 'Women Summer Dress', 
      price: '₹1299', 
      originalPrice: '₹2199',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '41% OFF',
      tag: 'New',
      category: 'women',
      subCategory: 'dress',
      brand: 'Elegance'
    },
    { 
      name: 'Women Maxi Dress', 
      price: '₹1599', 
      originalPrice: '₹2699',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '41% OFF',
      tag: 'Elegant',
      category: 'women',
      subCategory: 'dress',
      brand: 'Elegance'
    },
    { 
      name: 'Women Party Dress', 
      price: '₹1899', 
      originalPrice: '₹3199',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop&auto=format',
      rating: 4.7,
      discount: '41% OFF',
      tag: 'Glamorous',
      category: 'women',
      subCategory: 'dress',
      brand: 'Fashion Hub'
    },
    { 
      name: 'Women Casual Dress', 
      price: '₹999', 
      originalPrice: '₹1699',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '41% OFF',
      tag: 'Comfortable',
      category: 'women',
      subCategory: 'dress',
      brand: 'Trendy'
    },
    // Women's Tops
    { 
      name: 'Women Casual Top', 
      price: '₹699', 
      originalPrice: '₹1199',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&auto=format',
      rating: 4.2,
      discount: '42% OFF',
      tag: 'Popular',
      category: 'women',
      subCategory: 'top',
      brand: 'Trendy'
    },
    { 
      name: 'Women Crop Top', 
      price: '₹599', 
      originalPrice: '₹999',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Trendy',
      category: 'women',
      subCategory: 'top',
      brand: 'Fashion Hub'
    },
    { 
      name: 'Women Blouse', 
      price: '₹799', 
      originalPrice: '₹1299',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '38% OFF',
      tag: 'Professional',
      category: 'women',
      subCategory: 'top',
      brand: 'Elegance'
    },
    // Women's Sarees
    { 
      name: 'Women Designer Saree', 
      price: '₹3499', 
      originalPrice: '₹5999',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop&auto=format',
      rating: 4.9,
      discount: '42% OFF',
      tag: 'Premium',
      category: 'women',
      subCategory: 'saree',
      brand: 'Royal Silk'
    },
    { 
      name: 'Women Silk Saree', 
      price: '₹2999', 
      originalPrice: '₹4999',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop&auto=format',
      rating: 4.7,
      discount: '40% OFF',
      tag: 'Traditional',
      category: 'women',
      subCategory: 'saree',
      brand: 'Royal Silk'
    },
    { 
      name: 'Women Cotton Saree', 
      price: '₹1999', 
      originalPrice: '₹3299',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '39% OFF',
      tag: 'Comfortable',
      category: 'women',
      subCategory: 'saree',
      brand: 'Ethnic Wear'
    },
    { 
      name: 'Women Kurti', 
      price: '₹899', 
      originalPrice: '₹1,499',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '40% OFF',
      tag: 'Bestseller',
      category: 'women',
      subCategory: 'kurti',
      brand: 'Ethnic Wear'
    },
    { 
      name: 'Women Jeans', 
      price: '₹1,099', 
      originalPrice: '₹1,799',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
      rating: 4.5,
      discount: '39% OFF',
      tag: 'Popular',
      category: 'women',
      subCategory: 'jeans',
      brand: 'Denim Co'
    },
    { 
      name: 'Women Blazer', 
      price: '₹2,299', 
      originalPrice: '₹3,799',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      rating: 4.7,
      discount: '39% OFF',
      tag: 'Professional',
      category: 'women',
      subCategory: 'blazer',
      brand: 'Office Wear'
    },
    { 
      name: 'Women Heels', 
      price: '₹1,899', 
      originalPrice: '₹2,999',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '37% OFF',
      tag: 'Bestseller',
      category: 'women',
      subCategory: 'footwear',
      brand: 'Heel House'
    },
    // Kids' T-Shirts
    { 
      name: 'Kids T-Shirt', 
      price: '₹399', 
      originalPrice: '₹699',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '43% OFF',
      tag: 'New',
      category: 'kids',
      subCategory: 'tshirt',
      brand: 'Little Star'
    },
    { 
      name: 'Kids Cartoon T-Shirt', 
      price: '₹449', 
      originalPrice: '₹749',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop&auto=format',
      rating: 4.5,
      discount: '40% OFF',
      tag: 'Fun',
      category: 'kids',
      subCategory: 'tshirt',
      brand: 'Little Star'
    },
    { 
      name: 'Kids Sports T-Shirt', 
      price: '₹499', 
      originalPrice: '₹799',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '38% OFF',
      tag: 'Active',
      category: 'kids',
      subCategory: 'tshirt',
      brand: 'SportMax'
    },
    { 
      name: 'Kids Jeans', 
      price: '₹699', 
      originalPrice: '₹1,199',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop',
      rating: 4.2,
      discount: '42% OFF',
      tag: 'Popular',
      category: 'kids',
      subCategory: 'jeans',
      brand: 'Junior'
    },
    // Electronics - Phones
    { 
      name: 'Smartphone', 
      price: '₹15999', 
      originalPrice: '₹24999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '36% OFF',
      tag: 'Bestseller',
      category: 'electronics',
      subCategory: 'phone',
      brand: 'TechMax'
    },
    { 
      name: 'Gaming Phone', 
      price: '₹25999', 
      originalPrice: '₹39999',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=400&fit=crop&auto=format',
      rating: 4.7,
      discount: '35% OFF',
      tag: 'Gaming',
      category: 'electronics',
      subCategory: 'phone',
      brand: 'TechMax'
    },
    { 
      name: 'Budget Smartphone', 
      price: '₹9999', 
      originalPrice: '₹14999',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=400&fit=crop&auto=format',
      rating: 4.2,
      discount: '33% OFF',
      tag: 'Value',
      category: 'electronics',
      subCategory: 'phone',
      brand: 'TechMax'
    },
    // Electronics - Audio
    { 
      name: 'Wireless Headphones', 
      price: '₹2999', 
      originalPrice: '₹4999',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop&auto=format',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Trending',
      category: 'electronics',
      subCategory: 'audio',
      brand: 'SoundPro'
    },
    { 
      name: 'Gaming Headset', 
      price: '₹3999', 
      originalPrice: '₹6499',
      image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=400&fit=crop&auto=format',
      rating: 4.6,
      discount: '38% OFF',
      tag: 'Gaming',
      category: 'electronics',
      subCategory: 'audio',
      brand: 'SoundPro'
    },
    { 
      name: 'Earbuds', 
      price: '₹1999', 
      originalPrice: '₹3299',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=400&fit=crop&auto=format',
      rating: 4.3,
      discount: '39% OFF',
      tag: 'Compact',
      category: 'electronics',
      subCategory: 'audio',
      brand: 'SoundPro'
    },
    { 
      name: 'Kids Dress', 
      price: '₹599', 
      originalPrice: '₹999',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Cute',
      category: 'kids',
      subCategory: 'dress',
      brand: 'Little Star'
    },
    { 
      name: 'Kids Sneakers', 
      price: '₹799', 
      originalPrice: '₹1,299',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=400&fit=crop',
      rating: 4.3,
      discount: '38% OFF',
      tag: 'Comfortable',
      category: 'kids',
      subCategory: 'shoes',
      brand: 'SportMax'
    },
    { 
      name: 'Laptop', 
      price: '₹45,999', 
      originalPrice: '₹65,999',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=400&fit=crop',
      rating: 4.6,
      discount: '30% OFF',
      tag: 'Bestseller',
      category: 'electronics',
      subCategory: 'laptop',
      brand: 'TechMax'
    },
    { 
      name: 'Smart Watch', 
      price: '₹3,999', 
      originalPrice: '₹6,999',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop',
      rating: 4.5,
      discount: '43% OFF',
      tag: 'Smart',
      category: 'electronics',
      subCategory: 'watch',
      brand: 'TechMax'
    },
    { 
      name: 'Bluetooth Speaker', 
      price: '₹1,499', 
      originalPrice: '₹2,499',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=400&fit=crop',
      rating: 4.2,
      discount: '40% OFF',
      tag: 'Portable',
      category: 'electronics',
      subCategory: 'audio',
      brand: 'SoundPro'
    }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8084';
        const response = await fetch(`${apiUrl}/api/products`);
        if (response.ok) {
          const apiProducts = await response.json();
          // Transform API products to match existing format
          const transformedProducts = apiProducts.map(product => ({
            id: product.id,
            name: product.name,
            price: `₹${product.price}`,
            originalPrice: `₹${Math.round(product.price * 1.6)}`,
            image: product.imageUrl || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
            rating: product.rating || 4.0,
            discount: '40% OFF',
            tag: 'New',
            category: product.category?.toLowerCase() || 'all',
            subCategory: product.subCategory?.toLowerCase() || 'all',
            brand: product.brand || 'Fashion Hub',
            description: product.description
          }));
          setProducts([...transformedProducts, ...allProducts]); // Combine API and static products
        } else {
          setProducts(allProducts); // Fallback to static products
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts(allProducts); // Fallback to static products
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    // Search filter takes priority
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subCategory.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        product.tag.toLowerCase().includes(query)
      );
    } else {
      // Category filters
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      if (selectedSubCategory !== 'all') {
        filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
      }
    }
    
    // Brand filter
    if (selectedBrands && selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price filter
    if (priceRange && priceRange.length === 2) {
      filtered = filtered.filter(product => {
        const price = parseInt(product.price.replace('₹', '').replace(',', ''));
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    
    // Rating filter
    if (ratingFilter && ratingFilter > 0) {
      filtered = filtered.filter(product => product.rating >= ratingFilter);
    }
    
    // Sort products
    if (sortBy) {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
        
        switch (sortBy) {
          case 'price-low':
            return priceA - priceB;
          case 'price-high':
            return priceB - priceA;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  };

  // Force re-render when filters change
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    setFilteredProducts(getFilteredProducts());
  }, [products, sortBy, priceRange, selectedBrands, ratingFilter, searchQuery, selectedCategory, selectedSubCategory]);

  // Debug logging
  console.log('HomePage - Search Query:', searchQuery);
  console.log('HomePage - Filter state:', { sortBy, priceRange, selectedBrands, ratingFilter });
  console.log('HomePage - Filtered products count:', filteredProducts.length);

  if (loading) {
    return <LoadingSpinner size="large" message="Loading products..." />;
  }

  return (
    <div className="home animate-fade-in">
      <section className="hero-banner">
        <div className="banner-carousel">
          <div className="banner-slide">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop" alt="Fashion Sale" />
            <div className="banner-overlay">
              <div className="banner-content">
                <h1>End of Season Sale</h1>
                <p>Up to 70% OFF on Fashion & Lifestyle</p>
                <button className="shop-now-btn btn-xl liquid-btn animate-glow" onClick={() => setCategoryFilter({ category: 'all', subCategory: 'all' })}>
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="filter-section">
        <div className="filter-container">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'all', subCategory: 'all' }); setSearchQuery(''); }}
          >
            All Products
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'men' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'men', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Men
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'women' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'women', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Women
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'kids' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'kids', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Kids
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'electronics' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'electronics', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Electronics
          </button>
        </div>
      </section>
      
      <section className="products-section">
        <div className="products-header">
          <h2>
            {searchQuery ? `Search Results for "${searchQuery}"` :
             selectedCategory === 'all' ? 'Trending Now' : 
             selectedSubCategory !== 'all' ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ${selectedSubCategory.charAt(0).toUpperCase() + selectedSubCategory.slice(1)}` :
             selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <p>{filteredProducts.length} products found</p>
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          )}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={`${product.name}-${index}`} className="product-card glass-card hover-lift stagger-item">
              <div className="product-image-container">
                <ProductImage src={product.image} alt={product.name} className="product-image" />
                <div className="product-badges">
                  <span className="discount-badge">{product.discount}</span>
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                </div>
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
                <button className="wishlist-btn">♡</button>
              </div>
              
              <div className="product-info">
                <div className="brand-name">{product.brand}</div>
                <h3>{product.name}</h3>
                <div className="rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
                  </div>
                  <span className="rating-text">({product.rating}) • 2.5k reviews</span>
                </div>
                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
                <div className="delivery-info">
                  <span>🚚 Free delivery</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Bag
                  </button>
                  <button 
                    className="buy-now-btn"
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowLoginModal(true);
                        return;
                      }
                      addToCart(product);
                      navigate('/checkout');
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay in the Loop</h2>
          <p>Get the latest updates on new arrivals, exclusive offers, and fashion trends</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      <section className="categories-showcase">
        <div className="categories-header">
          <h2>Shop by Category</h2>
          <p>Discover our latest collections</p>
        </div>
        <div className="categories-grid">
          <div className="category-tile glass-card hover-lift animate-slide-up" onClick={() => { setCategoryFilter({ category: 'men', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" alt="Men's Fashion" />
            <div className="category-overlay">
              <h3>Men's Fashion</h3>
              <p>Starting ₹399</p>
            </div>
          </div>
          <div className="category-tile glass-card hover-lift animate-slide-up" onClick={() => { setCategoryFilter({ category: 'women', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop" alt="Women's Fashion" />
            <div className="category-overlay">
              <h3>Women's Fashion</h3>
              <p>Starting ₹299</p>
            </div>
          </div>
          <div className="category-tile glass-card hover-lift animate-slide-up" onClick={() => { setCategoryFilter({ category: 'kids', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop" alt="Kids Fashion" />
            <div className="category-overlay">
              <h3>Kids Fashion</h3>
              <p>Starting ₹199</p>
            </div>
          </div>
          <div className="category-tile glass-card hover-lift animate-slide-up" onClick={() => { setCategoryFilter({ category: 'electronics', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=500&fit=crop" alt="Electronics" />
            <div className="category-overlay">
              <h3>Electronics</h3>
              <p>Starting ₹999</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card glass-card hover-lift animate-scale-in">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders above ₹999</p>
          </div>
          <div className="feature-card glass-card hover-lift animate-scale-in">
            <div className="feature-icon">💰</div>
            <h3>Cash on Delivery</h3>
            <p>Pay when you receive your order</p>
          </div>
          <div className="feature-card glass-card hover-lift animate-scale-in">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns</p>
          </div>
          <div className="feature-card glass-card hover-lift animate-scale-in">
            <div className="feature-icon">🛡️</div>
            <h3>100% Authentic</h3>
            <p>Original products guaranteed</p>
          </div>
        </div>
      </section>

      {/* Live Chat Button */}
      <button 
        className="live-chat-btn"
        onClick={() => setShowLiveChat(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
        }}
      >
        💬
      </button>

      {/* Live Chat Component */}
      <LiveChat 
        isOpen={showLiveChat} 
        onClose={() => setShowLiveChat(false)} 
      />
    </div>
  );
};

export default HomePage;