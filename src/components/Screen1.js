import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const defaultimageurl="https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg";
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: 'grey'
  },
  backIcon:{
   padding:"4px"
  },
  navbar: {
    flex: '0 0 20%',
    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderRadius: '20px',
    margin: '10px'
  },
  content: {
    flex: '0 0 80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflowX: 'auto',
    padding: theme.spacing(2),
  },
  itemDescriptionContainer :{
    width: "200px" ,
   textAlign:"center"
  }
  ,
  categoryItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  header:{
   display:"flex",
   flexDirection:'row',
   
  },
  paper: {
    borderRadius: '20px',
    margin: '10px',
    width: '80vw',
    padding: theme.spacing(2),
  },
  productContent: {
    display: 'flex',
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    padding: theme.spacing(2),
  },
  itemDescription: {
    wordWrap:'break-word',
    /* Allow the text to wrap within the container */
    width: '100%' /* Set the width to 100% to take the size of the paper container */
  }
  
  
}));

const Screen1 = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);


  const [currentCategory, setCurrentCategories] = useState('Category 1');
  const [selectedOption, setSelectedOption] = useState('Allproducts');
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json'
      );
      const data = await response.json();
      const result = data.result || [];
      setCategories(result);
      console.log("categories",data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await fetch(
        `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${categoryId}.json`
      );
      const data = await response.json();
      const result = data.result || [];
      setSubCategories(result);
      console.log("subcategories",data);
      
    } catch (error) {
      console.error('Error fetching Subcategories:', error);
    }
  };

  const fetchProducts = async (subCategoryId) => {
    try {
      const response = await fetch(
        `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${subCategoryId}.json`
      );
      const data = await response.json();
console.log("products",data);
const result = data.result || [];
      setProducts(result);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleCategoryClick = (options, subcategory) => {
    setCurrentCategories(options);
    fetchSubCategories(subcategory);
  };
  
  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    fetchProducts(subCategoryId);
    setSubCategories([]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.navbar}>
        <List component="nav">
          <ListItem
            button
            selected={selectedOption === 'Dashboard'}
            onClick={() => handleOptionClick('Dashboard')}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            selected={selectedOption === 'Allproducts'}
            onClick={() => handleOptionClick('Allproducts')}
          >
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
          <ListItem
            button
            selected={selectedOption === 'Favorites'}
            onClick={() => handleOptionClick('Favorites')}
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem
            button
            selected={selectedOption === 'Orders'}
            onClick={() => handleOptionClick('Orders')}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
      </div>
      {!selectedSubCategory ? (
      <Paper className={classes.paper}>
        <Typography variant="h5">{currentCategory}</Typography>
        <div className={classes.content}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Paper
                key={category.categoryId}
                className={classes.categoryItem}
                onClick={() => handleCategoryClick(category.categoryName, category.categoryId)}
              >
                <img
                  src={category.categoryImageURL || defaultimageurl}
                  alt={category.categoryName}
                  height="100"
                  width="100"
                />
                <Typography variant="subtitle1">{category.categoryName}</Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No categories found.</Typography>
          )}
        </div>

        <div className={classes.content}>
          {subCategories.length > 0 ? (
            subCategories.map((subcategory) => (
              <Paper
                key={subcategory.subCategoryId}
                className={`${classes.categoryItem} ${
                  selectedSubCategory === subcategory.subCategoryId ? 'active' : ''
                }`}
                onClick={() => handleSubCategoryClick(subcategory.subCategoryId)}
              >
                <img
                  src={subcategory.subCategoryImageURL || defaultimageurl}
                  alt={subcategory.subCategoryName}
                  height="100"
                  width="100"
                />
                <Typography variant="subtitle1">{subcategory.categoryName}</Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No subcategories found.</Typography>
          )}
        </div>
        
      </Paper>
      ):(
        <Paper className={classes.paper}>
        <div className={classes.header}>

        
        <ArrowBackIcon className={classes.backIcon} />
        <Typography variant="h6">All Products</Typography>
        </div>
    {/* content */}
    <div className={classes.productContent}>
          {products.length > 0 ? (
            products.map((product) => (
              <Paper
                key={product.productId}
                className={classes.categoryItem}
               
              >
                <img
  src={
    (product.productImages && product.productImages.length > 0)
      ? product.productImages[0]
      : defaultimageurl
  }
  alt={product.itemDescription}
  height="100"
  width="100"
/>
<div className={classes.itemDescriptionContainer}>
                <Typography variant="subtitle1"  className={classes.itemDescription}>{product.itemDescription}</Typography>
             </div> 
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No products found.</Typography>
          )}
        </div>
  </Paper>
      )}
    </div>
  );
};

export default Screen1;