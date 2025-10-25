import React, { useState } from "react";
//Components
import ButtonUniversal from "./ButtonUniversal";
import TileMerchant from "./TileMerchant";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Forms
import FormEditSpot from "../forms/FormEditSpot";
//MUI
import { Container, Box, Modal, Typography } from '@mui/material';
//Redux/RTK
import { useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IMerchantADWrapper } from "../ts/IMerchant";

//Icon
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';
import closeIcon from '../icons/close.png';

const containerOuterStyle = {
    padding: '0px 0px 0px 0px !important',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
};

const containerBottomInsideStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 12px 12px 12px',
}

const iconStyle = {
    width: 18,
    height: 18,
};

type TileAddedMerchantProps = {
    likes: string
    merchant: IMerchantADWrapper
}

const TileAddedMerchant: React.FC<TileAddedMerchantProps> = ({ likes, merchant }) => {
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

    const FuncDelete = async (merch: IMerchantADWrapper): Promise<void> => {
        // DEBUG info
        if (DEBUG) {
            console.log("Deleting merchant documentid=", merch.documentid, merch);
        }

        // Check user permission
        if (!user || user.id !== merch.merchant.properties.owner) {
            alert("You do not have permission to delete this merchant.");
            return;
        }
        if (!merch.documentid) return;

        // Confirm deletion
        const confirmDelete = window.confirm("Are you sure you want to delete this merchant?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            // Delete all images from storage
            if (merch.merchant.properties.images && merch.merchant.properties.images.length > 0) {
                for (const img of merch.merchant.properties.images) {
                    // If image is a file name, use directly; if it's a URL, extract file name after "file="
                    const fileName = img.startsWith("merchants-photos/")
                        ? img
                        : img.includes("file=")
                            ? img.split("file=")[1]
                            : img;
                    await fetch(`${apiBaseUrl}/upload?file=${encodeURIComponent(fileName)}`, {
                        method: "DELETE",
                        credentials: "include",
                    });
                }
            }

            // Delete merchant from backend
            await fetch(`${apiBaseUrl}/merchants/cud?id=${encodeURIComponent(merch.documentid)}`, {
                method: "DELETE",
                credentials: "include",
            });

            // Reload UI
            window.location.reload();
        } catch (err) {
            console.error("Error deleting merchant:", err);
            alert("Error deleting merchant: " + ((err as Error).message || err));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileMerchant likes={likes} tile={merchant.merchant.properties} index={1}/>
            { DEBUG ? (<div>  
                <span style={{ border: '1px solid black', padding: '1px' }}>documentid={merchant.documentid}</span> <br/>
                <span style={{ border: '1px solid black', padding: '1px' }}>visible={merchant.merchant.properties?.visible ? 1 : 0}</span>
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
            {/* MODAL I - EDIT merchant (FormEditMerchant edit=true, merchant={tile} vv //drill down merchant tile) */}
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
            >
                <Box>
                    <FormEditSpot 
                        closeModal={handleCloseEdit} 
                        merchant={merchant.merchant.properties} 
                        documentid={merchant.documentid}
                    />
                </Box>
            </Modal>
            {/* MODAL II - DELETE merchant (popup w/ function to DELETE image(s)+merchant) */}
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
                        Delete spot {merchant.merchant.properties.name} <br/>
                        
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
                    { DEBUG ? (<span style={{ border: '1px solid black', padding: '1px' }}>documentid={merchant.documentid}</span> ) : null }
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <ButtonUniversal 
                            title="Cancel" 
                            color={ButtonColor.Purple}
                            hoverColor={ButtonColor.PurpleHover}
                            textColor="white" 
                            actionDelegate={handleCloseDelete} 
                        />
                        <ButtonUniversal
                            title={isDeleting ? "Deleting..." : "Delete"}
                            color={ButtonColor.Pink}
                            hoverColor={ButtonColor.PinkHover}
                            textColor="white"
                            actionDelegate={ () => { FuncDelete(merchant); } }
                            disabled={isDeleting}
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default TileAddedMerchant;
