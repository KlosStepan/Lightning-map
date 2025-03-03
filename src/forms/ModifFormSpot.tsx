import React, { useRef, useState } from "react";
//MUI
import { Box } from '@mui/material';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import ToggleSocialInput from "../components/ToggleSocialInput";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
//Redux+RTK
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";
//TypeScript
import IMerchant from "../ts/IMerchant";
import { IMerchantTile } from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
//Map stuff
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import group13 from '../icons/group13.png';
//
import { v4 as uuidv4 } from 'uuid';

type ModifFormSpotProps = {
    FuncCancel: () => void;
} & (
    | { edit: true; merchant: IMerchantTile } // When (edit=true), merchant is required
    | { edit?: false; merchant?: undefined } // When (edit=false)/undefined, merchant is optional
);

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false, merchant, FuncCancel }) => {
    // DEBUG
    const debug = useSelector((state: RootState) => state.misc.debug);
    // Conditionally log debug information
    if (debug) {
        console.log("<DEBUG> ModifFormSpot.tsx");
        console.log("--debugging on--")
        console.log("</DEBUG> ModifFormSpot.tsx")
    }

    //Fields - 5x input
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    //Map - 1x map
    const mapRef2 = useRef(null);
    const latitude = 50.0755; //<- TODO dynamically in the city (?)
    const longitude = 14.4378; //<- TODO dynamically in the city (?)
    //  |- picker stuff
    const [position, setPosition] = useState<[number, number]>([50.0755, 14.4378]); // Default position
    const handleDragEnd = (event: L.DragEndEvent) => {
        const marker = event.target as L.Marker;
        const newPosition = marker.getLatLng();
        setPosition([newPosition.lat, newPosition.lng]);
    };
    //Socials - 1x comp w/ 5 Socials
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: null },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: null },
        { network: "twitter", label: "X", link: null },
        { network: "threads", label: "@", link: null },
    ]);
    //Upload images - 1x comp, f_handle()
    const handleLinkOpened = (network: string, newLink: string | null) => {
        setSocials((prevSocials) =>
            prevSocials.map((social) =>
                social.network === network ? { ...social, link: newLink } : social
            )
        );
    };
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // Functions - Add(), Update(), _bundleInput(), //TODO _prepPics() (/Update - checks for pic update)
    const AddSpot = () => {
        const newSpotWrapped = WrapSpotData({ updStatus: false });
        console.log("Adding newSpotWrapped: ", newSpotWrapped)
        //Promise(data, photos) -> Firebase (& OK|FAIL transact.)
    };
    const UpdateSpot = () => {
        const updatedSpotWrapped = WrapSpotData({ updStatus: true });
        console.log("Updating updatedSpotWrapped: ", updatedSpotWrapped)
        //verify photos changed(/not) vv
        //|- run process prepPics
        //Promise (data, (/photos) ) -> Firebase (& OK|FAIL)
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
            image: "N/A", //[ ] TODO some ref (?) into Storage/S3
            owner: user?.uid  || "", //[x] TODO fill from Firebase profile
            socials: socials || [],
            tags: [], //[ ] TODO Implement FE on Form 
            title: titleRef.current?.value || "",
            visible: updStatus, //[x] Add->false, Update->true
        },
        type: "Feature" //[x] Always Feature
    });
    const PrepPics = (): any => ({
        //dadada, do after E-shop is prototyped for all (in loop 3x) via the ext.
        //https://www.npmjs.com/package/browser-image-compression
    });
    const DebugPopulateDummySpot = () => {
        console.log("DebugPopulateDummySpot() called");
    
        if (titleRef.current) titleRef.current.value = "Sample Spot";
        if (descriptionRef.current) descriptionRef.current.value = "This is a dummy description for a spot.";
        if (addressRef.current) addressRef.current.value = "123 Sample Street";
        if (cityRef.current) cityRef.current.value = "Sample City";
        if (postalCodeRef.current) postalCodeRef.current.value = "12345";
        //...TODO rest vv
        //...TODO images & socials
    };

    //
    const user = useSelector((state: RootState) => state.misc.user);
    //TODO |mby solved| AddSpot and UpdateSpot - if link!==null -> ref HTML replace instead of '' when wrapping
    return (
        <React.Fragment>
            <React.Fragment>
                {/* 5 Fields */}
                <Box mt={2}>
                    <Typography variant="h2" component="h5">Title</Typography>
                    <TextField
                        fullWidth
                        inputRef={titleRef}
                        defaultValue={edit ? merchant?.title : ""}
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
                {/* Map - picker */}
                <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef2} style={{ height: "22vh", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker
                        position={position}
                        draggable={true}
                        eventHandlers={{
                            dragend: handleDragEnd,
                        }}
                        icon={L.icon({
                            iconUrl: group13,
                            //iconSize: [32, 32], // Customize size
                            //iconAnchor: [16, 32], // Adjust anchor to center-bottom
                            //popupAnchor: [0, -32], // Adjust popup anchor
                        })}
                    />
                </MapContainer>
                <div style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '18px'}}>Drag pin to more precise location</div>
            </Box>
            <HrGreyCustomSeparator/>
            <Box mt={2}>
                {/* Socials */}
                {socials.map((social) => (
                    <ToggleSocialInput
                        key={social.network}
                        social={social}
                        switchLinkTo={(newLink) => handleLinkOpened(social.network, newLink)}
                    />
                ))}
            </Box>
            <HrGreyCustomSeparator/>
            <Box mt={2}>
                {/* Upload images */}
                <Typography variant="h2" component="h5"></Typography>
                <UploadingImagesSpot files={files} setFiles={setFiles} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                { /* Buttons down the form */}
                {debug && (
                    <ButtonUniversal
                        title={"Populate-dummy-spot ^"}
                        color="#F23CFF"
                        textColor="white"
                        actionDelegate={DebugPopulateDummySpot}
                    />
                )}
                {FuncCancel && (
                    <ButtonUniversal
                        title="Cancel"
                        color="#8000FF"
                        textColor="white"
                        actionDelegate={FuncCancel}
                    />
                )}
                <ButtonUniversal
                    title={edit ? "Save" : "Add"}
                    color="#F23CFF"
                    textColor="white"
                    actionDelegate={edit ? UpdateSpot : AddSpot}
                />
            </Box>
        </React.Fragment>
    );
};

export default ModifFormSpot;
