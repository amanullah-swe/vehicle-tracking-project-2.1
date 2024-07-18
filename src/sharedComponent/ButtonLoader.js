import React from "react";

const ButtonLoader = () => {
    return (
        <div
            class="spinner-border text-light"
            role="status"
            style={{
                marginTop: "5px",
                width: "1.3rem",
                height: "1.3rem",
            }}
        ></div>
    );
};

export default ButtonLoader;
