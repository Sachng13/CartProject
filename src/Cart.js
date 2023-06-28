import React from "react";
import CartItem from "./CartItem";

const Cart =(props) =>{
        const {products}=props;
        return (
            <div className="cart">
                {
                    products.map((product) => {
                        return (
                        <CartItem product={product} 
                        key={product.id}
                        OnIncreaseQuantity={props.OnIncreaseQuantity}
                        OnDecreaseQuantity={props.OnDecreaseQuantity}
                        OnDeleteProduct={props.OnDeleteProduct}
                        />
                       
                        )
                    })
                }
            </div>
        );
}

export default Cart;