import React from 'react';
import { Container, Box } from '@mui/material';
import ButtonUniversal from "../components/ButtonUniversal";
//TypeScript
import IEshop from '../ts/IEeshop';
import TileEshop from './TileEshop';
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

type TileAddedEshopProps = {
    likes: string
    tile: IEshop
}

//TODO - Modal Edit -> <ModifTableEshop edit={true} eshop={eshop}/>
//TODO - Modal Delete -> <Delete docID={"docID"}/>
const TileAddedEshop: React.FC<TileAddedEshopProps> = ({ likes, tile }) => {
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
            <TileEshop likes={likes} tile={tile} showReportButton={false}/>
            <Box sx={{ ...containerBottomInsideStyle, mt: 2 }}>
                <ButtonUniversal icon={IconEdit} side="R" title="EDIT" color="#F23CFF" textColor="white" actionDelegate={FuncEdit} /> &nbsp;
                <ButtonUniversal icon={IconTrash} side="R" title="DELETE" color="#8000FF" textColor="white" actionDelegate={FuncDelete} />
            </Box>
        </Container>
    )
}
export default TileAddedEshop;
