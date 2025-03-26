import React, { useState, useEffect } from "react";
//Components
import ButtonUniversal from "./ButtonUniversal";
import TagMerchant from "./TagMerchant";
import TagSocialLink from "./TagSocialLink";
//enums
import { ButtonSide } from "../enums";
//Firebase
import { doc, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { auth, db } from "../components/Firebase";
//MUI
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from "@mui/material";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux-rtk/store";
import { setSelected } from "../redux-rtk/mapFilteringSlice";
//Router
import {  useNavigate } from "react-router-dom";
//TypeScript
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";

//Icons
import closeIcon from '../icons/close.png';
import IconExclamationMark from "../icons/warning-box.png";
import IconLightningPurple from "../icons/icon-lightning-purple.png";
import IconLightningNumber from "../icons/IconLightningNumber"; //Icon w/ number Comp.
//Fake images
import dummyImgBigTile from '../img/image-1-3.png';
import FormSubmitReport from "../forms/FormSubmitReport";

const containerOuterStyle = {
    padding: '16px 12px',
    gap: '10px',
    borderRadius: '16px',
    backgroundColor: 'white',
    margin: '0px 0px 10px 0px',
    maxWidth: '100% !important'
};

const containerInnerStyle = {
    bgcolor: '#ffffff',
    gap: '20px',
};

const iconStyle = {
    width: 18,
    height: 18,
};

type TileMerchantBigProps = {
    likes: string;
    tile: IMerchantTile; 
};

const TileMerchantBig: React.FC<TileMerchantBigProps> = ({ likes, tile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //
    const user = useSelector((state: RootState) => state.misc.user);

    //tmp debug; mby TODO clicked other - reset state of this to default false
    const [voted, setVoted] = useState<boolean>(false);

    // ✅ Check if user has already liked this vendor
    useEffect(() => {
        if (!user) return; // Skip if user is not logged in
        setVoted(false);
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
        } else {
            // ✅ Like: Add a new like document
            await addDoc(likeRef, {
                userid: user.uid,
                vendorid: tile.id,
                timestamp: serverTimestamp(), // Store Firestore timestamp
            });
            setVoted(true);
        }
    };
    const FuncReport = (): Promise<void> => {
        console.log("Report merchant");
        if(!user) {
            navigate('/login')
          }
          else {
            console.log("logged in")
            handleOpenReport()
          }
        return Promise.resolve();
    };
    // Modal State
    const [openReport, setOpenReport] = React.useState(false);
    const handleOpenReport = () => setOpenReport(true);
    const handleCloseReport = () => setOpenReport(false);

    // Inside the component
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <React.Fragment>
            <Container maxWidth="sm" sx={containerOuterStyle}>
                <Box sx={{ ...containerInnerStyle }}>
                    <Grid container spacing={2}>
                        {/* LEFT - Image section */}
                        <Grid item xs={12} sm={6}>
                            <CardMedia
                                component="img"
                                image={dummyImgBigTile}
                                alt={tile.name}
                            />
                        </Grid>
                        {/* RIGHT - Content section */}
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    {tile.tags.map((tag: string) => (
                                        <TagMerchant key={tag} tag={tag} />
                                    ))}
                                </div>
                                { !isMobile && (
                                    <div onClick={() => dispatch(setSelected(null))}>
                                        <Box
                                            component="img"
                                            src={closeIcon}
                                            alt="Close Icon"
                                            sx={iconStyle}
                                            style={{ cursor: 'pointer', opacity: 1 }}
                                        />
                                    </div>)
                                }
                            </div>
                            <Typography variant="h1" component="h2" sx={{ textAlign: 'left', mt: 1 }}>
                                {tile.name}
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '16px', mt: 1, color: '#6B7280' }}>
                                {`${tile.address.address} ${tile.address.city} ${tile.address.postalCode}`}
                            </Typography>
                            <Typography sx={{ fontSize: '16px', fontFamily: 'IBM Plex Sans Condensed', color: '#404040' }}>
                                {tile.description}
                            </Typography>
                            <div>
                                <Typography variant="subtitle1" sx={{ fontFamily: 'PixGamer', fontSize: 24, color: '#6B7280', display: 'inline' }}>
                                    Socials
                                </Typography>
                                &nbsp;
                                {tile.socials.map((social: ISocial, index: number) => (
                                    <TagSocialLink key={index} social={social} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                <ButtonUniversal
                                    icon={IconExclamationMark}
                                    side={ButtonSide.Left}
                                    title="Report"
                                    color="white"
                                    textColor="#BEBEBE"
                                    actionDelegate={FuncReport}
                                />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {/*<IconLightningNumber number="777" scale={1.1} />*/}
                                    {/*TODO - swappable if clicked colors */}
                                    <ButtonUniversal
                                        icon={IconLightningPurple}
                                        side={ButtonSide.Left}
                                        title={likes}
                                        //color={voted ? "#D9D9D9" : "#F0F0F0"} // Darker when clicked
                                        color={voted ? "#7f7f7f" : "#F0F0F0"} // Darker when clicked
                                        textColor="black"
                                        actionDelegate={SwapLike}
                                    />
                                    <span>&nbsp; &nbsp;</span>
                                    <ButtonUniversal
                                        side={ButtonSide.Left}
                                        title="Navigate"
                                        color="#F23CFF"
                                        textColor="white"
                                        actionDelegate={() => console.log("TODO NAVIGATE funct()")}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Modal
                open={openReport}
                onClose={handleCloseReport}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{overflow: 'scroll'}}
              >
                <Box>
                    <FormSubmitReport
                        closeModal={handleCloseReport}
                        tile={tile}
                    />
                </Box>
              </Modal>
        </React.Fragment>
    );
};

export default TileMerchantBig;
