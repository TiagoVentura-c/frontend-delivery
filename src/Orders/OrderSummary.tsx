import React from 'react'
import { formatPrice } from './helpers'

type Props = {
    amount: number;
    totalPrice: number;
    onSubmit: () => void;
    handleOnChange: (name: string) => void;
}

export function OrderSummary({ amount, totalPrice, onSubmit, handleOnChange }: Props){

    return(
        <div className='order-summary-container'>
            <div className='order-summary-content'>
            
            <div className='orders-content-name'>
                <input onChange={(e)=>handleOnChange(e.target.value)} 
                className='orders-content-input' placeholder='Digite seu nome' type="text" />
            </div>
                <div>
                <span className='amount-selected-container'>
                    <strong className='amount-selected'>{amount}</strong>
                    pedidos selectionados
                </span>
                <span className='order-summary-total'>
                    <strong className='amount-selected'>{formatPrice(totalPrice)}</strong>
                    Valor total
                </span>
                </div>
                <button 
                className='order-summary-make-order'
                onClick={onSubmit}
                >
                    FAZER PEDIDO
                </button>
            </div>
        </div>
    )
}