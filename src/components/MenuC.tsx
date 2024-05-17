import React from "react"
import Button from '@mui/material/Button';

type MenuCProps = {
    pages: string[];
};

const MenuC: React.FC<MenuCProps> = ({ pages }) => {
    return (
        <React.Fragment>
            {pages.map((page) => (
                <Button
                    key={page}
                    //onClick={handleCloseNavMenu}
                    sx={{ /*my: 2, display: 'block'*/ }}
                >
                    / {page}
                </Button>
            ))}
        </React.Fragment>
    )
}
export default MenuC