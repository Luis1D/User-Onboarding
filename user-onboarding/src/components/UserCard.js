import React from 'react';

const UserCard = (props) => {
    return (
        <div className="user-card">
            <h2>{ props.username }</h2>
            <p>Role: { props.role }</p>
            <p>Email: { props.email }</p>
        </div>
    )
}

export default UserCard;