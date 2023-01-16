import React from 'react';

const welcome = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user){
        window.location.href = "/login";
    }

    const logout = (e) => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <button onClick={logout}>Log Out</button>
        </div>

    );

}

export default welcome;

