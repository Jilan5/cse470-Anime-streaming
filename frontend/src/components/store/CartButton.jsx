import React from 'react'
import Cart from './Cart'

const CartButton = () => {
  return (
    <div>
        <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Cart</button>
        <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p>Here is your cart:</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default CartButton;