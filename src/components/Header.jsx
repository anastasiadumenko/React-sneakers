import {Link} from "react-router-dom";
import {useCart} from "../hooks/useCart";

// Images
import Card from './img/card.svg'
import User from './img/user.svg'
import Fav from './img/fav.svg'
import Logo from './img/logo.png'


function Header (props) {
    const {totalPrice} = useCart();

    return (
        <header className="d-flex justify-between align-center ">
            <Link to="/">
                <div className="d-flex align-center">
                        <img src={Logo} alt="logo" width={40} height={40}/>
                        <div className="headerInfo">
                            <h3 className="text-uppercase">React sneakers</h3>
                            <p className="opacity-5">Best sneaker store</p>
                        </div>
                </div>
            </Link>

            <ul className="d-flex">
                <li className="cartHeader cu-p" onClick={props.onOpenCart}>
                    <img src={Card} alt="logo" width={20} height={20}/>
                    <span>{totalPrice} грн.</span>
                </li>
                <li className="mr-15">
                    <Link to="/favorite">
                        <img src={Fav} alt="logo" width={20} height={20}/>
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img src={User} alt="logo" width={20} height={20}/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
