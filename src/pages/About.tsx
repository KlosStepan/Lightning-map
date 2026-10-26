import React from "react";
// Components
import Footer from "../components/Footer";
// MUI
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
// Redux + RTK
import { useSelector } from "react-redux";
import { RootState } from "../redux-rtk/store";
// Router
import { useNavigate } from "react-router-dom";
// Images for funky body of Our Mission
import img1Magnet from "../img/Interface-Essential-Magnet--Streamline-Pixel-2.png";
import img2Comeback from "../img/Hand-Love--Streamline-Pixel-2.png";
import lightningconnects from "../img/mempool-space-ln-stats-worldmap-channels.jpg";
// Images for pioneer tiles
import about0pizzaguy from "../img/about/9566-960-1492.jpg";
import about1rossulbricht from "../img/about/about1rossulbricht.jpg";
import about2paralelnipolis from "../img/about/about2paralelnipolis.jpeg";
import about3bluepigveganshop from "../img/about/about3bluepigveganshop.jpg";
import about4lightningeverywhere from "../img/lightning-everywhere.png";

const PINK = "#F23CFF";
const PURPLE = "#8000FF";
const BITCOIN_ORANGE = "#F7931A";
const TEXT_GREY = "#4B5563";
const BODY_FONT = "'IBM Plex Sans Condensed', sans-serif";

// All 6 pioneer tiles fit in one row only on wide screens; below that they stack vertically
const WIDE = "@media (min-width: 1700px)";
// Pixel dotted path, white squares on pink
const DOTS_X = "repeating-linear-gradient(90deg, white 0 6px, transparent 6px 14px)";
const DOTS_Y = "repeating-linear-gradient(180deg, white 0 6px, transparent 6px 14px)";

const tileBox = {
    borderRadius: "24px",
    backgroundColor: "white",
    overflow: "hidden",
};

// "YOUR business!" hover: a small pixel confetti burst, played once per hover
const burst = keyframes`
    0% { transform: translate(-50%, -50%); opacity: 1; }
    70% { opacity: 1; }
    100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))); opacity: 0; }
`;
const CONFETTI_COLORS = ["white", PURPLE, BITCOIN_ORANGE, "#FFE600"];
const confetti = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * 2 * Math.PI;
    const dist = i % 2 === 0 ? 58 : 38;
    return {
        dx: Math.round(Math.cos(angle) * dist),
        dy: Math.round(Math.sin(angle) * dist),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: i % 3 === 0 ? 6 : 4,
    };
});

type Pioneer = {
    title: string;
    year: string;
    meanOfPayment: ("bitcoin" | "lightning")[];
    description: string;
    image: string;
    logo?: boolean; // wide logo -> contain instead of cover
};

const tiles: Pioneer[] = [
    {
        title: "The Pizza Guy",
        year: "2010",
        meanOfPayment: ["bitcoin"],
        description:
            "Laszlo Hanyecz made the first Bitcoin purchase, buying two pizzas for 10,000 BTC.",
        image: about0pizzaguy,
    },
    {
        title: "Ross Ulbricht Silk Road",
        year: "2011",
        meanOfPayment: ["bitcoin"],
        description:
            "Ross created Silk Road, demonstrating Bitcoin’s use for anonymous online commerce.",
        image: about1rossulbricht,
    },
    {
        title: "Paralelní Polis",
        year: "2014",
        meanOfPayment: ["bitcoin", "lightning"],
        description:
            "This Czech hub promoted Bitcoin and Lightning payments alongside education and art.",
        image: about2paralelnipolis,
    },
    {
        title: "Blue Pig Vegan Shop",
        year: "2018",
        meanOfPayment: ["bitcoin", "lightning"],
        description:
            "One of the first shops accepting Bitcoin and Lightning, enabling local crypto spending.",
        image: about3bluepigveganshop,
    },
    {
        title: "Lightning Everywhere",
        year: "2022",
        meanOfPayment: ["bitcoin", "lightning"],
        description:
            "A global push to expand Lightning adoption for faster Bitcoin payments worldwide.",
        image: about4lightningeverywhere,
        logo: true,
    },
];

