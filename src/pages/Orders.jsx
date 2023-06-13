import Card from "../components/Card";
import {useEffect, useState} from "react";
import axios from "axios";

export function Orders () {
    const [isLoading, setIsLoading] = useState(true);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async() => {
            try{
                const { data } = await axios.get('https://630b52f1f280658a59d991fa.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                console.log(data.reduce((prev, obj) => [...prev, obj.items], []))
                setIsLoading(false);
            } catch (e) {
                alert('Error')
            }
        })()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap sneakers">
                {(
                    isLoading
                        ? [...Array(8)]
                        : orders).map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    )
}