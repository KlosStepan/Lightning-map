////typescript
// filepath: /home/stepo/projects/Lightning-map/src/components/HomepageEvidenceSection.tsx
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
        <Grid item xs={6} sm={6} md={6}>
          <TileTypeMerchant
            caption="Map of Places"
            numPlaces={merchants}      // 0 stays 0, undefined stays undefined
            imageSrc={mapofspotsPic}
            path="/map"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <TileTypeMerchant
            caption="E-shops"
            numPlaces={eshops}         // same here
            imageSrc={eshopsPic}
            path="/e-shops"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomepageEvidenceSection;