import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import IMerchant from "../ts/IMerchant";

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
            
            <hr />

            <Box mt={2}>
                {/* Example ToggleSocialInput fields */}
                {/* <ToggleSocialInput name="IG" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "instagram")?.link || "" : ""} />
                <ToggleSocialInput name="FB" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "facebook")?.link || "" : ""} /> */}
            </Box>

            <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>Upload Img</Box>

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
