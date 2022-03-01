import React from 'react';
import { Link } from 'react-router-dom'
export default function MenuColumn2({phone,delivery}) {
    return (
    <div className="menuColumn2">
        <Link to="tel"><img src={phone} style={{width:17}} />8 (964) 89 99 119</Link>
        <Link to="/"><img src={delivery} alt="" />Delivery</Link>
    </div>
    )
}
