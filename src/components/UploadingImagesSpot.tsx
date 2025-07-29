import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Grid } from "@mui/material";
import UplImgTile from "./UplImgTile";

import uploadIcon from '../icons/upload.png';

type UploadingImagesSpotProps = {
    files: Array<File & { preview: string }>;
    setFiles: React.Dispatch<React.SetStateAction<Array<File & { preview: string }>>>;
    multipleImages?: boolean;
    disabled?: boolean;
};

const UploadingImagesSpot: React.FC<UploadingImagesSpotProps> = ({ files, setFiles, multipleImages=true, disabled=false }) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: { "image/*": [] },
        onDrop: (acceptedFiles) => {
            if (disabled) return;
            if (!multipleImages && files.length === 1) {
                // Replace the existing image
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, { preview: URL.createObjectURL(file) })
                    )
                );
            } else {
                // Add new images to the existing list
                setFiles([
                    ...files,
                    ...acceptedFiles.map((file) =>
                        Object.assign(file, { preview: URL.createObjectURL(file) })
                    ),
                ]);
            }
        },
        multiple: multipleImages,
        disabled: disabled
    });

    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleMoveUp = (index: number) => {
        if (disabled || index === 0) return;
        if (index > 0) {
            const updatedFiles = [...files];
            [updatedFiles[index - 1], updatedFiles[index]] = [updatedFiles[index], updatedFiles[index - 1]];
            setFiles(updatedFiles);
        }
    };

    const handleMoveDown = (index: number) => {
        if (disabled || index === files.length - 1) return;
        if (index < files.length - 1) {
            const updatedFiles = [...files];
            [updatedFiles[index], updatedFiles[index + 1]] = [updatedFiles[index + 1], updatedFiles[index]];
            setFiles(updatedFiles);
        }
    };

    const handleDelete = (index: number) => {
        if (disabled) return;
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    const thumbs = files.map((file, index) => (
        <Grid item xs={index === 0 ? 12 : 6} key={file.name}>
            <UplImgTile
                previewSrc={file.preview}
                first={index === 0}
                last={index === files.length - 1}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
                onDelete={() => handleDelete(index)}
                //disabled={disabled}
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
                    opacity: disabled ? 0.5 : 1,
                    pointerEvents: disabled ? "none" : "auto",
                }}
            >
                <input {...getInputProps()} />
                    {isDragAccept && (<p>File(s) will be accepted</p>)} {/* All files will be accepted */}
                    {isDragReject && (<p>File(s) will be rejected</p>)} {/* Some files will be rejected */}
                    {!isDragActive && (
                        <p>
                            <img src={uploadIcon} height={18} width={18} alt="Upload icon" /> &nbsp; 
                            {multipleImages ? "Upload images" : "Upload image"}
                        </p>
                    )}
            </div>
            <aside style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: 16 }}>{thumbs}</aside>
        </section>
    );
};

export default UploadingImagesSpot;
