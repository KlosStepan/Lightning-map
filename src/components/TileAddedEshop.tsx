import React from 'react';
import { Container, Box, Modal, Typography } from '@mui/material';
import ButtonUniversal from "../components/ButtonUniversal";
import IEshop from '../ts/IEeshop';
import TileEshop from './TileEshop';
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';
import closeIcon from '../icons/close.png';
import FormEditEshop from '../forms/FormEditEshop';

const containerOuterStyle = {
    borderRadius: '16px',
    backgroundColor: 'white',
};

const containerBottomInsideStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 12px 12px 12px',
};

const iconStyle = {
    width: 18,
    height: 18,
};

type TileAddedEshopProps = {
    likes: string;
    tile: IEshop;
};

const TileAddedEshop: React.FC<TileAddedEshopProps> = ({ likes, tile }) => {
    // Modal State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const FuncDelete = (_eshop: string): Promise<void> => {
        console.log("Calling Delete on E-shop. ", _eshop)
        return Promise.resolve();
    }

    return (
        <React.Fragment>
            <Container sx={containerOuterStyle} disableGutters>
                <TileEshop likes={likes} tile={tile} showReportButton={false} />
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
            </Container>
            {/* Edit Modal */}
            {/*Edit Eshop (FormEditEshop edit=true, eshop=tile vv)*/}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <FormEditEshop closeModal={handleCloseEdit} eshop={tile}/>
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
                        Delete e-shop {tile.name}
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
                            actionDelegate={ () => { FuncDelete(tile.name); } }
                        />
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default TileAddedEshop;
