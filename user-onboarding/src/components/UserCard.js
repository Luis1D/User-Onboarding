import React from 'react';

const UserCard = (props) => {
    return (
        <div>
            <h2>User: { props.username }</h2>
            <p>Email: { props.email }</p>
        </div>
    )
}

export default UserCard;