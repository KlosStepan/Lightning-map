import React from "react";
import { Container, Box} from '@mui/material';
import ButtonUniversal from "./ButtonUniversal";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import TileMerchant from "./TileMerchant";
//Icon
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';

const containerOuterStyle = {
    borderRadius: '16px',
    backgroundColor: 'white',
}

const containerBottomInsideStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    // padding: top right bottom left
    padding: '0px 12px 12px 12px',
}

type TileAddedMerchantProps = {
    likes: string
    tile: IMerchantTile
}

//TODO - Modal Edit -> <ModifTableMerchant edit={true} merchant={merchant} />
//TODO - Modal Delete -> <Delete docID={"docId"} />
const TileAddedMerchant: React.FC<TileAddedMerchantProps> = ({ likes, tile }) => {
    const FuncEdit = (): Promise<void> => {
        console.log("Calling Edit")
        return Promise.resolve();
    }
    const FuncDelete = (): Promise<void> => {
        console.log("Calling Delete")
        return Promise.resolve();
    }

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileMerchant likes={likes} tile={tile}/>
            <Box sx={{ ...containerBottomInsideStyle, mt: 2 }}>
                <ButtonUniversal icon={IconEdit} side="R" title="EDIT" color="#F23CFF" textColor="white" actionDelegate={FuncEdit} /> &nbsp;
                <ButtonUniversal icon={IconTrash} side="R" title="DELETE" color="#8000FF" textColor="white" actionDelegate={FuncDelete} />
            </Box>
        </Container>
    )
}
export default TileAddedMerchant;