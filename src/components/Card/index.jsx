import styles from './Card.module.scss'
import {useContext, useState} from "react";
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";

// Images
import Liked from './img/fav-liked.svg'
import unLiked from './img/fav-unliked.svg'
import Checked from './img/btn-checked.svg'
import unChecked from './img/btn-unchecked.svg'

function Card({img, id, title ,price, onClickFav, onClickPlus, favorited = false, loading = false}) {
    const [isFavorite, setIsFavorite] = useState(favorited)
    const { isItemAdded } = useContext(AppContext);



    const itemObj = {id, parentId: id,title, price, img}

    const handleClickPlus = () => {
        onClickPlus(itemObj);
    }

    const handleClickFav = () => {
        onClickFav(itemObj);
        setIsFavorite(!isFavorite);
    }
    console.log(img)

    return (
        <div className={styles.card}>
            {
                loading ? (<ContentLoader
                    speed={2}
                    width={165}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="155"/>
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                    <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader>) : (
                    <>
                        {onClickFav && <div className={styles.favorite}>
                                <img src={isFavorite ? Liked : unLiked} alt="Unliked"
                                     onClick={handleClickFav}/>
                        </div>}
                        <img width='100%' height={135} src={img} alt="Sneakers"/>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} грн.</b>
                            </div>
                            {onClickPlus && <img className={styles.plus}
                                  src={isItemAdded(id) ? Checked : unChecked} alt="Plus"
                                  onClick={handleClickPlus}/>}
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default Card