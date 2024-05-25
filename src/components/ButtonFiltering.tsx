import React from 'react';
type ButonSelectionProps = {
    title: string;
}
const ButtonFiltering: React.FC<ButonSelectionProps> = ({ title }) => {
    return (
        <React.Fragment>
            <span>({title})</span>
        </React.Fragment>
    )
}

export default ButtonFiltering;