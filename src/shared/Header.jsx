import { NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import styles from './Header.module.css';

function Header() {
    const location = useLocation();
    const [title, setTitle] = useState("");

    useEffect(() => {
        if(location.pathname=="/"){
            setTitle("Sol Radio");
        } else if(location.pathname=="/search") {
            setTitle("Search");    
        } else if(location.pathname=="/likedlist") {
            setTitle("Liked List");
        } else {
            setTitle("Not Found")
        }
    },[location]);

    return (
        <div className={styles.header}>
            <h2>{title}</h2>
            <div className={styles.navLinks}>
                <nav>
                    <NavLink
                        to={"/"}
                        className={({ isActive })=>{
                            if(isActive==true){
                                return styles.active;
                            } else {
                                return styles.inactive;
                            }
                        }}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to={"/search"}
                        className={({ isActive })=>{
                            if(isActive==true){
                                return styles.active;
                            } else {
                                return styles.inactive;
                            }
                        }}
                    >
                        Search
                    </NavLink>

                    <NavLink
                        to={"/likedlist"}
                        className={({ isActive })=>{
                            if(isActive==true){
                                return styles.active;
                            } else {
                                return styles.inactive;
                            }
                        }}
                    >
                        Liked List
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Header