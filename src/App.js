import Header from "./components/Header";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {Orders} from "./pages/Orders";
import {Drawer} from "./components/Drawer";

import S1 from './components/Card/img/Sneakers/1.jpg'
import S2 from './components/Card/img/Sneakers/2.jpg'
import S3 from './components/Card/img/Sneakers/3.jpg'
import S4 from './components/Card/img/Sneakers/4.jpg'
import S5 from './components/Card/img/Sneakers/5.jpg'
import S6 from './components/Card/img/Sneakers/6.jpg'
import S7 from './components/Card/img/Sneakers/7.jpg'


export const AppContext = createContext({});

const Sneakers =[
    {
        "id": 1,
        "title": "Men's sneakers Nike Blazer Mid Suede",
        "price": 12999,
        "img": S1
    },
    {
        "id": 2,
        "title": "Men's sneakers Nike Air Max 270",
        "price": 12999,
        "img": S2
    },
    {
        "id": 3,
        "title": "Men's sneakers Nike Blazer Mid Suede",
        "price": 8499,
        "img": S3
    },
    {
        "id": 4,
        "title": "Men's sneakers Puma X Aka Boku Future Rider",
        "price": 8999,
        "img": S4
    },
    {
        "id": 5,
        "title": "Men's sneakers Under Armour Curry 8",
        "price": 15199,
        "img": S5
    },
    {
        "id": 6,
        "title": "Men's sneakers Nike Kyrie 7",
        "price": 11299,
        "img": S6
    },
    {
        "id": 7,
        "title": "Men's sneakers Jordan Air Jordan 11",
        "price": 10799,
        "img": S7
    }
]

function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCardOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect( () => {
       async function fetchDate() {
          try{
              const [cartResponse, favoriteResponse] = await Promise.all([
                  axios.get('https://630b52f1f280658a59d991fa.mockapi.io/cart'),
                  axios.get('https://630b52f1f280658a59d991fa.mockapi.io/favorites'),
              ]);

              setIsLoading (false);
              setCartItems(cartResponse.data);
              setFavorites(favoriteResponse.data);
              setItems(Sneakers);
          } catch (e) {
              alert('Error request')
          }
       }

        fetchDate()
    }, []);

    const onAddToCart = async (obj) => {
        try{
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
            if(findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId !== Number(obj.id))))
                await axios.delete(`https://630b52f1f280658a59d991fa.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj]);
                const {data} = await axios.post('https://630b52f1f280658a59d991fa.mockapi.io/cart', obj);
                setCartItems(prev => prev.map(item =>{
                    if(item.parentId === data.parentId) {
                        return {
                            ...item, id: data.id
                        }
                    }
                    return item;
                }));
            }
        } catch (e) {
            alert('Error cart')
        }

    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://630b52f1f280658a59d991fa.mockapi.io/cart/${id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (e) {
            alert('Error RemoveItem')
        }
    }

    const onFavorite = async(obj) => {
        try {
            if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://630b52f1f280658a59d991fa.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://630b52f1f280658a59d991fa.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Failed to add to favorites')
        }
    }

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

  return (
      <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onFavorite, setCardOpened, setCartItems, onAddToCart}}>
            <div className="wrapper clear">
                <Drawer onClose={() => setCardOpened(false)} items={cartItems} onRemove={onRemoveItem} opened={cartOpened}/>
                <Header onOpenCart={() => setCardOpened(true)}/>
                <Routes>
                    <Route path="/" element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearch={onChangeSearch}
                            onFavorite={onFavorite}
                            onAddToCart={onAddToCart}
                            cartItems={cartItems}
                            isLoading={isLoading}
                        />
                    }/>
                    <Route path="/favorite" element={<Favorites />}/>
                    <Route path="/orders" element={<Orders />}/>
                </Routes>
            </div>
      </AppContext.Provider>

  );
}

export default App;
