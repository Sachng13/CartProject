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
      products:[
        // {
        //   price:99,
        //   title:"Watch",
        //   qty: 1,
        //   img:"https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?cs=srgb&dl=pexels-pixabay-277390.jpg&fm=jpg",
        //   id:1
        // },
        // {
        //   price:999,
        //   title:"Mobile Phone",
        //   qty:10,
        //   img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        //   id:2
        // },
        // {
        //   price:999,
        //   title:"laptop",
        //   qty:4,
        //   img:"https://cdn.mos.cms.futurecdn.net/CwpGTq5SSqWiafeEcWCnZJ-320-80.jpg",
        //   id:3
        // }
    ],
    loading:true,
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
        {loading && <h1>Loding Products ... </h1>}
        <div style={{fontSize:20,padding:10}}>TOTAL:{this.getTotalPrice()}</div>
      </div>
    );
  }
}

export default App;
