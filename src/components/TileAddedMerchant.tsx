import React from "react";
import { Container, Box, Modal, Typography } from '@mui/material';
//Components
import ButtonUniversal from "./ButtonUniversal";
//enums
import { ButtonSide } from "../enums";
//Forms
import FormEditSpot from "../forms/FormEditSpot";
//Redux/RTK
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//TypeScript
import { IMerchantTile, IMerchantADWrapper } from "../ts/IMerchant";
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
    const debug = useSelector((state: RootState) => state.misc.debug);

    // Modal State
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const FuncDelete = (_merchant: string): Promise<void> => {
        if (debug) {
            console.log("documentid=", merchant.documentid);
            console.log("Calling Delete on Merchant. ", _merchant);
        }
        //TODO Firebase -> HTTP DELETE, check against user UID (& OK|FAIL delete) //merchant's ref&/ID + DEL photos too
        return Promise.resolve();
    }

    return (
        <Container sx={containerOuterStyle} disableGutters>
            <TileMerchant likes={likes} tile={merchant.merchant.properties} index={1}/>
            { debug ? (<div>  
                <span style={{ border: '1px solid black', padding: '1px' }}>documentid={merchant.documentid}</span> <br/>
                <span style={{ border: '1px solid black', padding: '1px' }}>visible={merchant.merchant.properties?.visible ? 1 : 0}</span>
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
                    { debug ? (<span style={{ border: '1px solid black', padding: '1px' }}>documentid={merchant.documentid}</span> ) : null }
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
                            actionDelegate={ () => { FuncDelete(merchant.merchant.properties.name); } }
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default TileAddedMerchant;