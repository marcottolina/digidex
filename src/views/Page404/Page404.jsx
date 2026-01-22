import React from "react";
import style from "./Page404.module.css";
import image404 from "../../assets/404.jpg";

const Page404 = () => {

    return (
        <div className={`${style.page404} text-center mt-5 container p-5`}>
            <h1>Error 404</h1>
            <p>The page you're looking for isn't here!</p>
        </div>
    )

}

export default Page404;