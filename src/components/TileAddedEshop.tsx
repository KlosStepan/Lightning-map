import React from 'react';
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import TileEshop from './TileEshop';
//enums
import { ButtonSide } from '../enums';
//Firebase
import { db, storage } from "../components/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
//Forms
import FormEditEshop from '../forms/FormEditEshop';
//MUI
import { Container, Box, Modal, Typography } from '@mui/material';
//Redux/RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IEshopADWrapper } from '../ts/IEshop';
//Icons
import IconEdit from '../icons/ico-btn-edit.png';
import IconTrash from '../icons/ico-btn-trash.png';
import closeIcon from '../icons/close.png';
import { User } from 'firebase/auth';

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
    const debug = useSelector((state: RootState) => state.misc.debug);

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

    // Assuming you already have access to `db` (Firestore) and `storage` (Firebase Storage)
    const FuncDelete = async (eshop: IEshopADWrapper, user:any): Promise<void> => {
        if (debug) {
            console.log("Deleting E-shop with docRef:", eshop.documentid);
        }

        try {

            if (user?.uid !== eshop.eshop.owner) {
                console.error("You do not have permission to delete this e-shop.");
                return;
            }

            // Step 1: Delete the image from Firebase Storage
            if (eshop.eshop.logo && eshop.eshop.logo !== "N/A") {
                const storageRef = ref(storage, `eshop-logos/${eshop.documentid}-${eshop.eshop.logo.split("/").pop()}`);
                await deleteObject(storageRef);
                console.log("Image deleted from Firebase Storage:", eshop.eshop.logo);
            }

            // Step 2: Delete the e-shop document from Firestore
            const docRef = doc(db, "eshops", eshop.documentid);
            await deleteDoc(docRef);
            console.log("E-shop document deleted from Firestore:", eshop.documentid);

        } catch (error) {
            console.error("Error deleting e-shop:", error);
        }
    };

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileEshop likes={likes} tile={eshop.eshop} showReportButton={false} />
            { debug ? (<div>    
                <span style={{ border: '1px solid black', padding: '1px' }}>documentid={eshop.documentid}</span> <br/>
                <span style={{ border: '1px solid black', padding: '1px' }}>visible={eshop.eshop?.visible ? 1 : 0}</span>
            </div>) : null}
            <Box sx={{ ...containerBottomInsideStyle, mt: 2 }}>
                <ButtonUniversal
                    icon={IconEdit}
                    side={ButtonSide.Right}
                    title="EDIT"
                    color="#F23CFF"
                    textColor="white"
                    actionDelegate={handleOpenEdit}
                />{' '}
                &nbsp;
                <ButtonUniversal
                    icon={IconTrash}
                    side={ButtonSide.Right}
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
                    { debug ? (<span style={{ border: '1px solid black', padding: '1px' }}>documentid={eshop.documentid}</span> ) : null }
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
                            actionDelegate={ () => { FuncDelete(eshop, user); } }
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default TileAddedEshop;
