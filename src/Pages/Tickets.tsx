import { Grid } from "@material-ui/core";
import React from "react";
import API from "../AppBox-Standalone-Helper/API";
import Card from "../AppBox-Standalone-Helper/Components/Card";

const Layout: React.FC<{ api: API; detailId?: string }> = ({
  api,
  detailId,
}) => {
  // Vars
  // Lifecycle
  // UI
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={detailId ? 3 : 12}>
        <Card withBigMargin>Test</Card>
      </Grid>
      {detailId && (
        <Grid item xs={12} md={9}>
          <Card withBigMargin>{detailId}</Card>
        </Grid>
      )}
    </Grid>
  );
};

export default Layout;
