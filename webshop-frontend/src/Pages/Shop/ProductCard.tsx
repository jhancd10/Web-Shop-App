import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Product } from '../../Interfaces/Product';
import PRODUCT_IMAGE from '../../assets/product.png'
import MIcon from '../../Components/IconUi'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import "./card.css"
import { useShoppingCartStore } from '../../Services/Storage/shopping-cart-hook';

export default function ProductCard(product: Product) {

    const updateShoppingCart = useShoppingCartStore(state => state.updateShoppingCart)

    const handleAddCart = () => {
        updateShoppingCart(product.productId, 1)
    }

    return (
        <Card raised sx={{
          width: 300,
          height: 665,
          margin: "0 auto",
          padding: "0.1em",
        }}>

            <CardActionArea>
                
                <CardMedia
                  component="img"
                  height="250"
                  image={PRODUCT_IMAGE}
                  title={product.title}
                  sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />

                <CardContent>
                    
                    <Typography variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    
                    <Typography color="textSecondary">
                        [{product.productId} | {product.productCode}]
                    </Typography>
                    
                    <Typography variant="body2" component="p">
                        {product.description}
                    </Typography>
                    
                    <Typography variant="h6" component="h3" sx={{ mt: 2}}>
                        Price: ${product.price}
                    </Typography>

                    <Typography component={'div'} color="textSecondary">
                        Available Stock:&nbsp;&nbsp;
                        <span>
                            {product.availableStock >= 0 && product.availableStock <= 10 ?
                                <Chip label={product.availableStock} color="error" />
                                : product.availableStock > 10 && product.availableStock <= 20 ?
                                    <Chip label={product.availableStock} color="warning" />
                                    : product.availableStock > 20 && product.availableStock <= 30 ?
                                        <Chip label={product.availableStock} color="primary" />
                                        : <Chip label={product.availableStock} color="success" />
                            }
                        </span> 
                    </Typography>
                    
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 3, mb: 1 }}>
                        Categories:
                    </Typography>

                    {product.categories.map((category, index) => (
                        <Chip key={index} icon={<MIcon name={category.icon} />}
                            label={category.name} 
                            variant="outlined" size="small" 
                            style={{ margin: '3 3 3 3' }} 
                        />))}

                </CardContent>

            </CardActionArea>

            <CardActions sx={{ height: 'auto' }}>

                <Button variant="contained" color="primary" style={{ marginTop: '10px' }} 
                    startIcon={<ShoppingCartIcon />} onClick={handleAddCart}>
                    Add to Cart
                </Button>

            </CardActions>

        </Card>
    )
}