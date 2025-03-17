import React from 'react';
//MUI
import { Container, Box, Modal, Typography } from '@mui/material';
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from './TileEshop';
//TypeScript
import IEshop, { IEshopADWrapper } from '../ts/IEeshop';
//Forms
import FormEditEshop from '../forms/FormEditEshop';
//Icons
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';
import closeIcon from '../icons/close.png';

const containerOuterStyle = {
    padding: '10px 16px 10px 16px !important',
    borderRadius: '16px',
    opacity: '0px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
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
    eshop: IEshopADWrapper;
};

const TileAddedEshop: React.FC<TileAddedEshopProps> = ({ likes, eshop }) => {
    // Modal State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const FuncDelete = (_eshop: string): Promise<void> => {
        console.log("Calling Delete on E-shop. ", _eshop);
        //TODO Firebase -> HTTP DELETE, check against user UID (& OK|FAIL delete) //eshop's ref&/ID + DEL photos too
        return Promise.resolve();
    }

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileEshop likes={likes} tile={eshop.eshop} showReportButton={false} />
            <div>visible={eshop.eshop?.visible ? 1 : 0}</div>
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
            {/* Modal 1/2 - Edit Eshop (FormEditEshop edit=true, eshop={tile} vv /drill-down tile) */}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <Box>
                    <FormEditEshop closeModal={handleCloseEdit} eshop={eshop.eshop}/>
                </Box>
            </Modal>
            {/* Modal 2/2 - Delete Eshop (popup w/ function to DEL stuff) */}
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
                        Delete e-shop {eshop.eshop.name}
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
                            actionDelegate={ () => { FuncDelete(eshop.eshop.name); } }
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default TileAddedEshop;
