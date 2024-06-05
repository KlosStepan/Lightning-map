import React from "react";

type MerchantTagProps = {
    tag: string;
}

const MerchantTag: React.FC<MerchantTagProps> = ({ tag }) => {
    return (
        <React.Fragment>
            <span>{tag}</span>
        </React.Fragment>
    )
}

export default MerchantTag;