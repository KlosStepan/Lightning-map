import React, { useState, useEffect } from "react";
//Components
import ButtonUniversal from "./ButtonUniversal";
//enums
import { ButtonSide } from "../enums";
//Firebase
import { doc, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
//Forms
import FormSubmitReport from "../forms/FormSubmitReport";
//MUI
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { CardMedia, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
//Router
import {  useNavigate } from "react-router-dom";
//TypeScript
import IEshop from "../ts/IEshop";

//Icons
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningPurple from "../icons/icon-lightning-purple.png";

const containerOuterStyle = {
    padding: '10px 16px 10px 16px !important',
    borderRadius: '16px',
    opacity: '0px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
};

const containerInnerStyle = {
    bgcolor: '#ffffff',
    gap: '20px',
    opacity: '0px',
};

type TileEshopProps = {
    likes: string;
    tile: IEshop;
    showReportButton?: boolean;
    handleLikeChange?: (vendorid: string, change: number) => Promise<void>;

};
const TileEshop: React.FC<TileEshopProps> = ({ likes, tile, showReportButton = true, handleLikeChange = async () => {} }) => {
    const navigate = useNavigate();
    //
    const user = useSelector((state: RootState) => state.misc.user);

    //tmp debug; mby TODO clicked other - reset state of this to default false
    const [voted, setVoted] = useState<boolean>(false);

    // ✅ Check if user has already liked this vendor
    useEffect(() => {
        if (!user) return; // Skip if user is not logged in

        const checkLike = async () => {
            const likeRef = collection(db, "likes");
            const q = query(likeRef, where("userid", "==", user.uid), where("vendorid", "==", tile.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setVoted(true);
            }
        };

        checkLike();
    }, [user, tile.id]);
    const SwapLike = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
    
        const likeRef = collection(db, "likes");
        const q = query(likeRef, where("userid", "==", user.uid), where("vendorid", "==", tile.id));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
            // ❌ Unlike: Delete the specific like document (userid + vendorid pair)
            const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
            await Promise.all(deletePromises);
            setVoted(false);

            // 🔽 Call local function to decrement likes
            handleLikeChange(tile.id, -1);
        } else {
            // ✅ Like: Add a new like document
            await addDoc(likeRef, {
                userid: user.uid,
                vendorid: tile.id,
                timestamp: serverTimestamp(), // Store Firestore timestamp
            });
            setVoted(true);

            // 🔼 Call local function to increment likes
            handleLikeChange(tile.id, 1);
        }
    };
    
    //
    const FuncReport = (): Promise<void> => {
        console.log("Report merchant");
        if(!user) {
            navigate('/login')
          }
          else {
            console.log("logged in")
            handleOpenReportE()
          }
        return Promise.resolve();
    };
    // Modal State
    const [openReportE, setOpenReportE] = React.useState(false);
    const handleOpenReportE = () => setOpenReportE(true);
    const handleCloseReportE = () => setOpenReportE(false);
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={{ ...containerOuterStyle }}>
                <Box sx={{ ...containerInnerStyle }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {showReportButton && (
                                <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side={ButtonSide.Left}
                                    title="R."
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport}
                                    scale={0.75}
                                />
                            )}
                        </div>
                        <ButtonUniversal
                            icon={IconLightningPurple}
                            side={ButtonSide.Left}
                            title={likes}
                            //color={voted ? "#D9D9D9" : "#F0F0F0"} // Darker when clicked
                            color={voted ? "#7f7f7f" : "#F0F0F0"} // Darker when clicked
                            textColor="black"
                            actionDelegate={SwapLike}
                            scale={0.75}
                        />
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",  // ✅ Set height to control vertical centering
                            width: "100%",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={tile.logo}
                            alt={tile.name}
                            sx={{
                                maxWidth: "100%",  // ✅ Adjust width if needed
                                maxHeight: "100%", // ✅ Prevent overflow
                                objectFit: "contain", // ✅ Ensure the image fits inside
                            }}
                        />
                    </Box>
                    <Typography variant="h2" component="h2" style={{ textAlign: 'left' }}>
                        {tile.name}
                    </Typography>
                    <p style={{ textAlign: 'left', fontSize: '16px', marginTop:'10px', color: '#6B7280' }}>
                        {tile.description}
                    </p>
                </Box>
            </Container>
            <Modal
                open={openReportE}
                onClose={handleCloseReportE}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                    <FormSubmitReport
                        closeModal={handleCloseReportE}
                        tile={tile}
                    />
                </Box>
              </Modal>
        </React.Fragment>
    );
};

export default TileEshop;
