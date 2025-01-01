import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Grid, Box } from '@mui/material';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonUniversal from "../components/ButtonUniversal";
import ToggleSocialInput from "../components/ToggleSocialInput";
import IMerchant from "../ts/IMerchant";
import {useDropzone} from 'react-dropzone';
import uploadIcon from '../icons/upload.png';
import ISocial from "../ts/ISocial";
//
import { CSSProperties } from 'react';
//
import L from "leaflet";
import group10 from '../icons/group10.png';
import group13 from '../icons/group13.png';

const thumbsContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb: CSSProperties = {
    display: 'inline-flex',
    borderRadius: 2,
    //border: '1px solid #eaeaea',
    border: '1px solid #000000',
    marginBottom: 8,
    marginRight: 8,
    //width: 100,
    width: '49%',
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner: CSSProperties = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img: CSSProperties = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

type ModifFormSpotProps = {
    edit?: boolean;
    merchant?: IMerchant;
    FuncCancel: () => void;
};

const ModifFormSpot: React.FC<ModifFormSpotProps> = ({ edit = false, merchant, FuncCancel }) => {
    //NEW DROPZONE
    const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
    //const { getRootProps, getInputProps } = useDropzone({
    const { acceptedFiles, getRootProps, getInputProps,isDragActive, isDragAccept, isDragReject } = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    });
  
    const thumbs = files.map((file) => (
        <Grid item xs={6} key={file.name}> {/* 50% of the width */}
          <Box
            sx={{
              border: '1px solid #ccc', // Slightly darker border for better visibility
              borderRadius: 2, // Rounded corners for the tile
              //padding: 2, // Padding around the image container
              //marginBottom: 2, // Space between tiles
              margin: 1,
              textAlign: 'center',
              backgroundColor: '#f9f9f9', // Light background for better contrast
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            {/*<Box
              sx={{
                padding: 0, // Padding inside the container
                //border: '1px dashed #ddd', // Dashed border for inner container
                borderRadius: 2, // Slight rounding for the inner box
                overflow: 'hidden',
                backgroundColor: '#fff', // White background for the inner box
              }}
            >*/}
              <img
                src={file.preview}
                alt="Preview"
                style={{
                  width: '100%', // Smaller image size inside the container
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto', // Center the image horizontally
                }}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            {/*</Box>*/}
          </Box>
        </Grid>
      ));
      
  
    useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
  
    // useRef hooks for each input field
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const [socials, setSocials] = useState<ISocial[]>([
        { network: "web", label: "Web", link: 'www.something.com' },
        { network: "facebook", label: "FB", link: null },
        { network: "instagram", label: "IG", link: 'www.instagram.com/something' },
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
    //Map stuff misc
    const mapRef2 = useRef(null);
    const latitude = 50.0755;
    const longitude = 14.4378;
    //
    const [position, setPosition] = useState<[number, number]>([50.0755, 14.4378]); // Default position

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
    const handleDragEnd = (event: L.DragEndEvent) => {
        const marker = event.target as L.Marker;
        const newPosition = marker.getLatLng();
        setPosition([newPosition.lat, newPosition.lng]);
    };
    
    const saveToDatabase = () => {
        console.log("Saving position to database:", position);
        // Add logic to save latitude and longitude to your database
    };
    
    //handleLinkOpened <- TODO function that would switch for ex. network: instagram to link: '' or link :'' and also .slice array so state gets updated and stuff
      
    //Upload imgs
    //AUX stuff
    const onDrop = (acceptedFiles: any) => {
        console.log(acceptedFiles);
    };

    //AUX DROP
    //const {acceptedFiles, getRootProps, getInputProps,isDragActive, isDragAccept, isDragReject} = useDropzone({onDrop/*, multiple: false*/ });
    
    /*const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));*/


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
    const HrGreyCustomSeparator = () => (
        <div style={{ borderTop: '1px solid #D3D3D3', width: '100%', margin: '20px 0' }} />
    );
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
            &nbsp;
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
                        iconUrl: group13, // Replace with your icon's path
                        //iconSize: [32, 32], // Customize size
                        //iconAnchor: [16, 32], // Adjust anchor to center-bottom
                        //popupAnchor: [0, -32], // Adjust popup anchor
                    })}
                />
            </MapContainer>
            <div  style={{fontFamily: 'PixGamer', textAlign: 'center', fontSize: '18px'}}>Drag pin to more precise location</div>
            
            <HrGreyCustomSeparator />

            <Box mt={2}>
                {/* Example ToggleSocialInput fields */}
                {/*rag pin to more pre
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

            <HrGreyCustomSeparator />

            <Box mt={2}>
                <Typography variant="h2" component="h5"></Typography>
                {/*<section className="container">
                    <div {...getRootProps({className: 'dropzone'})} style={{border: '1px solid #FFF', borderRadius: '10px', backgroundColor: 'white', margin: '1px 1px !important', textAlign: 'center', fontFamily: 'PixGamer'}}>
                        <input {...getInputProps()} />
                        {isDragAccept && (<p>All files will be accepted</p>)}
                        {isDragReject && (<p>Some files will be rejected</p>)}
                        {!isDragActive && (<p><img src={uploadIcon} height={18} width={18}/> &nbsp; Upload image</p>)}
                    </div>
                    <aside>
                        <h4>Selected file</h4>
                        <ol>{files}</ol>
                    </aside>
                </section>*/}
                {/*<section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                </section>*/}
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})} style={{border: '1px solid #FFF', borderRadius: '10px', backgroundColor: 'white', margin: '1px 1px !important', textAlign: 'center', fontFamily: 'PixGamer'}}>
                        <input {...getInputProps()} />
                        {isDragAccept && (<p>All files will be accepted</p>)}
                        {isDragReject && (<p>Some files will be rejected</p>)}
                        {!isDragActive && (<p><img src={uploadIcon} height={18} width={18}/> &nbsp; Upload images</p>)}
                    </div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
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
