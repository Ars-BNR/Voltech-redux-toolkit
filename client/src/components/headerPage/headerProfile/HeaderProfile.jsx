import React from "react";
import classes from "./HeaderProfile.module.css";
import trash from "../../../assets/icon/basket.svg";
import profileIcon from "../../../assets/icon/user.svg";
import exit from "../../../assets/icon/exit.svg";
import arrow from "../../../assets/icon/arrow.svg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actionCreators";
const HeaderProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profiles } = useSelector(state => state.auth);
    const [openid, setOpenId] = useState(false);
    const itemRef = useRef(0);

    const handleLogout = async () => {
        try {
            await dispatch(logout({ navigate }));
        } catch (error) {
            console.log(error);
        }
    };
    const username = profiles?.login;
    return (
        <div className={classes.headerProfile}>
            <div className={classes.trashBlock}>
                <img src={trash} alt="" className={classes.trashBlock__img} />
                <Link to="/basket" className={classes.trashBlock__text}>
                    Корзина
                </Link>
            </div>
            <div
                className={classes.profileBlock}
                onClick={() => setOpenId((prev) => !prev)}
            >
                <div className={classes.profileBlockLeft}>
                    <img src={profileIcon} alt="" className={classes.profileBlock__img} />
                    <span className={classes.profileBlock__text}>{username}</span>
                </div>
                <img
                    src={arrow}
                    alt=""
                    className={`${classes.arrow} ${openid ? classes.active : ""}`}
                />
            </div>
            <div
                className={classes.profilePopup}
                style={
                    openid
                        ? { height: itemRef.current.scrollHeight, opacity: 1 }
                        : { height: "0px", opacity: 0 }
                }
                ref={itemRef}
            >
                <ul className={classes.popupList}>
                    <li className={classes.popupList__item}>
                        <img src={trash} alt="" />
                        <Link to="/ordersInfo" className={classes.popupList__item}>
                            Заказы
                        </Link>
                    </li>
                    <li onClick={handleLogout} className={classes.popupList__item}>
                        <img src={exit} alt="" />
                        Выход
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default HeaderProfile;
