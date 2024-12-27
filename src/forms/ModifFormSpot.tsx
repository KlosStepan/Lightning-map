import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import IMerchant from "../ts/IMerchant";
import {useDropzone} from 'react-dropzone';
import uploadIcon from '../icons/upload.png';
import ISocial from "../ts/ISocial";

type ModifFormSpotProps = {
    edit?: boolean;
    merchant?: IMerchant;
    FuncCancel: () => void;
};

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false, merchant, FuncCancel }) => {
    // useRef hooks for each input field
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: 'www.something.com' },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: null },
        { network: "twitter", label: "X", link: null },
        { network: "threads", label: "@", link: null },
    ]);

    // Handle toggling link state
    const handleLinkOpened = (network: string, newLink: string | null) => {
        setSocials((prevSocials) =>
            prevSocials.map((social) =>
                social.network === network ? { ...social, link: newLink } : social
            )
        );
    };
    /*const socials: ISocial[] = [
        {
          "network": "web",
          "label": "Web",
          "link": null
        },
        {
          "network": "facebook",
          "label": "FB",
          "link": null
        },
        {
          "network": "instagram",
          "label": "IG",
          "link": null
        },
        {
          "network": "twitter",
          "label": "X",
          "link": null
        },
        {
          "network": "threads",
          "label": "@",
          "link": null
        }
    ]*/

    //handleLinkOpened <- TODO function that would switch for ex. network: instagram to link: '' or link :'' and also .slice array so state gets updated and stuff
      
    //Upload imgs
    //AUX stuff
    const onDrop = (acceptedFiles: any) => {
        console.log(acceptedFiles);
    };
    //AUX
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop/*, multiple: false*/ });
    //
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

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

            <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>Map</Box>
            <div  style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '22px'}}>Drag pin to more precise location</div>
            
            <hr />

            <Box mt={2}>
                {/* Example ToggleSocialInput fields */}
                {/*
                <ToggleSocialInput name="IG" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "instagram")?.link || "" : ""} />
                <ToggleSocialInput name="FB" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "facebook")?.link || "" : ""} />
                */}
                {/*<ToggleSocialInput*/}
                {socials.map((social) => (
                    <ToggleSocialInput
                        key={social.network}
                        social={social}
                        switchLinkTo={(newLink) => handleLinkOpened(social.network, newLink)}
                    />
                ))}
            </Box>

            {/*
                <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>Upload Img</Box>
            */}

            <hr />

            <Box mt={2}>
                <Typography variant="h2" component="h5"></Typography>
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})} style={{border: '1px solid #000', margin: '1px 1px !important', textAlign: 'center'}}>
                        <input {...getInputProps()} />
                        {/*<p>&nbsp; Drag 'n' drop logo file here, or click to select file</p>*/}
                        <Box
                            component="img"
                            src={uploadIcon}
                            alt="Upload Icon"
                            sx={{
                                width: 20,
                                height: 20,
                            }}
                        />
                        &nbsp;
                        <span style={{fontFamily: 'PixGamer', fontSize: '22px'}}>Upload image</span>
                    </div>
                    <aside>
                        <h4>Selected file</h4>
                        <ol>{files}</ol>
                    </aside>
                </section>
            </Box>
            {/* Action Buttons */}
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
