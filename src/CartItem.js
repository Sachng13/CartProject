import { render } from "@testing-library/react";
import React from "react";

class CartItem extends React.Component {
    render() {
        const { price, title, qty } = this.props.product;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image}>
                    </img>
                </div>
                <div className="right-block">
                    <div style={{ fontSize: 25 }}>{title}</div>
                    <div style={{ color: '#777' }}>Rs {price}</div>
                    <div style={{ color: '#777' }}>Qty : {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img alt="increase"
                            className="action-icon"
                            src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                            onClick={() => this.props.OnIncreaseQuantity(this.props.product)}></img>
                        <img alt="decrease"
                            className="action-icon"
                            src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png"
                            onClick={() => this.props.OnDecreaseQuantity(this.props.product)}></img>
                        <img alt="delete"
                            className="action-icon"
                            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                            onClick={() => this.props.OnDeleteProduct(this.props.product)}></img>
                    </div>
                </div>
            </div>
        );
    };
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;