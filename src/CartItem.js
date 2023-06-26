import { render } from "@testing-library/react";
import React from "react";

class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            price: 999,
            title: "Phone",
            qty: 1,
            img: ""
        }
    }

    increaseQty = () => {
        //set state form 1; 
        // this.setState({
        //     qty:this.state.qty+1
        // })

        //setState form 2; if require previous state we should use this;
        this.setState((prevState) => {
            return {
                qty: prevState.qty + 1
            }
        });
    }
    decreaseQty = () => {
        if (this.state.qty == 0) {
            return;
        }
        this.setState((prevState) => {
            return {
                qty: prevState.qty - 1

            }

        })
    }


    render() {
        const { price, title, qty } = this.state;
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
                            onClick={this.increaseQty}></img>
                        <img alt="decrease"
                            className="action-icon"
                            src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png"
                            onClick={this.decreaseQty}></img>
                        <img alt="delete"
                            className="action-icon"
                            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"></img>
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