import {Info} from "../Info";
import { useState} from "react";
import axios from "axios";
import {useCart} from "../../hooks/useCart";

import styles from './Drawer.module.scss'

// Images
import BtnRemoved from './img/btn-removed.svg'
import Empty from './img/empty-cart.png'
import Order from './img/order-complete.jpg'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Drawer({onClose, onRemove, items = [], opened}) {
    const { cartItems, setCartItems, totalPrice} = useCart();

    const [isComplete, setIsComplete] = useState(false);
    const [orderId , setOrederId] = useState(null);
    const [isLoading , setIsLoading] = useState(false);

    const handleClickComplete = async () => {
        try{
            setIsLoading(true)
            const {data} = await axios.post('https://630b52f1f280658a59d991fa.mockapi.io/orders', {
                items: cartItems,
            });

            setOrederId(data.id);
            setIsComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://630b52f1f280658a59d991fa.mockapi.io/cart/' + item.id)
                await delay(1000);
            }

        }catch (e) {
            alert("Failed to create request :(")
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Cart <img src={BtnRemoved} alt="Close"
                                                                          onClick={onClose} className="removeBtn cu-p"/>
                </h2>
                {
                    items.length > 0 ? (
                            <>
                                <div className={`${styles.Items} flex`}>
                                    {items.map(obj => (
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: `url(${obj.img})`}}
                                                 className="cartItemImage"></div>
                                            <div className="mr-20 flex">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price} грн.</b>
                                            </div>
                                            <img src={BtnRemoved} alt="Remove" className="removeBtn"
                                                 onClick={() => onRemove(obj.id)}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="cartTotalBlock">
                                    <ul>
                                        <li>
                                            <span>Всього:</span>
                                            <div></div>
                                            <b>{totalPrice} грн.</b>
                                        </li>
                                        <li>
                                            <span>Податок 5%:</span>
                                            <div></div>
                                            <b>{(totalPrice / 100 * 5).toFixed(2)} грн.</b>
                                        </li>
                                    </ul>
                                    <button disabled={isLoading} className='greenButton' onClick={handleClickComplete}>Checkout <img src="img/arrow.svg" alt="arrow"/>
                                    </button>
                                </div>
                            </>
                        )
                        : (
                            <Info
                                title={isComplete ? "The order is made!" : 'Cart is empty'}
                                description={isComplete ? `Your order #${orderId} will soon be delivered by courier` : 'Add at least one pair of sneakers to order.'}
                                image={isComplete ? Order : Empty}
                            />
                          )
                }

            </div>
        </div>
    )
}
