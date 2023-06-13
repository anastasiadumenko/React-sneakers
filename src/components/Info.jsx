import {useContext} from "react";
import {AppContext} from "../App";

import Arrow from './img/arrow.svg'

export const Info = ({ image, title, description }) => {
    const { setCardOpened } = useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} height={120} src={image} alt="empty"/>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button className="greenButton" onClick={() => setCardOpened(false)}>
                <img src={Arrow} alt="Arrow"/>Вернуться назад
            </button>
        </div>
    )
}