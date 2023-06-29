import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products:[],
      loading:true
    }
}

componentDidMount(){
  firebase
  .firestore()
   .collection("products")
    .get()
     .then((snapshot)=>{
      const products=snapshot.docs.map((doc)=>{
        const data=doc.data();
        data["id"]=doc.id;
        return data;
      })
      this.setState({
        products:products,
        loading:false
      })
     })
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
   return count;
}

getTotalPrice =() =>{

  const {products}=this.state;
  
     let totalPrice=0;
     products.forEach((product)=>{
      totalPrice+=product.price*product.qty;
     })
     return totalPrice;
  }

  render() {
    const {products,loading}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
        products={products}
        OnIncreaseQuantity={this.handleIncreaseQuantity}
        OnDecreaseQuantity={this.handleDecreaseQuantity}
        OnDeleteProduct={this.handleDeletingProduct}
        product={products}
        />
        {loading && <h1>Loding Products ... </h1>}
        <div style={{fontSize:20,padding:10}}>TOTAL:{this.getTotalPrice()}</div>
      </div>
    );
  }
}

export default App;
