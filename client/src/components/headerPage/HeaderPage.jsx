import React from "react";
import classes from "./HeaderPage.module.css";
import HeaderProfile from "./headerProfile/HeaderProfile";
import HeaderButton from "./headerButton/HeaderButton";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const HeaderPage = () => {
    const { isAuth } = useSelector(state => state.auth);
    return (
        <div className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.voltechHeader}>
                    <Link to="/" className={classes.voltechHeader__title}>
                        Voltech
                    </Link>
                    {isAuth ? (
                        <HeaderProfile />
                    ) : (
                        <HeaderButton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderPage;
