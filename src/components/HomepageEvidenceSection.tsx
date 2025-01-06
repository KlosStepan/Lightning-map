import React from "react";
import { Grid, Container } from "@mui/material";
import TileTypeMerchant from "../components/TileTypeMerchant";
import mapofspotsPic from '../img/Interface-Essential-Map--Streamline-Pixel.png';
import eshopsPic from '../img/Shopping-Shipping-Bag-1--Streamline-Pixel.png';

type HomepageEvidenceSectionProps = {
  merchants: number | undefined;
  eshops: number | undefined;
};

const HomepageEvidenceSection: React.FC<HomepageEvidenceSectionProps> = ({ merchants, eshops }) => {
  return (
    <Container id="HomepageEvidenceSection" maxWidth="lg">
      <Grid container spacing={2} justifyContent="space-between">
        {/* Grid item for Map of Places */}
        <Grid item xs={6} sm={6} md={6}>
          <TileTypeMerchant
            caption="Map of Places"
            numPlaces={merchants ? merchants : undefined}
            imageSrc={mapofspotsPic}
            path="/map"
          />
        </Grid>

        {/* Grid item for E-shops */}
        <Grid item xs={6} sm={6} md={6}>
          <TileTypeMerchant
            caption="E-shops"
            numPlaces={eshops ? eshops : undefined}
            imageSrc={eshopsPic}
            path="/e-shops"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomepageEvidenceSection;
