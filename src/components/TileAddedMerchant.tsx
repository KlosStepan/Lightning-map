import React from "react";
import { Container, Box, Modal, Typography } from '@mui/material';
import ButtonUniversal from "./ButtonUniversal";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import TileMerchant from "./TileMerchant";
//Icon
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';
import closeIcon from '../icons/close.png';
import FormEditSpot from "../forms/FormEditSpot";

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

const iconStyle = {
    width: 18,
    height: 18,
};

type TileAddedMerchantProps = {
    likes: string
    tile: IMerchantTile
}

//TODO - Modal Edit -> <ModifTableMerchant edit={true} merchant={merchant} />
//TODO - Modal Delete -> <Delete docID={"docId"} />
const TileAddedMerchant: React.FC<TileAddedMerchantProps> = ({ likes, tile }) => {
    // Modal State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    /*const FuncEdit = (): Promise<void> => {
        console.log("Calling Edit")
        return Promise.resolve();
    }*/
    const FuncDelete = (_merchant: string): Promise<void> => {
        console.log("Calling Delete on Merchant. ", _merchant)
        return Promise.resolve();
    }

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileMerchant likes={likes} tile={tile} index={1}/>
            <Box sx={{ ...containerBottomInsideStyle, mt: 2 }}>
            <ButtonUniversal
                        icon={IconEdit}
                        side="R"
                        title="EDIT"
                        color="#F23CFF"
                        textColor="white"
                        actionDelegate={handleOpenEdit}
                    />{' '}
                    &nbsp;
                    <ButtonUniversal
                        icon={IconTrash}
                        side="R"
                        title="DELETE"
                        color="#8000FF"
                        textColor="white"
                        actionDelegate={handleOpenDelete}
                    />
            </Box>
            {/* Edit Modal */}
            {/* Edit Merchant (FormEditMerchant edit=true, merchant=tile vv) */}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <FormEditSpot closeModal={handleCloseEdit} merchant={tile}/>
                {/*<Box
                    style={{
                        borderRadius: '20px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        backgroundColor: 'white',
                        padding: '16px',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h1"
                        component="h2"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span onClick={handleCloseEdit}>
                            <Box
                                component="img"
                                src={closeIcon}
                                alt="Close icon"
                                sx={iconStyle}
                                style={{
                                    cursor: 'pointer',
                                    opacity: 1,
                                }}
                            />
                        </span>
                    </Typography>
                </Box>*/}
            </Modal>
            {/* Delete Modal */}
            <Modal open={openDelete} onClose={handleCloseDelete} style={{overflow: 'scroll'}}>
                <Box
                    style={{
                        borderRadius: '20px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        backgroundColor: 'white',
                        padding: '16px',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h1"
                        component="h2"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        Delete spot {tile.title}
                        <span onClick={handleCloseDelete}>
                            <Box
                                component="img"
                                src={closeIcon}
                                alt="Close icon"
                                sx={iconStyle}
                                style={{
                                    cursor: 'pointer',
                                    opacity: 1,
                                }}
                            />
                        </span>
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <ButtonUniversal 
                            title="Cancel" 
                            color="#8000FF" 
                            textColor="white" 
                            actionDelegate={handleCloseDelete} 
                        />
                        <ButtonUniversal
                            title={"Delete"}
                            color="#F23CFF"
                            textColor="white"
                            actionDelegate={ () => { FuncDelete(tile.title); } }
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}
export default TileAddedMerchant;