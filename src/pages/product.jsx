import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, InputLabel, OutlinedInput, Select, MenuItem, InputAdornment, IconButton, Grid, Typography, TextField, Autocomplete } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './product.css';

const Assign = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSpecialDiscountOpen, setIsSpecialDiscountOpen] = useState(false);
  const [isUOMOpen, setIsUOMOpen] = useState(false);


  const [values, setValues] = React.useState({
    newStock: '',
    reduceStock: '',
  });




  const [productDetails, setProductDetails] = React.useState({
    category: 'Pharmacy',
    productName: 'Dove Fash Wash',
    productMRP: 1299,
    specialDiscount: 'Flat',
    discountValue: 10,
    productPrice: 1169,
    uom: 'ml',
    unitSize: 250,
    availableQuantity: 250,
  });


  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Function to handle search input change


  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleChange = (prop) => (event, newValue) => {
    if (prop === 'specialDiscount' || prop === 'uom') {
      setProductDetails({ ...productDetails, [prop]: event.target.value });
    } else if (newValue !== null && newValue !== undefined) {
      setProductDetails({ ...productDetails, [prop]: newValue });
    } else if (event && event.target) {
      setProductDetails({ ...productDetails, [prop]: event.target.value });
    }
  };

  const handleSearch = (searchTerm = '') => {
    const filtered = allProducts.filter(product =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput, productDetails.category]);

  useEffect(() => {
    // Initialize allProducts with the products of the current category
    setAllProducts(getCategoryProducts(productDetails.category));
  }, [productDetails.category]);


  // Function to get category-specific products
  const getCategoryProducts = (category) => {
    return categoryProducts[category] || [];
  };

  const categories = [
    'Pharmacy', 'Grocery', 'Electronics', 'Clothing', 'Beauty', 'Toys', 'Sports', 'Books', 'Furniture', 'Automotive',
    'Jewelry', 'Pet Supplies', 'Health', 'Office Supplies', 'Garden', 'Tools', 'Music', 'Video Games', 'Movies', 'Outdoors'
  ];
  const discounts = ['Flat', 'Percentage', 'Buy One Get One Free', 'Seasonal', 'Clearance', 'Holiday', 'Member Exclusive', 'First Purchase', 'Bulk Purchase', 'Limited Time'];
  const uoms = ['ml', 'g', 'kg', 'L', 'pcs', 'packs', 'oz', 'lb', 'ft', 'yd', 'in', 'cm', 'mm', 'm', 'dozen', 'gross'];

  const categoryProducts = {
    'Pharmacy': [
      'Dove Face Wash', 'Himalaya Natural Face Wash', 'Dove Natural Face Wash', 'Nivea Face Wash for Mens',
      'Mamaearth Turmeric Face Wash', 'Mamaearth Rice Water Face Wash', 'Mamaearth Turmeric Face Scrub',
      'Mamaearth Turmeric Face Mask', 'Mamaearth Turmeric Face Toner', 'Mamaearth Rice Water Face Scrub',
      'Mamaearth Rice Water Face Mask', 'Mamaearth Rice Water Face Toner', 'Face Serum', 'Cetaphil Gentle Skin Cleanser',
      'Neutrogena Oil-Free Acne Wash', 'Garnier SkinActive Micellar Cleansing Water', 'Olay Regenerist Micro-Sculpting Cream',
      'La Roche-Posay Effaclar Purifying Foaming Gel Cleanser', 'CeraVe Hydrating Facial Cleanser', 'Aveeno Positively Radiant Skin Brightening Daily Scrub'
    ],
    'Grocery': [
      'Rice', 'Wheat Flour', 'Pulses', 'Spices', 'Cooking Oil', 'Salt', 'Sugar', 'Tea', 'Coffee', 'Canned Food', 'Snacks'
    ],
    'Electronics': [
      'Smartphone', 'Laptop', 'Tablet', 'Smartwatch', 'Headphones', 'Speakers', 'Camera', 'Printer', 'Router', 'Charger'
    ],
    'Clothing': [
      'T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Skirt', 'Shorts', 'Underwear', 'Socks', 'Pajamas'
    ],
    'Beauty': [
      'Shampoo', 'Conditioner', 'Body Wash', 'Lotion', 'Sunscreen', 'Face Mask', 'Hair Mask', 'Hair Oil', 'Perfume', 'Deodorant'
    ],
    'Toys': [
      'Action Figures', 'Dolls', 'Building Blocks', 'Board Games', 'Remote Control Cars', 'Puzzles', 'Art Supplies', 'Educational Toys', 'Outdoor Toys'
    ],
    'Sports': [
      'Football', 'Basketball', 'Tennis Racket', 'Yoga Mat', 'Gym Equipment', 'Cycling Gear', 'Swimming Goggles', 'Running Shoes', 'Fitness Tracker'
    ],
    'Books': [
      'Fiction', 'Non-Fiction', 'Self-Help', 'Biography', 'History', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance'
    ],
    'Furniture': [
      'Sofa', 'Bed', 'Dining Table', 'Chair', 'Cabinet', 'Bookshelf', 'Desk', 'Wardrobe', 'Coffee Table', 'Side Table'
    ],
    'Automotive': [
      'Car Shampoo', 'Car Wax', 'Engine Oil', 'Wiper Blades', 'Seat Covers', 'Car Perfume', 'Dash Cam', 'Air Freshener', 'Tire Pressure Gauge'
    ],
    'Jewelry': [
      'Necklace', 'Earrings', 'Bracelet', 'Ring', 'Anklet', 'Pendant', 'Brooch', 'Chain', 'Cufflinks', 'Watch'
    ],
    'Pet Supplies': [
      'Dog Food', 'Cat Food', 'Pet Toys', 'Pet Beds', 'Collar', 'Leash', 'Pet Grooming Kit', 'Aquarium', 'Bird Cage', 'Small Animal Habitat'
    ],
    'Health': [
      'Vitamins', 'Supplements', 'First Aid Kit', 'Pain Relief', 'Cold Medicine', 'Thermometer', 'Blood Pressure Monitor', 'Nebulizer', 'Medical Masks'
    ],
    'Office Supplies': [
      'Pens', 'Notebooks', 'Paper', 'Stapler', 'Folders', 'Desk Organizer', 'Printer Paper', 'Ink Cartridges', 'Scissors', 'Calculator'
    ],
    'Garden': [
      'Plants', 'Gardening Tools', 'Plant Pots', 'Watering Can', 'Fertilizer', 'Pesticides', 'Garden Hose', 'Lawn Mower', 'Outdoor Lighting'
    ],
    'Tools': [
      'Power Drill', 'Screwdriver Set', 'Hammer', 'Wrench', 'Measuring Tape', 'Toolbox', 'Utility Knife', 'Safety Glasses', 'Ladder', 'Cordless Screwdriver'
    ],
    'Music': [
      'Guitar', 'Keyboard', 'Drums', 'Microphone', 'Amplifier', 'Headphones', 'Sheet Music', 'Music Stand', 'Tuner', 'DJ Equipment'
    ],
    'Video Games': [
      'Console', 'Controller', 'Games', 'Gaming Headset', 'Gaming Chair', 'Gaming Keyboard', 'Gaming Mouse', 'VR Headset', 'Game Capture Card'
    ],
    'Movies': [
      'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Animation', 'Adventure', 'Documentary', 'Fantasy'
    ],
    'Outdoors': [
      'Tent', 'Sleeping Bag', 'Backpack', 'Hiking Boots', 'Binoculars', 'Portable Stove', 'Camping Chair', 'Cooler', 'Survival Kit', 'Water Bottle'
    ]
  };



  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Initial index
  const [direction, setDirection] = useState('right');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    `${process.env.PUBLIC_URL}/soap.jpeg`,
    `${process.env.PUBLIC_URL}/dove2.jpeg`,
    `${process.env.PUBLIC_URL}/dove3.jpeg`,
    `${process.env.PUBLIC_URL}/dove4.jpeg`,
    `${process.env.PUBLIC_URL}/dove5.jpeg`
    // Add other image paths similarly
  ];

  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection('left');
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="p1app">
    <div className="p1main"></div>
      <div className='p3maincontainer'>
        <div className="phase3 p3edit-product">
          <div className="p3back">
            <span className="p3back-link">← Back</span>
            <h1 className="p3title">Edit a product</h1>



            <div className="phase4 p4stock-details">
              <h2 className="p4head">Stock Details</h2>
              <p className="p4available-stock">Available Stock: 250</p>

              <div class="stock-management-container">
                <div className="p4stock-actions">
                  <div>
                    <h3>Adding a new stock</h3>
                    <h4 className="p4input-description">Adding new stock will reflect in the available quantity</h4>
                    <FormControl className="p4stock-input">
                      <InputLabel htmlFor="new-stock">New stock</InputLabel>
                      <OutlinedInput
                        id="new-stock"
                        type="number"
                        value={values.newStock}
                        onChange={handleChange('newStock')}
                        label="New stock"
                        inputProps={{
                          style: {
                            '-moz-appearance': 'textfield',
                          },
                        }}
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                        }}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <h3>Reduce from Stock</h3>
                    <h4 className="p4input-description">Reduce current stock from the available quantity</h4>
                    <FormControl className="p4stock-input">
                      <InputLabel htmlFor="reduce-stock">Reduce stock</InputLabel>
                      <OutlinedInput
                        id="reduce-stock"
                        type="number"
                        value={values.reduceStock}
                        onChange={handleChange('reduceStock')}
                        label="Reduce stock"
                        inputProps={{
                          style: {
                            '-moz-appearance': 'textfield',
                          },
                        }}
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>



            <Box className="phase5">
              <h2 className="p5head">Product Details</h2>

              <Grid container spacing={8}>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl" style={{ width: '100%' }}>
                    <Autocomplete
                      value={productDetails.category}
                      onChange={(event, newValue) => {
                        handleChange('category')({ target: { value: newValue } });
                      }}
                      onOpen={() => setIsOpen(true)}
                      onClose={() => setIsOpen(false)}
                      options={categories}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <InputAdornment position="end" style={{ position: "relative" }}>
                                <div style={{ marginRight: '-18px' }}>
                                  {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      popupIcon={null}
                      disableClearable
                      ListboxProps={{
                        style: {
                          maxHeight: 300,
                          borderRadius: 8,
                        },
                      }}
                      renderOption={(props, option, { index }) => (
                        <MenuItem
                          {...props}
                          key={index}
                          style={{
                            borderBottom: index !== categories.length - 1 ? '0.5px solid #E0E0E0' : 'none',
                          }}
                        >
                          {option}
                        </MenuItem>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl" style={{ width: '100%' }}>
                    <Autocomplete
                      value={productDetails.productName}
                      onChange={(event, newValue) => handleChange('productName')(event, newValue)}
                      onOpen={() => setIsOpen(true)}
                      onClose={() => setIsOpen(false)}
                      options={allProducts}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product Name"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <InputAdornment position="start">
                                  <IconButton>
                                    <img src="/search.svg" alt="Search" style={{ width: '20px', height: '20px' }} />
                                  </IconButton>
                                </InputAdornment>
                                {params.InputProps.startAdornment}
                              </>
                            ),
                            endAdornment: (
                              <InputAdornment position="end" style={{ position: "relative" }}>
                                <div style={{ marginRight: '-18px' }}>
                                  {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      popupIcon={null}
                      disableClearable
                      ListboxProps={{
                        style: {
                          maxHeight: 300,
                          borderRadius: 8,
                        },
                      }}
                      renderOption={(props, option, { index }) => (
                        <MenuItem
                          {...props}
                          key={index}
                          style={{
                            borderBottom: index !== allProducts.length - 1 ? '0.5px solid #E0E0E0' : 'none',
                          }}
                        >
                          {option}
                        </MenuItem>
                      )}
                    />
                  </FormControl>
                </Grid>




                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl">
                    <InputLabel>Product MRP</InputLabel>
                    <OutlinedInput type="number" value={productDetails.productMRP} onChange={handleChange('productMRP')}
                      label="Product MRP"
                      inputProps={{
                        style: {
                          '-moz-appearance': 'textfield',
                        },
                      }}
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" className="p5formControl" fullWidth>
                        <InputLabel>Special Discount</InputLabel>
                        <Select
                          value={productDetails.specialDiscount}
                          onChange={handleChange('specialDiscount')}
                          onOpen={() => setIsSpecialDiscountOpen(true)}
                          onClose={() => setIsSpecialDiscountOpen(false)}
                          label="Special Discount"
                          IconComponent={(props) => (
                            <div style={{ position: 'relative', right: '8px' }}>
                              {isUOMOpen ? <ExpandLessIcon {...props} /> : <ExpandMoreIcon {...props} />}
                            </div>
                          )}
                        >
                          {discounts.map((discount, index) => (
                            <MenuItem key={index} value={discount}>{discount}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl variant="outlined" className="p5formControl">
                        <InputLabel>Discount Value</InputLabel>
                        <OutlinedInput type="number" value={productDetails.discountValue} onChange={handleChange('discountValue')}
                          label="Discount Value"
                          inputProps={{
                            style: {
                              '-moz-appearance': 'textfield',
                            },
                          }}
                          sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl">
                    <InputLabel>Product Price</InputLabel>
                    <OutlinedInput type="number" value={productDetails.productPrice} onChange={handleChange('productPrice')}
                      label="Product Price"
                      inputProps={{
                        style: {
                          '-moz-appearance': 'textfield',
                        },
                      }}
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl" fullWidth>
                    <InputLabel>UOM</InputLabel>
                    <Select
                      value={productDetails.uom}
                      onChange={handleChange('uom')}
                      onOpen={() => setIsUOMOpen(true)}
                      onClose={() => setIsUOMOpen(false)}
                      label="UOM"
                      IconComponent={(props) => (
                        <div style={{ position: 'relative', right: '8px' }}>
                          {isUOMOpen ? <ExpandLessIcon {...props} /> : <ExpandMoreIcon {...props} />}
                        </div>
                      )}
                    >
                      {uoms.map((uom, index) => (
                        <MenuItem key={index} value={uom}>{uom}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl">
                    <InputLabel>Unit Size</InputLabel>
                    <OutlinedInput type="number" value={productDetails.unitSize} onChange={handleChange('unitSize')}
                      label="Unit Size"
                      inputProps={{
                        style: {
                          '-moz-appearance': 'textfield',
                        },
                      }}
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className="p5formControl">
                    <InputLabel>Available Quantity</InputLabel>
                    <OutlinedInput type="number" value={productDetails.availableQuantity} onChange={handleChange('availableQuantity')}
                      label="Available Quantity"
                      inputProps={{
                        style: {
                          '-moz-appearance': 'textfield',
                        },
                      }}
                      sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box className="phase6">
              <Box className="p6product-information">
                <Typography variant="h4" className="p6section-title">
                  Product Information
                </Typography>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel htmlFor="product-description" className="label">Description</InputLabel>
                  <OutlinedInput
                    id="product-description"
                    multiline
                    rows={4}
                    value="Lorem ipsum dolor sit amet consectetur. Viverra diam gravida praesent bibendum urna velit. Imperdiet feugiat id morbi volutpat varius felis eget laoreet. Sit semper ut pulvinar blandit et nunc. Est in quisque at risus tortor. Pharetra malesuada scelerisque semper risus cursus commodo ut tellus. At non magna gravida eros ut. Urna risus commodo blandit nunc. Turpis sagittis consectetur nulla ornare volutpat. Eget tellus integer id nibh congue. Egestas egestas viverra turpis habitasse mauris est arcu. Est in quisque at risus tortor."
                    readOnly
                    label="Description"
                    className="text-field"
                  />
                </FormControl>






                <Box className="p6metadata">
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="country-of-origin">Country of Origin</InputLabel>
                    <OutlinedInput
                      id="country-of-origin"
                      value="India"
                      label="Country of Origin"
                      readOnly
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel htmlFor="manufacturer">Manufacturer</InputLabel>
                    <OutlinedInput
                      id="manufacturer"
                      value="DOVE PVT LTD"
                      label="Manufacturer"
                      readOnly
                    />
                  </FormControl>
                </Box>
              </Box>

            </Box>
            <div class="container">

              <div class="phase7 p7delivery-details">
                <h2 class="p7section-title">Delivery Details</h2>
                <div class="p7delivery-options">
                  <h3 class="p7">Delivery Type</h3>
                  <h4 class="p71">(You can select multiple options)</h4>
                  <label1>
                    <input type="checkbox" defaultChecked /> Instant delivery
                  </label1>
                  <label>
                    <input type="checkbox" /> Schedule delivery
                  </label>
                  <label>
                    <input type="checkbox" /> Store Pickup
                  </label>
                </div>
              </div>

              <div class="phase8 p8product-image">
                <h2 class="p8section-title">Product Image</h2>
                <h3 class="sub8">Product images will be fetched from the xpanz server</h3>
                <div
                  className="slider-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="slider-controls left">
                    <FontAwesomeIcon icon={faArrowLeft} className="slider-icon" onClick={prevSlide} />
                  </div>
                  <div className="slider-image-container">
                    <TransitionGroup>
                      <CSSTransition
                        key={currentImageIndex}
                        timeout={300}
                        classNames={direction}
                      >
                        <img
                          src={images[currentImageIndex]}
                          alt={`Slide ${currentImageIndex + 1}`}
                          className="slider-image"
                        />
                      </CSSTransition>
                    </TransitionGroup>
                  </div>
                  <div className="slider-controls right">
                    <FontAwesomeIcon icon={faArrowRight} className="slider-icon" onClick={nextSlide} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="button-container">
            <button className="p3update-button">Update Changes</button>
          </div>
        </div>
      </div>
    </div>




  );

};

export default Assign;

