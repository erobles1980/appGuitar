import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"


function App() {
  const initialCart = () => {
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }
  
  const [data]=useState(db)
  const [cart, setCart]=useState(initialCart)
  
  useEffect( () => {
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  function addToCart(item){
    //validamos el ingreso
    const itemExist=cart.findIndex((guitar) => guitar.id===item.id)
    if (itemExist>=0){
      const updateCart=[...cart]
      updateCart[itemExist].quantity++
      setCart(updateCart)
    }else{
      //console.log('No existe')
      item.quantity=1
      setCart(prevCart => [...prevCart,item])
    }
    saveLocalStorage()
  }

  function increaseQuantity(id){
    const updateCart = cart.map( item => {
      if ( item.id === id && item.quantity < 5){
        return{
          ...item,
          quantity : item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    const updateCart = cart.map( item => {
      if ( item.id === id && item.quantity > 1){
        return{
          ...item,
          quantity : item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function removeFrontCart(id){
    setCart(prevCart => prevCart.filter( guitar => guitar.id != id))
  }

  function clearCart(){
    setCart([])
  }


  return (
    <>
    {/*Este es un componente */}
    <Header
      cart={cart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      removeFrontCart={removeFrontCart}
      clearCart={clearCart}
    />
    <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>
      <div className="row mt-5">
        {data.map((guitar)=>{
            return(
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            )
        })}

        
      </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>       
  )
}

export default App
