import React, { useRef, useState } from "react";
import ADMenu from "../components/ADMenu";
import ButtonUniversal from "../components/ButtonUniversal";
import HrGreyCustomSeparator from "../components/HrGreyCustomSeparator";
import { ButtonColor } from "../enums";
import Typography from '@mui/material/Typography';
import { Grid, Box, useMediaQuery, useTheme, TextField } from '@mui/material';
import { RootState } from "../redux-rtk/store";
import { useSelector } from "react-redux";

type ADTestAwsSesProps = {};
const ADTestAwsSes: React.FC<ADTestAwsSesProps> = () => {
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
    const DEBUG = useSelector((state: RootState) => state.misc.debug);
    const apiBaseUrl = useSelector((state: RootState) => state.misc.apiBaseUrl);

    const emailRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);

    const [isSending, setIsSending] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const populateDummyEmail = () => {
        if (emailRef.current) emailRef.current.value = "your-verified-sandbox-email@example.com";
        if (subjectRef.current) subjectRef.current.value = "Test Subject";
        if (bodyRef.current) bodyRef.current.value = "This is a test email body.";
    };

    const handleSend = async () => {
        const to = emailRef.current?.value || "";
        const subject = subjectRef.current?.value || "";
        const body = bodyRef.current?.value || "";

        if (!to || !subject || !body) {
            setResult("Please fill in all fields.");
            return;
        }

        setIsSending(true);
        setResult(null);

        try {
            const res = await fetch(`${apiBaseUrl}/test-aws-ses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ to, subject, body }),
            });
            console.log("<DEBUG>");
            console.log("stringified request body:", { to, subject, body });
            console.log("</DEBUG>");
            if (res.ok) {
                const json = await res.json();
                console.log("test-aws-ses response JSON:", json);
                setResult("Email sent! (Check your sandbox inbox)");
            } else {
                const txt = await res.text().catch(() => "");
                setResult(`Failed: ${res.status} ${txt}`);
            }
        } catch (err) {
            setResult("Network error");
        } finally {
            setIsSending(false);
        }
    };

    const clearFields = () => {
        if (emailRef.current) emailRef.current.value = "";
        if (subjectRef.current) subjectRef.current.value = "";
        if (bodyRef.current) bodyRef.current.value = "";
    };
    return (
        <React.Fragment>
            <Grid container>
                {!isPhone && (
                    <Grid item xs={3}>
                        <Box sx={{ padding: 2 }}>
                            <ADMenu />
                        </Box>
                    </Grid>
                )}
                <Grid item md={9} xs={12}>
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h1" component="h1">
                            Test AWS SES
                        </Typography>
                        <Box sx={{ mt: 2, maxWidth: 500 }}>
                            <Typography variant="h2" component="h5">To &nbsp; (email)</Typography>
                            <TextField
                                fullWidth
                                inputRef={emailRef}
                                sx={{ mb: 2 }}
                                placeholder="Fill out email@address.com"
                            />
                            <Typography variant="h2" component="h5">Subject</Typography>
                            <TextField
                                fullWidth
                                inputRef={subjectRef}
                                sx={{ mb: 2 }}
                                placeholder="Some subject..."
                            />
                            <Typography variant="h2" component="h5">Body</Typography>
                            <TextField
                                fullWidth
                                inputRef={bodyRef}
                                sx={{ mb: 2 }}
                                placeholder="Some body..."
                                multiline
                                minRows={3}
                                maxRows={5}
                            />
                            <HrGreyCustomSeparator marginTop={10} marginBottom={10} />
                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                {DEBUG && (
                                    <ButtonUniversal
                                        title={"Populate-dummy-email ^"}
                                        color={ButtonColor.Pink}
                                        hoverColor={ButtonColor.PinkHover}
                                        textColor="white"
                                        actionDelegate={populateDummyEmail}
                                    />
                                )}
                                <ButtonUniversal
                                    title="Clear"
                                    color={ButtonColor.Purple}
                                    hoverColor={ButtonColor.PurpleHover}
                                    textColor="white"
                                    actionDelegate={clearFields}
                                />
                                <ButtonUniversal
                                    title={isSending ? "Sending..." : "Send"}
                                    color={ButtonColor.Pink}
                                    hoverColor={ButtonColor.PinkHover}
                                    textColor="white"
                                    actionDelegate={handleSend}
                                    disabled={isSending}
                                />
                            </Box>
                            {result && (
                                <Typography sx={{ mt: 2 }} color={result.startsWith("Email sent") ? "success.main" : "error.main"}>
                                    {result}
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="body2" sx={{ mt: 4, color: "#888" }}>
                            Note: In AWS SES sandbox, you can only send to pre-verified emails.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {isPhone && <ADMenu />}
        </React.Fragment>
    );
};

export default ADTestAwsSes;