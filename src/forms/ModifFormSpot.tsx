import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import IMerchant from "../ts/IMerchant";

type ModifFormSpotProps = {
    edit?: boolean;
    merchant?: IMerchant;
    FuncCancel: () => void;
    //onSave: (merchant: IMerchant) => void;
};

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false, merchant, FuncCancel /*, onSave*/ }) => {
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
                coordinates: [0, 0], // Replace with actual coordinates if needed
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
                tags: [], // Populate as needed
                socials: [], // Set socials as needed or via ToggleSocialInput
            },
        };
        //onSave(newMerchant);
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
                    // Update socials if needed through ToggleSocialInput refs or state
                },
            };
            //onSave(updatedMerchant);
        }
    };

    return (
        <React.Fragment>
            <div>-table of items of datatype IMerchant(/props) goes here-</div>
            <Typography variant="h2">{edit ? "Edit Spot" : "Add New Spot"}</Typography>

            <Box mt={2}>
                <Typography variant="h6">Title</Typography>
                <Input
                    placeholder="Title"
                    defaultValue={edit ? merchant?.properties.title : ""}
                    inputRef={titleRef}
                    fullWidth
                />
            </Box>

            <Box mt={2}>
                <Typography variant="h6">Description</Typography>
                <Input
                    placeholder="Description"
                    defaultValue={edit ? merchant?.properties.description : ""}
                    inputRef={descriptionRef}
                    fullWidth
                />
            </Box>

            <Box mt={2}>
                <Typography variant="h6">Address</Typography>
                <Input
                    placeholder="Address"
                    defaultValue={edit ? merchant?.properties.address.address : ""}
                    inputRef={addressRef}
                    fullWidth
                />
            </Box>

            <Box mt={2}>
                <Typography variant="h6">City</Typography>
                <Input
                    placeholder="City"
                    defaultValue={edit ? merchant?.properties.address.city : ""}
                    inputRef={cityRef}
                    fullWidth
                />
            </Box>

            <Box mt={2}>
                <Typography variant="h6">Postal Code</Typography>
                <Input
                    placeholder="Postal Code"
                    defaultValue={edit ? merchant?.properties.address.postalCode : ""}
                    inputRef={postalCodeRef}
                    fullWidth
                />
            </Box>

            <Box mt={2} sx={{ width: "100%", border: "1px solid #000" }}>Map</Box>
            
            <hr />

            <Box mt={2}>
                {/*<ToggleSocialInput name="IG" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "instagram")?.link || "" : ""} />
                <ToggleSocialInput name="FB" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "facebook")?.link || "" : ""} />
                <ToggleSocialInput name="X" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "twitter")?.link || "" : ""} />
                <ToggleSocialInput name="Threads" defaultValue={edit ? merchant?.properties.socials.find(s => s.network === "web")?.link || "" : ""} />*/}
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
                    title={edit ? "Save Changes" : "Add Spot"}
                    color={edit ? "#F23CFF" : "#8000FF"}
                    textColor="white"
                    actionDelegate={edit ? UpdateSpot : AddSpot}
                />
            </Box>
        </React.Fragment>
    );
};

export default ModifFormSpot;