const PaymentBadge: React.FC<{ mean: "bitcoin" | "lightning" }> = ({ mean }) => (
    <Box
        component="span"
        title={mean === "bitcoin" ? "Bitcoin" : "Lightning"}
        sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: mean === "bitcoin" ? BITCOIN_ORANGE : PURPLE,
            color: "white",
            fontSize: "13px",
            fontWeight: 700,
            userSelect: "none",
        }}
    >
        {mean === "bitcoin" ? (
            <Box component="span" sx={{ display: "inline-block", transform: "rotate(14deg)" }}>
                ₿
            </Box>
        ) : (
            <PixelBolt />
        )}
    </Box>
);

// Plain white pixel lightning bolt (6x7 pixels), instead of the yellow ⚡ emoji
const PixelBolt: React.FC = () => {
    const rows = ["....##", "...##.", "..##..", ".#####", "...##.", "..##..", ".##..."];
    return (
        <svg viewBox="0 0 12 14" width={12} height={14} aria-hidden>
            {rows.flatMap((row, y) =>
                row
                    .split("")
                    .map((c, x) =>
                        c === "#" ? (
                            <rect
                                key={`${x}-${y}`}
                                x={x * 2}
                                y={y * 2}
                                width={2}
                                height={2}
                                fill="white"
                            />
                        ) : null
                    )
            )}
        </svg>
    );
};

// Simple push pin (white head, grey needle), slightly tilted
const Pin: React.FC = () => (
    <Box
        component="svg"
        viewBox="0 0 24 36"
        aria-hidden
        sx={{ width: 30, height: 45, display: "block", transform: "rotate(20deg)" }}
    >
        <line x1="12" y1="16" x2="12" y2="34" stroke="#6B7280" strokeWidth="2" />
        <circle cx="12" cy="10" r="8" fill="white" stroke="#C9C9C9" strokeWidth="1.5" />
    </Box>
);

// Pixel-art arrow head (white squares), pointing down on narrow screens and right on wide ones
const PixelArrow: React.FC = () => {
    const px = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [2, 4],
        [1, 5],
        [0, 6],
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 3],
        [3, 4],
        [2, 5],
        [1, 6],
    ];
    return (
        <Box
            component="svg"
            viewBox="0 0 20 28"
            aria-hidden
            sx={{
                width: 20,
                height: 28,
                display: "block",
                transform: "rotate(90deg)",
                [WIDE]: { transform: "none" },
            }}
        >
            {px.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x * 4} y={y * 4} width={4} height={4} fill="white" />
            ))}
        </Box>
    );
};

const Connector: React.FC = () => (
    <Box
        aria-hidden
        sx={{
            position: "relative",
            zIndex: 1,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            [WIDE]: { width: 28, height: "auto", alignItems: "flex-start", pt: "61px" },
        }}
    >
        <PixelArrow />
    </Box>
);

const PioneerTile: React.FC<{ tile: Pioneer }> = ({ tile }) => (
    <Box
        sx={{
            ...tileBox,
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            [WIDE]: { flexDirection: "column", flex: "1 1 0", minWidth: 0 },
        }}
    >
        <Box
            component="img"
            src={tile.image}
            alt={tile.title}
            sx={{
                display: "block",
                objectFit: tile.logo ? "contain" : "cover",
                backgroundColor: tile.logo ? "#F0F0F0" : undefined,
                p: tile.logo ? 2 : 0,
                boxSizing: "border-box",
                width: { xs: "100%", sm: 180 },
                height: { xs: 160, sm: "auto" },
                minHeight: { sm: 150 },
                flexShrink: 0,
                [WIDE]: { width: "100%", height: 150, minHeight: 0 },
            }}
        />
        <Box sx={{ p: 2 }}>
            <Typography
                component="span"
                variant="h3"
                sx={{ display: "block", fontSize: "26px", lineHeight: 1, color: "black", mb: 0.5 }}
            >
                {tile.year}
            </Typography>
            <Typography
                variant="h3"
                component="h3"
                sx={{ fontSize: "21px", lineHeight: 1.1, mb: 1, [WIDE]: { minHeight: "2.2em" } }}
            >
                {tile.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.75, mb: 1 }}>
                {tile.meanOfPayment.map((mean) => (
                    <PaymentBadge key={mean} mean={mean} />
                ))}
            </Box>
            <Typography
                sx={{ fontFamily: BODY_FONT, color: TEXT_GREY, fontSize: "15px", lineHeight: 1.5 }}
            >
                {tile.description}
            </Typography>
        </Box>
    </Box>
);

