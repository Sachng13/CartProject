import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products:[
        {
          price:99,
          title:"Watch",
          qty: 1,
          img:"",
          id:1
        },
        {
          price:999,
          title:"Mobile Phone",
          qty:10,
          img:"",
          id:2
        },
        {
          price:999,
          title:"laptop",
          qty:4,
          img:"",
          id:3
        }
    ]
    }
}
handleIncreaseQuantity= (product) => {
    const {products}=this.state;
    const index=products.indexOf(product);

    products[index].qty+=1;

    this.setState({
        products:products,
    })
}

handleDecreaseQuantity= (product) => {
    if (product.qty>0){
        const {products}=this.state;
    const index=products.indexOf(product);

    products[index].qty-=1;

    this.setState({
        products:products,
    })
    }
}
handleDeletingProduct= (product) => {
    let {products}=this.state;
    const index=products.indexOf(product);
    
    products=products.filter((item)=>{
        if (item!=products[index]){
            return item;
        }
    })

    this.setState({
        products:products,
    })
}

getCartCount =() =>{

const {products}=this.state;

   let count=0;
   products.forEach((product)=>{
    count+=product.qty;
   })
   console.log(count);
   return count;
}
  render() {
    const {products}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
        products={products}
        OnIncreaseQuantity={this.handleIncreaseQuantity}
        OnDecreaseQuantity={this.handleDecreaseQuantity}
        OnDeleteProduct={this.handleDeletingProduct}
        />
      </div>
    );
  }
}

export default App;
