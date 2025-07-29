import React, { useEffect, useRef, useState } from "react";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import ToggleSocialInput from "../components/ToggleSocialInput";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
import TagMerchant from "../components/TagMerchant";
//Firebase
import { db, storage } from "../components/Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//Map stuff
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import group13 from '../icons/group13.png';
//MUI
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//Redux+RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//TypeScript
import IMerchant from "../ts/IMerchant";
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
//UUID generator
import { v4 as uuidv4 } from 'uuid';
import { ButtonColor } from "../enums";

const tagsAll = ["Food & Drinks", "Shops", "Services"];

type ModifFormSpotProps = {
    FuncCancel: () => void;
} & (
    | { edit: true; merchant: IMerchantTile; documentid: string } // When editing, require documentid
    | { edit?: false; merchant?: undefined; documentid?: undefined } // When adding, nothing mandated
);

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({FuncCancel, edit = false, merchant, documentid }) => {
    // DEBUG
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    //
    if (DEBUG) {
        console.log("<DEBUG> ModifFormSpot.tsx")
        console.log("--debugging on--")
        if (documentid) console.log("Editing document with ID, documentid:", documentid)
        if (edit) console.log("edit: true")
        if (merchant) console.log("merchant: true")
        console.log("</DEBUG> ModifFormSpot.tsx")
    }

    // Fields - 5x  Input
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    // Map - 1x <MapContainer ... with map stuff & Picker pin
    const mapRef2 = useRef(null);
    const latitude = 50.0755; //<- TODO dynamically in the city (?)
    const longitude = 14.4378; //<- TODO dynamically in the city (?)
    // |- Picker pin 🗲 stuff 
    const [position, setPosition] = useState<[number, number]>([50.0755, 14.4378]); // Default position
    const handleDragEnd = (event: L.DragEndEvent) => {
        const marker: L.Marker<any> = event.target as L.Marker;
        const newPosition: L.LatLng = marker.getLatLng();
        if(DEBUG){
            console.log("<DEBUG> handleDragEnd")
            console.log(newPosition)
            console.log("</DEBUG> handleDragEnd")
        }
        setPosition([newPosition.lat, newPosition.lng]);
    };
    // Socials - 5 Socials inputs, socials.map((social) => (
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: null },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: null },
        { network: "twitter", label: "X", link: null },
        { network: "threads", label: "@", link: null },
    ]);
    // |- Add / Delete Social Network, from <ToggleSocialInput .../>
    const handleLinkOpened = (network: string, newLink: string | null) => {
        setSocials((prevSocials) =>
            prevSocials.map((social) =>
                social.network === network ? { ...social, link: newLink } : social
            )
        );
    };
    // Tags - What stuff does this merchant sell?
    const [tags, setTags] = useState<string[]>([]);
    // |- Add / Delete Tag, from <TagMerchant .../>
    const handleTagPressed = (adding: boolean, tag: string) => {
        let _tags: string[] = tags.slice();
        if (adding) {
            _tags.push(tag);
        } else {
            _tags = _tags.filter(t => t !== tag);
        }
        setTags(_tags);
    };
    // Upload images - 1x <UploadingImagesSpot ... drilled down setFiles
    const [keepPhotos, setKeepPhotos] = useState(true);  // True as default, keep photos
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // Redirect logic
    const [isAdding, setIsAdding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // useEffect(() => {...} )
    useEffect(() => {
        if (!merchant) return; // Ensure we have merchant from props
        //
        setTags(merchant.tags);
        setSocials(merchant.socials);
    }, [merchant]);

    // CRUD Add/Upd + DummyPopulate/WrapSpot/PrepPics
    const AddSpot = async () => {
        try {
            // Step 0/3 Set Adding true
            setIsAdding(true);
            // Step 1/3 Wrap Spot
            const newSpot = WrapSpotData({ updStatus: false });
            //console.log("Adding newSpot: ", newSpot);
            // Step 2/3 Add Spot
            const docRef = await addDoc(collection(db, "merchants"), newSpot);
            console.log("Spot added with ID: ", docRef.id);
            // Step 3/3 Upload Files
            if (files.length>0) {
                try {
                    // Validate each file
                    for (const file of files) {
                        if (file.size === 0) {
                            console.error("Selected file is empty:", file.name);
                            return;
                        }
            
                        if (!file.type.startsWith("image/")) {
                            console.error("Selected file is not an image:", file.name);
                            return;
                        }
                    }
            
                    console.log("Uploading", files.length, "files...");
            
                    // Upload all images and get their URLs
                    const imageUrls = await Promise.all(
                        files.map(async (file) => {
                            const storageRef = ref(storage, `merchants-photos/${docRef.id}-${file.name}`);
                            await uploadBytes(storageRef, file);
                            return getDownloadURL(storageRef);
                        })
                    );
            
                    console.log("Uploaded image URLs:", imageUrls);
            
                    // Update Firestore Spot with array of image URLs
                    await setDoc(doc(db, "merchants", docRef.id), {
                        properties: { images: imageUrls }
                    }, { merge: true });
            
                    console.log("Firestore updated with image URLs");
                } catch (error) {
                    console.error("Error uploading files:", error);
                }
            }
            // Step 4/4 Once everything finishes (including images upload), reload the page
            window.location.reload();
        } catch (error) {
            console.error("Error adding merchant: ", error);
        } finally {
            setIsAdding(false);
        }
    };
    const UpdateSpot = () => {
        try {
            setIsSaving(true);
            console.log("documentid=", documentid);
            const updatedSpotWrapped = WrapSpotData({ updStatus: true });
            console.log("Updating updatedSpotWrapped: ", updatedSpotWrapped);
            //if(!keepPhotos) {
            // Upload photos from 'files'
            //}
        } catch (error) {
            console.error("Error adding merchant: ", error);
        } finally {
            setIsSaving(false);
        }
    };
    const WrapSpotData = ({ updStatus }: { updStatus: boolean }): IMerchant => ({
        geometry: {
            coordinates: position || [0.0, 0.0],
            type: "Point" //[x] Always Point
        },
        properties: {
            id: updStatus ? merchant?.id || "" : uuidv4(), 
            address: {
                address: addressRef.current?.value || "",
                city: cityRef.current?.value || "",
                postalCode: postalCodeRef.current?.value || "",
            },
            description: descriptionRef.current?.value || "",
            images: [], //[x] TODO some ref (?) into Storage/S3
            owner: user?.uid  || "", //[x] TODO fill from Firebase profile
            socials: socials || [],
            tags: tags || [], //[x] TODO Implement FE on Form 
            name: nameRef.current?.value || "",
            visible: updStatus, //[x] Add->false, Update->true
        },
        type: "Feature" //[x] Always a Feature
    });

    /*const PrepPics = (): any => ({
        //dadada, do after Spot is prototyped for all (in loop 3x) via the ext.
        //https://www.npmjs.com/package/browser-image-compression
    });*/

    const DebugPopulateDummySpot = async () => {
        // Random number for unique name to distinguish between Dummy Merchant
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        console.log(`DebugPopulateDummySpot() called; Spot: ${randomNumber}`);

        // Populate inputs with text
        if (nameRef.current) nameRef.current.value = `Dummy Spot Title ${randomNumber}`;
        if (descriptionRef.current) descriptionRef.current.value = `A brief dummy ${randomNumber} description.`;
        if (addressRef.current) addressRef.current.value = `123 Dummy Street`;
        if (cityRef.current) cityRef.current.value = `Dummy City`;
        if (postalCodeRef.current) postalCodeRef.current.value = `12345`;
        // Default dummy position
        setPosition([14.4378, 50.0755]);
        // Fake Social Networks
        setSocials([
            { network: "web", label: "Web", link: "https://dummyweb.com" },
            { network: "facebook", label: "FB", link: "https://facebook.com/dummy" },
            { network: "instagram", label: "IG", link: "https://instagram.com/dummy" },
            { network: "twitter", label: "X", link: "https://twitter.com/dummy" },
            { network: "threads", label: "@", link: "https://threads.net/dummy" },
        ]);
        // Fake Tags
        setTags([
            "Food & Drinks",
            "Shops",
            "Services"
        ]);
        // Populate Upload Component with dummy images - image blobs
        try {
            const imageFiles = await Promise.all(
                ["bpvs1.png", "bpvs2.png", "bpvs3.png", "bpvs4.png", "bpvs5.png"].map(async (fileName) => {
                    const response = await fetch(`/${fileName}`); // Ensure these exist in `public/`
                    const blob = await response.blob();
                    const file = new File([blob], fileName, { type: blob.type });
    
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                })
            );
            // Do setFiles like if it was done from <UploadingImagesSpot .../>
            setFiles(imageFiles);
            console.log("Dummy images added:", imageFiles);
        } catch (error) {
            console.error("Failed to load dummy images:", error);
        }
    };

    //
    const user = useSelector((state: RootState) => state.misc.user);
    return (
        <React.Fragment>
            <React.Fragment>
                {/* 5 Fields for input */}
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Title</Typography>
                    <TextField
                        fullWidth
                        inputRef={nameRef}
                        defaultValue={edit ? merchant?.name : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Description</Typography>
                    <TextField
                        fullWidth
                        inputRef={descriptionRef}
                        defaultValue={edit ? merchant?.description : ""}
                        multiline
                        minRows={3}
                        maxRows={5}
                    />
                </Box>
                <HrGreyCustomSeparator/>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Address</Typography>
                    <TextField
                        fullWidth
                        inputRef={addressRef}
                        defaultValue={edit ? merchant?.address.address : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">City</Typography>
                    <TextField
                        fullWidth
                        inputRef={cityRef}
                        defaultValue={edit ? merchant?.address.city : ""}
                    />
                </Box>
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Postal Code</Typography>
                    <TextField
                        fullWidth
                        inputRef={postalCodeRef}
                        defaultValue={edit ? merchant?.address.postalCode : ""}
                    />
                </Box>
            </React.Fragment>
            <Box mt={2}>
                {/* Map - with 🗲 Picker */}
                <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef2} style={{ height: "22vh", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker
                        position={position}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleDragEnd,
                        }}
                        icon={L.icon({ iconUrl: group13 })}
                    />
                </MapContainer>
                <div style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '18px'}}>Drag pin to more precise location</div>
            </Box>
            <HrGreyCustomSeparator marginTop={10} marginBottom={5}/>
            <Box>
                <Typography variant="h2" component="h5">Tags &nbsp; &nbsp;
                    {tagsAll.map((tag: string) => (
                        <React.Fragment key={tag}>
                            <TagMerchant tag={tag} edit={true} selected={tags.includes(tag)} actionDelegate={handleTagPressed} /> &nbsp;
                        </React.Fragment>
                    ))}
                </Typography>
            </Box>
            <HrGreyCustomSeparator marginTop={10} marginBottom={5}/>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Socials</Typography>
                {socials.map((social) => (
                    <ToggleSocialInput
                        key={social.network}
                        social={social}
                        switchLinkTo={(newLink) => handleLinkOpened(social.network, newLink)}
                    />
                ))}
            </Box>
            <HrGreyCustomSeparator marginTop={0} marginBottom={0}/>
            <Box mt={2}>
                {edit && (
                    <React.Fragment>
                        <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={keepPhotos}
                                        onChange={(e) => setKeepPhotos(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Keep photos"
                                sx={{ mr: 2 }}
                            />
                            {merchant?.images.map((url, index) => (
                                <span key={index} style={{ display: 'inline-block', width: 40, height: 40, border: '1px solid black', borderRadius: 4, marginRight: 4, overflow: 'hidden' }}>
                                    <img src={url} alt={`thumb-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: keepPhotos ? 'none' : 'grayscale(100%)' }} />
                                </span>
                            ))}
                        </Box>
                        <HrGreyCustomSeparator marginTop={5} marginBottom={5}/>
                    </React.Fragment>
                )}
                <UploadingImagesSpot files={files} setFiles={setFiles} disabled={(edit) ? keepPhotos : false} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                {/* Buttons at the bottom of the form */ }
                {DEBUG && (
                    <ButtonUniversal
                        title={"Populate-dummy-spot ^"}
                        color={ButtonColor.Pink}
                        //color="#F23CFF"
                        hoverColor={ButtonColor.PinkHover}
                        //hoverColor="#DA16E3"
                        textColor="white"
                        actionDelegate={DebugPopulateDummySpot}
                    />
                )}
                {FuncCancel && (
                    <ButtonUniversal
                        title="Cancel"
                        color={ButtonColor.Purple}
                        //color="#8000FF"
                        hoverColor={ButtonColor.PurpleHover}
                        //hoverColor="#6603C9"
                        textColor="white"
                        actionDelegate={FuncCancel}
                    />
                )}
                {/* Choose, (edit==true) - button to resave, (false) - Add button.*/}
                {edit ? (
                    <ButtonUniversal
                        title={isSaving ? "Saving ..." : "Save"}
                        color={ButtonColor.Pink}
                        //color="#F23CFF"
                        hoverColor={ButtonColor.PinkHover}
                        //hoverColor="#DA16E3"
                        textColor="white"
                        actionDelegate={UpdateSpot}
                        disabled={isSaving}
                    />
                ) : (
                    <ButtonUniversal
                        title={isAdding ? "Adding ..." : "Add"}
                        color={ButtonColor.Pink}
                        //color="#F23CFF"
                        hoverColor={ButtonColor.PinkHover}
                        //hoverColor="#DA16E3"
                        textColor="white"
                        actionDelegate={AddSpot}
                        disabled={isAdding}
                    />
                )}
            </Box>
        </React.Fragment>
    );
};

export default ModifFormSpot;
