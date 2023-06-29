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
  // firebase
  // .firestore()
  //  .collection("products")
  //   .get()
  //    .then((snapshot)=>{
  //     const products=snapshot.docs.map((doc)=>{
  //       const data=doc.data();
  //       data["id"]=doc.id;
  //       return data;
  //     })
  //     this.setState({
  //       products:products,
  //       loading:false
  //     })
  //    })

  firebase
  .firestore()
   .collection("products")
  //  .orderBy("price")
  //  to sort data in ascending order;by default it stay in ascending order we can pass argument like this too;
  // .orderBy("price","asc")
  //  .orderBy("price","desc") to sort data in descending order;
  //  to filter data coming from database we can use .where before onSnapshot
  //  .where("price","==",999)
    .onSnapshot((snapshot)=>{
      const products=snapshot.docs.map((doc)=>{
        const data=doc.data();
        data["id"]=doc.id;
        return data;
      })
      this.setState({
        products:products,
        loading:false
      })
     });

} 


handleIncreaseQuantity= (product) => {
    const {products}=this.state;
    const index=products.indexOf(product);

    // products[index].qty+=1;

    // this.setState({
    //     products:products,
    // })

    const docRef=firebase.firestore().collection("products").doc(products[index].id);

    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log("updated");
    })
    .catch((error)=>{
      console.log(error);
    })
}

handleDecreaseQuantity= (product) => {
    if (product.qty>0){
        const {products}=this.state;
    const index=products.indexOf(product);

    // products[index].qty-=1;

    // this.setState({
    //     products:products,
    // })
    const docRef=firebase.firestore().collection("products").doc(products[index].id);

    docRef
    .update({
      qty:products[index].qty-1
    })
    .then(()=>{
      console.log(" decrease updated");
    })
    .catch((error)=>{
      console.log(error);
    })
    }
}
handleDeletingProduct= (product) => {
    let {products}=this.state;
    const index=products.indexOf(product);
    
    // products=products.filter((item)=>{
    //     if (item!=products[index]){
    //         return item;
    //     }
    // })

    // this.setState({
    //     products:products,
    // })

    const docRef=firebase.firestore().collection("products").doc(products[index].id);
    docRef
    .delete()
    .then(()=>{
      console.log("deleted succesfully");
    })
    .catch((error)=>{
      console.log(error);
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

  addProduct = () => {
    firebase.firestore()
      .collection("products")
        .add({
          img:"",
          price:990,
          qty:3,
          title: "Washing machine"
        })
        .then((docRef)=>{
          console.log(docRef);
        })
        .catch((error)=>{
          console.log(error);
        })
  }

  render() {
    const {products,loading}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a product</button> */}
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
