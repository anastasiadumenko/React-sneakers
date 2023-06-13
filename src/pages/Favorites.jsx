import Card from "../components/Card";
import {useContext} from "react";
import {AppContext} from "../App";

export function Favorites () {
    const { favorites, onFavorite } = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap sneakers">
                {favorites.map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onClickFav={(obj) => onFavorite(obj)}
                            title={item.title}
                            price={item.price}
                            img={item.img}
                            id={item.id}
                        />
                    ))}
            </div>
        </div>
    )
}