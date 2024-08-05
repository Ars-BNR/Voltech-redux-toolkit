import React, { useState } from "react";
import classes from "./AdminPanel.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./orderItem/OrderItem";
import orderService from "../../../services/order.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const AdminPanel = () => {

    const { isLoading, isAuth } = useSelector(state => state.auth);
    const profile = useSelector(state => state.auth.profiles);

    const navigate = useNavigate();
    const [alldataorders, Setalldataorders] = useState([]);
    const hadleallInfoOrder = async () => {
        try {
            if (!isLoading) {
                if (isAuth) {
                    if (profile.role === "admin") {
                        const response = await orderService.getAll();
                        const AllDataOrders = response;
                        Setalldataorders(AllDataOrders);
                    } else {
                        navigate('/')
                    }
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message === "Доступ запрещен. У пользователя недостаточно прав.") {
                toast.error("У вас нет достаточных прав");
            } else {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        hadleallInfoOrder();
    }, []);
    if (!isLoading) {
        if (isAuth) {
            if (profile.role === "admin") {
                return (

                    alldataorders && (
                        <div className={classes.adminPanel}>
                            <Link to="/" className={classes.adminInfo__back}>
                                Вернуться на главную
                            </Link>
                            <p className={classes.adminInfo__title}>Админ панель</p>
                            <div className={classes.ordersList}>
                                {alldataorders.map((el) => (
                                    <OrderItem
                                        key={el.id}
                                        orderInfo={el}
                                        allOrders={alldataorders}
                                        setAllOrders={Setalldataorders}
                                        updateOrders={hadleallInfoOrder}
                                    />
                                ))}
                            </div>
                        </div>
                    )

                );
            }
        }
    }
};

export default AdminPanel;
