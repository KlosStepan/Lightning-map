import React, { useState } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from './TileEshop';
//enums
import { ButtonColor, ButtonSide } from '../enums';
//Forms
import FormEditEshop from '../forms/FormEditEshop';
//MUI
import { Container, Box, Modal, Typography } from '@mui/material';
//Redux/RTK
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IEshopADWrapper } from '../ts/IEshop';

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
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

    const user = useSelector((state: RootState) => state.misc.user);

    // Modal I. Edit State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // Modal II. Delete State
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    // Redirect Logic
    const [isDeleting, setIsDeleting] = useState(false);

    const FuncDelete = async (eshop: IEshopADWrapper, user: any): Promise<void> => {
        // DEBUG info
        if (DEBUG) {
            console.log("Deleting from `eshops` document with `documentid`", eshop.documentid);
        }
        
        // Check user permission
        if (!user || user.id !== eshop.eshop.owner) {
            alert("You do not have permission to delete this e-shop.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this e-shop?")) return;

        // Confirm deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this e-shop?");
        if (!confirmDelete) return;
    
        setIsDeleting(true);
        try {
            // Delete logo from storage
            if (eshop.eshop.logo) {
                const logoFileName = eshop.eshop.logo.startsWith("eshop-logos/")
                    ? eshop.eshop.logo
                    : eshop.eshop.logo.split("file=")[1]; // If logo is a URL, extract file name
                await fetch(`${apiBaseUrl}/upload?file=${encodeURIComponent(logoFileName)}`, {
                    method: "DELETE",
                    credentials: "include",
                });
            }

            // Delete e-shop from backend
            await fetch(`${apiBaseUrl}/eshops/cud?id=${encodeURIComponent(eshop.documentid)}`, {
                method: "DELETE",
                credentials: "include",
            });

            // Reload UI
            window.location.reload();
        } catch (err) {
            console.error("Error deleting e-shop:", err);
            alert("Error deleting e-shop: " + ((err as Error).message || err));
        } finally {
            setIsDeleting(false);
        }
    };
    
    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileEshop likes={likes} tile={eshop.eshop} showReportButton={false} />
            { DEBUG ? (<div>    
                <span style={{ border: '1px solid black', padding: '1px' }}>documentid={eshop.documentid}</span> <br/>
                <span style={{ border: '1px solid black', padding: '1px' }}>visible={eshop.eshop?.visible ? 1 : 0}</span>
            </div>) : null}
            <Box sx={{ ...containerBottomInsideStyle, mt: 2 }}>
                <ButtonUniversal
                    icon={IconEdit}
                    side={ButtonSide.Right}
                    title="Edit"
                    color={ButtonColor.Pink}
                    hoverColor={ButtonColor.PinkHover}
                    textColor="white"
                    actionDelegate={handleOpenEdit}
                />{' '}
                &nbsp;
                <ButtonUniversal
                    icon={IconTrash}
                    side={ButtonSide.Right}
                    title="Delete"
                    color={ButtonColor.Purple}
                    hoverColor={ButtonColor.PurpleHover}
                    textColor="white"
                    actionDelegate={handleOpenDelete}
                />
            </Box>
            {/* MODAL I - EDIT eshop (FormEditEshop edit=true, eshop={tile} vv //drill down eshop tile) */}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <Box>
                    <FormEditEshop 
                        closeModal={handleCloseEdit} 
                        eshop={eshop.eshop} 
                        documentid={eshop.documentid}
                    />
                </Box>
            </Modal>
            {/* MODAL II - DELETE eshop (popup w/ function to DELETE logo+eshop) */}
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
                        Delete e-shop {eshop.eshop.name} <br/>

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
                    { DEBUG ? (<span style={{ border: '1px solid black', padding: '1px' }}>documentid={eshop.documentid}</span> ) : null }
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <ButtonUniversal 
                            title="Cancel" 
                            color={ButtonColor.Purple}
                            hoverColor={ButtonColor.PurpleHover}
                            textColor="white" 
                            actionDelegate={handleCloseDelete} 
                        />
                        <ButtonUniversal
                            title={isDeleting ? "Deleting ..." : "Delete"}
                            color={ButtonColor.Pink}
                            hoverColor={ButtonColor.PinkHover}
                            textColor="white"
                            actionDelegate={ () => { FuncDelete(eshop, user); } }
                            disabled={isDeleting}
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default TileAddedEshop;
