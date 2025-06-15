import React, { useState } from "react";
import { Container, Box, Modal, Typography } from '@mui/material';
//Components
import ButtonUniversal from "./ButtonUniversal";
//enums
import { ButtonColor, ButtonSide } from "../enums";
//Firebase
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { auth, db, storage } from "./Firebase";
//Forms
import FormEditSpot from "../forms/FormEditSpot";
//Redux/RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Router
//import { useNavigate } from "react-router-dom";
//TypeScript
import IMerchant, { IMerchantTile, IMerchantADWrapper } from "../ts/IMerchant";
import TileMerchant from "./TileMerchant";
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
    // padding: top right bottom left
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
    // DEBUG
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    
    // Modal Edit State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    // Modal Delete State
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    // Redirect Logic
    const [isDeleting, setIsDeleting] = useState(false);

    const FuncDelete = async (merch: IMerchantADWrapper): Promise<void> => {
        // DEBUG info
        if (DEBUG) {
            console.log("documentid=", merchant.documentid);
            console.log("Calling Delete on Merchant: ", merch);
        }
        if (!merch.documentid) return;

        // Mby out because of phones vv
        const confirmDelete = window.confirm("Are you sure you want to delete this merchant?");
        if (!confirmDelete) return;
        // Mby out because of phones ^^

        // Try delete |Merchant from Firestore DB| and |Image(s) from Storage|
        try {
            //
            setIsDeleting(true);

            // Delete the merchant document by vendorid (/docId)
            const merchantDocRef = doc(db, "merchants", merch.documentid);
            await deleteDoc(merchantDocRef);
            console.log(`Merchant document with ID ${merch.documentid} deleted successfully.`);
        
            // List all files under 'merchants-photos' directory
            const imagesRef = ref(storage, 'merchants-photos/');
            const imageList = await listAll(imagesRef);
        
            // Loop through files and delete the ones that start with vendorid
            const deletePromises = imageList.items
                .filter(item => item.name.startsWith(merch.documentid)) // Match files that start with vendorid
                .map(item => {
                    return deleteObject(item).then(() => {
                        console.log(`Image ${item.name} deleted successfully.`);
                    }).catch((error) => {
                        console.error(`Error deleting image ${item.name}:`, error);
                    });
                });
        
            // Wait for all delete operations to complete
            await Promise.all(deletePromises);
            console.log(`All images for ${merch.merchant.properties.name} -> ${merch.documentid} deleted successfully.`);
            
            // Now reload or redirect after everything finishes
            window.location.reload(); // This reloads the page
            handleCloseDelete(); // Close the delete modal or dialog
        
        } catch (error) {
            console.error("Error during deletion:", error);
        }
         finally {
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
                        //color="#F23CFF"
                        hoverColor={ButtonColor.PinkHover}
                        //hoverColor="#DA16E3"
                        textColor="white"
                        actionDelegate={handleOpenEdit}
                />{' '}
                &nbsp;
                <ButtonUniversal
                    icon={IconTrash}
                    side={ButtonSide.Right}
                    title="Delete"
                    color={ButtonColor.Purple}
                    //color="#8000FF"
                    hoverColor={ButtonColor.PurpleHover}
                    //hoverColor="#6603C9"
                    textColor="white"
                    actionDelegate={handleOpenDelete}
                />
            </Box>
            {/* Modal 1/2 - Edit Merchant (FormEditMerchant edit=true, merchant={tile} vv /drill-down tile) */}
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
                        documentid={merchant.documentid} // ✅ Pass document ID
                    />
                </Box>
            </Modal>
            {/* Modal 2/2 - Delete Merchant (popup w/ function to DEL stuff) */}
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
                            //color="#8000FF"
                            hoverColor={ButtonColor.PurpleHover}
                            //hoverColor="#6603C9"
                            textColor="white" 
                            actionDelegate={handleCloseDelete} 
                        />
                        <ButtonUniversal
                            title={isDeleting ? "Deleting..." : "Delete"}
                            color={ButtonColor.Pink}
                            //color="#F23CFF"
                            hoverColor={ButtonColor.PinkHover}
                            //hoverColor="#DA16E3"
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