import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrder = () => {
  const orders = useSelector(state => state.orders.order)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
      {
        !orders[0] && (
          <NoData />
        )
      }

      {
        orders.map((order, index) => {
          return(
            <div key={order._id+index+"order"} className='border text-sm rounded p-4'>
              <p>Order No. : {order.orderId}</p>
              <div className='flex gap-3'>
                <img src={order.productDetails.image[0]} 
                alt="" 
                className='w-14 h-14'
                />
              <p className='font-medium'>{order.productDetails.name}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrder
