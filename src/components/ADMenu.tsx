import React from 'react';
import ADMenuButton from "../components/ADMenuButton";

// 4x icon
import IcoADHome from '../icons/ad-home.png';
import IcoADPin from '../icons/ad-pin.png';
import IcoADShoppingBag from '../icons/ad-shopping-bag.png';
import IcoADUser from '../icons/ad-user.png';

const ADMenu: React.FC<any> = ({ }) => {
    return (
        <React.Fragment>
            <ADMenuButton icon={IcoADHome} title="Dashboard" path="/admin/dashboard" />
            <ADMenuButton icon={IcoADPin} title="My spots" path="/admin/my-spots" />
            <ADMenuButton icon={IcoADShoppingBag} title="My e-shops" path="/admin/my-eshops" />
            <ADMenuButton icon={IcoADUser} title="My account" path="/admin/my-account" />
        </React.Fragment>
    )
}

export default ADMenu;