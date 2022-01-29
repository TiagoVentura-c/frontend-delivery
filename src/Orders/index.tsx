import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';

import StepsHeader from './StepsHeader';
import ProductList from "./ProductsList"
import { OrderLocationData, Product} from "./types"
import { fetchProducts, saveOrder } from "../api"
import "./styles.css"
import OrderLocation from './OrderLocation';
import { OrderSummary } from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';



function Orders() {

    const [products, setProduct] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price
    }, 0)

    const [name, setName] = useState<string>('')

    useEffect(() => {
        fetchProducts()
            .then(response => setProduct(response.data))
            .catch(error => {
                toast.warning('Erro ao enviar pedido');
            })
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product)
      
        if (isAlreadySelected) {
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } else {
          setSelectedProducts(previous => [...previous, product]);
        }
      }
      const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
          nameClient: name,
          ...orderLocation!,
          products: productsIds,
        }
      
        saveOrder(payload).then((response) => {
          toast.error(`Pedido enviado com sucesso! ${response.data.id}`);
          setSelectedProducts([]);
        })
          .catch(() => {
            toast.warning('Erro ao enviar pedido');
          })
      }

      function handleOnChange(n: string){
          setName(n);
      }

    return (
        <>
        <div className='orders-container'>
            <StepsHeader/>
            <ProductList 
                products={products}
                onSelectProduct={handleSelectProduct}
                selectedProducts={selectedProducts}
            />
            <OrderLocation onChangeLocation={location => setOrderLocation(location) } />

            <OrderSummary
                handleOnChange={handleOnChange}
                amount={selectedProducts.length}
                totalPrice={totalPrice}
                onSubmit={handleSubmit}
                />
            
        </div>
        <Footer />
        </>
    )
}

export default Orders;