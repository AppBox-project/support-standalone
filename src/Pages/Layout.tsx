import { Grid } from "@material-ui/core";
import React from "react";
import API from "../AppBox-Standalone-Helper/API";
import styles from "./Layout.module.scss";

const Layout: React.FC<{ api: API; children }> = ({ api, children }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={styles.root}
      style={{
        backgroundImage: `url(${api?.config?.login?.background}`,
        backgroundColor: `rgba(${api?.config?.color?.r},${api?.config?.color?.g},${api?.config?.color?.b},0.6)`,
      }}
    >
      <Grid item xs={12} md={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