type AboutProps = {
    //
};

const About: React.FC<AboutProps> = () => {
    const navigate = useNavigate();
    //
    const user = useSelector((state: RootState) => state.misc.user);
    const merchants = useSelector((state: RootState) => state.data.merchants);
    const eshops = useSelector((state: RootState) => state.data.eshops);
    //
    const spotsCount = merchants?.filter((m) => m.properties.visible).length;
    const eshopsCount = eshops?.filter((e) => e.visible).length;

    const FuncAddBusiness = () => navigate(user ? "/admin/my-spots" : "/login");

    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: PINK,
                    borderRadius: "24px",
                    overflow: "hidden",
                    mt: 2,
                    pb: { xs: 3, md: 5 },
                }}
            >
                {/* OUR MISSION ⚡ - static row, clipped at the edges */}
                <Typography
                    variant="h1"
                    component="h1"
                    aria-label="Our mission"
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "center",
                        py: 1.5,
                        mx: { xs: 2, md: 3 },
                        borderBottom: "3px dashed rgba(255, 255, 255, 0.8)",
                    }}
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Box component="span" key={i} sx={{ px: 1.5 }} aria-hidden>
                            OUR MISSION <span style={{ color: "white" }}>⚡</span>
                        </Box>
                    ))}
                </Typography>

                <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, pt: { xs: 3, md: 4 } }}>
                    {/* Mission: icon | text + map | icon */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                        <Box
                            component="img"
                            src={img1Magnet}
                            alt=""
                            sx={{
                                width: 80,
                                height: 80,
                                alignSelf: "flex-start",
                                display: { xs: "none", md: "block" },
                            }}
                        />
                        <Box sx={{ flex: 1, maxWidth: 700 }}>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: BODY_FONT,
                                    fontSize: { xs: "16px", md: "18px" },
                                    lineHeight: 1.5,
                                    color: "black",
                                    textAlign: "center",
                                    maxWidth: { xs: 560, md: 600 },
                                    mx: "auto",
                                    my: 0,
                                }}
                            >
                                We help you find places that accept Lightning: your local café, a
                                cool shop or an online store. From grabbing a drink to buying
                                everyday stuff, spend Bitcoin where it actually works and make
                                Lightning useful in real life.
                            </Typography>
                            {/* Map pinned like a photo on a board */}
                            <Box
                                component="figure"
                                sx={{ position: "relative", mt: 2.5, mx: 0, mb: 0 }}
                            >
                                <Box
                                    component="img"
                                    src={lightningconnects}
                                    alt="Lightning Network channels on a world map"
                                    sx={{
                                        display: "block",
                                        width: "100%",
                                        boxSizing: "border-box",
                                        border: "2px solid white",
                                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
                                    }}
                                />
                                <Box sx={{ position: "absolute", top: -26, right: -10 }}>
                                    <Pin />
                                </Box>
                                <Typography
                                    component="figcaption"
                                    sx={{
                                        fontFamily: BODY_FONT,
                                        fontSize: "14px",
                                        color: "black",
                                        textAlign: "center",
                                        mt: 1,
                                    }}
                                >
                                    Lightning Network channels and connections around the world (via
                                    mempool.space)
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            component="img"
                            src={img2Comeback}
                            alt=""
                            sx={{
                                width: 80,
                                height: 80,
                                alignSelf: "flex-end",
                                display: { xs: "none", md: "block" },
                            }}
                        />
                    </Box>

                    {/* Pioneers: dotted pixel path from the first purchase to YOUR business */}
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        sx={{ fontSize: { xs: "24px", md: "30px" }, mt: { xs: 3, md: 4 }, mb: 2 }}
                    >
                        Pioneering usage throughout the industry &gt;&gt;&gt;
                    </Typography>
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: 760,
                            mx: "auto",
                            [WIDE]: { flexDirection: "row", maxWidth: "none" },
                        }}
                    >
                        {/* the path itself, visible between and around the tiles */}
                        <Box
                            aria-hidden
                            sx={{
                                position: "absolute",
                                zIndex: 0,
                                top: -16,
                                bottom: -16,
                                left: "calc(50% - 3px)",
                                width: 6,
                                backgroundImage: DOTS_Y,
                                [WIDE]: {
                                    top: 72,
                                    bottom: "auto",
                                    left: -40,
                                    right: -40,
                                    width: "auto",
                                    height: 6,
                                    backgroundImage: DOTS_X,
                                },
                            }}
                        />
                        {tiles.map((tile) => (
                            <React.Fragment key={tile.title}>
                                <PioneerTile tile={tile} />
                                <Connector />
                            </React.Fragment>
                        ))}
                        <Box
                            onClick={FuncAddBusiness}
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                borderRadius: "24px",
                                border: "3px dashed white",
                                backgroundColor: PINK,
                                color: "white",
                                textAlign: "center",
                                p: 3,
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                [WIDE]: { flex: "1 1 0", minWidth: 0 },
                                "&:hover .confetti": {
                                    animation: `${burst} 0.8s steps(8) forwards`,
                                },
                                "@media (prefers-reduced-motion: reduce)": {
                                    "&:hover .confetti": { animation: "none" },
                                },
                            }}
                        >
                            <Box sx={{ position: "relative", alignSelf: "center" }}>
                                <Typography
                                    variant="h1"
                                    component="span"
                                    sx={{ fontSize: "52px", lineHeight: 1 }}
                                >
                                    +
                                </Typography>
                                {confetti.map((c, i) => (
                                    <Box
                                        key={i}
                                        className="confetti"
                                        aria-hidden
                                        style={
                                            {
                                                "--dx": `${c.dx}px`,
                                                "--dy": `${c.dy}px`,
                                            } as React.CSSProperties
                                        }
                                        sx={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            width: c.size,
                                            height: c.size,
                                            backgroundColor: c.color,
                                            opacity: 0,
                                            pointerEvents: "none",
                                        }}
                                    />
                                ))}
                            </Box>
                            <Typography
                                variant="h3"
                                component="h3"
                                sx={{ fontSize: "24px", mt: 1 }}
                            >
                                YOUR business!
                            </Typography>
                            <Typography sx={{ fontFamily: BODY_FONT, fontSize: "15px", mt: 1 }}>
                                Join the map of pioneers accepting Lightning.
                            </Typography>
                        </Box>
                    </Box>

                    {/* The project */}
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                        sx={{ fontSize: { xs: "24px", md: "30px" }, mt: { xs: 4, md: 5 }, mb: 2 }}
                    >
                        The project
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                            gridTemplateColumns: { xs: "1fr 1fr", md: "2fr 1fr 1fr" },
                        }}
                    >
                        <Box sx={{ ...tileBox, p: 3, gridColumn: { xs: "1 / -1", md: "auto" } }}>
                            <Typography
                                variant="h3"
                                component="h3"
                                sx={{ fontSize: "24px", mb: 1 }}
                            >
                                Lightning Everywhere
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: BODY_FONT,
                                    color: TEXT_GREY,
                                    fontSize: "16px",
                                    lineHeight: 1.6,
                                }}
                            >
                                We collect merchants and e-shops that accept the Lightning Network
                                (Bitcoin L2) worldwide. The map is community driven: anyone can sign
                                up, with Google or e-mail, and pin the places they know.
                            </Typography>
                        </Box>
                        <StatTile
                            value={spotsCount}
                            label="Spots on the map"
                            onClick={() => navigate("/map")}
                        />
                        <StatTile
                            value={eshopsCount}
                            label="E-shops listed"
                            onClick={() => navigate("/e-shops")}
                        />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    );
};

type StatTileProps = {
    value: number | undefined;
    label: string;
    onClick: () => void;
};

const StatTile: React.FC<StatTileProps> = ({ value, label, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            ...tileBox,
            p: 3,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "&:hover .stat-label": { backgroundSize: "100% 3px" },
        }}
    >
        <Typography
            variant="h1"
            component="span"
            sx={{ fontSize: "52px", color: PURPLE, lineHeight: 1 }}
        >
            {value ?? "–"}
        </Typography>
        <Typography
            variant="h3"
            component="span"
            className="stat-label"
            sx={{
                alignSelf: "flex-start",
                fontSize: "21px",
                mt: 1,
                pb: "4px",
                // dashed pixel underline that "draws" from left to right in steps
                backgroundImage: `repeating-linear-gradient(90deg, ${PURPLE} 0 6px, transparent 6px 9px)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "0% 3px",
                transition: "background-size 0.5s steps(10)",
            }}
        >
            {label} &gt;
        </Typography>
    </Box>
);

export default About;
