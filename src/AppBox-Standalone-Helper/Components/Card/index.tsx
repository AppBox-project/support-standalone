import { Divider, Typography } from "@material-ui/core";
import React from "react";
import styles from "./styles.module.scss";

const Card: React.FC<{
  children;
  hoverable?: true | boolean;
  title?: string;
  style?;
  centerTitle?: true;
  titleDivider?: true;
  withBigMargin?: true | boolean;
  withSmallMargin?: true | boolean;
  titleInPrimaryColor?: true | boolean;
  sideMarginOnly?: true | boolean;
  className?: string;
  withoutPadding?: boolean;
  image?: string;
  onClick?: () => void;
  overflow?: "none" | "auto" | "visible";
}> = ({
  children,
  withBigMargin,
  title,
  withoutPadding,
  centerTitle,
  titleDivider,
}) => {
  return (
    <div className={`Card ${styles.root}`}>
      <div style={{ padding: !withoutPadding && 15 }}>
        {title && (
          <>
            <Typography
              variant="h6"
              style={{
                textAlign: centerTitle ? "center" : "left",
              }}
            >
              {title}
            </Typography>
            {titleDivider && (
              <Divider style={{ marginBottom: 10, marginTop: 5 }} />
            )}
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
