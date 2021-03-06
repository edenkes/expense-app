import React from 'react';
import {Link} from "react-router-dom";

const ExpenseListItem = ({id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{amount/100} - {createdAt.toISOString().substring(0, 10)}</p>
    </div>
);

export default ExpenseListItem;
