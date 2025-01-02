import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Grid } from "@mui/material";
import UplImgTile from "./UplImgTile";

import uploadIcon from '../icons/upload.png';

type UploadingImagesSpotProps = {
    files: Array<File & { preview: string }>;
    setFiles: React.Dispatch<React.SetStateAction<Array<File & { preview: string }>>>;
};

const UploadingImagesSpot: React.FC<UploadingImagesSpotProps> = ({ files, setFiles }) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: {
            "image/*": [],
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const thumbs = files.map((file, index) => (
        <Grid item xs={index === 0 ? 12 : 6} key={file.name}>
            <UplImgTile 
                previewSrc={file.preview} 
                first={index === 0} 
                last={index === files.length - 1} 
            />
        </Grid>
    ));
    

    return (
        <section className="container">
            <div
                {...getRootProps({ className: "dropzone" })}
                style={{
                    border: "1px solid #FFF",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    margin: "1px 1px !important",
                    textAlign: "center",
                    fontFamily: "PixGamer",
                }}
            >
                <input {...getInputProps()} />
                    {isDragAccept && (<p>All files will be accepted</p>)}
                    {isDragReject && (<p>Some files will be rejected</p>)}
                    {!isDragActive && (<p><img src={uploadIcon} height={18} width={18}/> &nbsp; Upload images</p>)}
            </div>
            <aside style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 16 }}>{thumbs}</aside>
        </section>
    );
};

export default UploadingImagesSpot;
