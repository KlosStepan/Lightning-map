import React, { useRef, useState } from "react";
//MUI
import { Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
//Components
import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import UploadingImagesSpot from "../components/UploadingImagesSpot";
//TypeScript
import IMerchant from "../ts/IMerchant";
import ISocial from "../ts/ISocial";
//Map stuff
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import group13 from '../icons/group13.png';

//Separator instead of <hr/>
const HrGreyCustomSeparator = () => (
    <div style={{ borderTop: '1px solid #D3D3D3', width: '100%', margin: '20px 0' }} />
);

//ModifFormSpot <- props
type ModifFormSpotProps = {
    edit?: boolean;
    merchant?: IMerchant;
    FuncCancel: () => void;
};

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false, merchant, FuncCancel }) => {
    //Fields
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    //Map
    const mapRef2 = useRef(null);
    const latitude = 50.0755; //<- TODO dynamically in the city (?)
    const longitude = 14.4378; //<- TODO dynamically in the city (?)
    const [position, setPosition] = useState<[number, number]>([50.0755, 14.4378]); // Default position
    const handleDragEnd = (event: L.DragEndEvent) => {
        const marker = event.target as L.Marker;
        const newPosition = marker.getLatLng();
        setPosition([newPosition.lat, newPosition.lng]);
    };
    //Socials
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: null },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: null },
        { network: "twitter", label: "X", link: null },
        { network: "threads", label: "@", link: null },
    ]);
    const handleLinkOpened = (network: string, newLink: string | null) => {
        setSocials((prevSocials) =>
            prevSocials.map((social) =>
                social.network === network ? { ...social, link: newLink } : social
            )
        );
    };
    //Upload images
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

    // Add and Update functions
    const AddSpot = () => {
        const newMerchant: IMerchant = {
            type: "Feature",
            geometry: {
                coordinates: [0, 0],
                type: "Point",
            },
            properties: {
                owner: undefined,
                visible: true,
                image: "",
                title: titleRef.current?.value || "",
                description: descriptionRef.current?.value || "",
                address: {
                    address: addressRef.current?.value || "",
                    city: cityRef.current?.value || "",
                    postalCode: postalCodeRef.current?.value || "",
                },
                tags: [],
                socials: [],
            },
        };
        console.log("Adding spot:", newMerchant);
        // Insert logic to add the spot here
    };
    const UpdateSpot = () => {
        if (merchant) {
            const updatedMerchant: IMerchant = {
                ...merchant,
                properties: {
                    ...merchant.properties,
                    title: titleRef.current?.value || merchant.properties.title,
                    description: descriptionRef.current?.value || merchant.properties.description,
                    address: {
                        address: addressRef.current?.value || merchant.properties.address.address,
                        city: cityRef.current?.value || merchant.properties.address.city,
                        postalCode: postalCodeRef.current?.value || merchant.properties.address.postalCode,
                    },
                },
            };
            console.log("Updating spot:", updatedMerchant);
            // Insert logic to update the spot here
        }
    };

    //TODO AddSpot and UpdateSpot - if link!==null -> ref HTML replace instead of '' when wrapping

    return (
        <React.Fragment>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Title</Typography>
                <TextField
                    fullWidth
                    inputRef={titleRef}
                    defaultValue={edit ? merchant?.properties.title : ""}
                />
            </Box>
            <Box mt={2}>
                <Typography variant="h2" component="h5">Description</Typography>
                <TextField
                    fullWidth
                    inputRef={descriptionRef}
                    defaultValue={edit ? merchant?.properties.description : ""}
                    multiline
                    minRows={3}
                    maxRows={5}
                />
            </Box>
            <HrGreyCustomSeparator />
            <Box mt={2}>
                <Typography variant="h2" component="h5">Address</Typography>
                <TextField
                    fullWidth
                    inputRef={addressRef}
                    defaultValue={edit ? merchant?.properties.address.address : ""}
                />
            </Box>
            <Box mt={2}>
            <Typography variant="h2" component="h5">City</Typography>
                <TextField
                    fullWidth
                    inputRef={cityRef}
                    defaultValue={edit ? merchant?.properties.address.city : ""}
                />
            </Box>
            <Box mt={2}>
            <Typography variant="h2" component="h5">Postal Code</Typography>
                <TextField
                    fullWidth
                    inputRef={postalCodeRef}
                    defaultValue={edit ? merchant?.properties.address.postalCode : ""}
                />
            </Box>
            <Box mt={2}>
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
                <div  style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '18px'}}>Drag pin to more precise location</div>
            </Box>
            <HrGreyCustomSeparator />
            <Box mt={2}>
                {socials.map((social) => (
                    <ToggleSocialInput
                        key={social.network}
                        social={social}
                        switchLinkTo={(newLink) => handleLinkOpened(social.network, newLink)}
                    />
                ))}
            </Box>
            <HrGreyCustomSeparator />
            <Box mt={2}>
                <Typography variant="h2" component="h5"></Typography>
                <UploadingImagesSpot files={files} setFiles={setFiles} />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
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
