import React, { useState } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from './TileEshop';
//enums
import { ButtonColor, ButtonSide } from '../enums';
//Firebase
import { db, storage } from "../components/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref, listAll } from "firebase/storage";
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
    // DEBUG
    const DEBUG = useSelector((state: RootState) => state.misc.debug);

    // Check if the user owns the e-shop (optional, based on user UID)
    const user = useSelector((state: RootState) => state.misc.user);
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

    const FuncDelete = async (eshop: IEshopADWrapper, user: any): Promise<void> => {
        // DEBUG info
        if (DEBUG) {
            console.log("Deleting E-shop with docRef:", eshop.documentid);
        }
    
        // Check if the user is the owner of the e-shop
        if (user?.uid !== eshop.eshop.owner) {
            console.error("You do not have permission to delete this e-shop.");
            return;
        }
    
        // Confirmation before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this e-shop?");
        if (!confirmDelete) return;
    
        try {
            // Step 0: Set Deleting true
            setIsDeleting(true);
            
            // Step 1: List all files in 'eshop-logos' directory
            const logosRef = ref(storage, 'eshop-logos/');
            const logoList = await listAll(logosRef);
    
            // Step 2: Loop through files and delete the ones that match the e-shop's document ID
            const deletePromises = logoList.items
                .filter(item => item.name.startsWith(eshop.documentid)) // Match files that start with e-shop document ID
                .map(item => {
                    return deleteObject(item).then(() => {
                        console.log(`Logo ${item.name} deleted successfully.`);
                    }).catch((error) => {
                        console.error(`Error deleting logo ${item.name}:`, error);
                    });
                });
    
            // Wait for all delete operations to complete
            await Promise.all(deletePromises);
            console.log(`All logos for E-shop ${eshop.eshop.name} -> ${eshop.documentid} deleted successfully.`);
    
            // Step 3: Delete the e-shop document from Firestore
            const docRef = doc(db, "eshops", eshop.documentid);
            await deleteDoc(docRef);
            console.log("E-shop document deleted from Firestore:", eshop.documentid);
    
            // Step 4: Reload the page after successful deletion
            window.location.reload(); // This reloads the page to reflect the changes
        } catch (error) {
            console.error("Error deleting e-shop:", error);
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
            {/* Modal 1/2 - Edit Eshop (FormEditEshop edit=true, eshop={tile} vv /drill-down tile) */}
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
                        documentid={eshop.documentid} // ✅ Pass document ID
                    />
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
                            //color="#8000FF"
                            hoverColor={ButtonColor.PurpleHover}
                            //hoverColor="#6603C9"
                            textColor="white" 
                            actionDelegate={handleCloseDelete} 
                        />
                        <ButtonUniversal
                            title={isDeleting ? "Deleting ..." : "Delete"}
                            color={ButtonColor.Pink}
                            //color="#F23CFF"
                            hoverColor={ButtonColor.PinkHover}
                            //hoverColor="#DA16E3"
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
