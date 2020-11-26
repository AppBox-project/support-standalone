import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import styles from "./styles.module.scss";

const Picture: React.FC<{
  image: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withShadow?: boolean;
  shadowRadius?: number;
  className?: string;
  style?: CSSProperties;
  fallBackOnLocalhost?: boolean;
}> = ({
  size,
  withShadow,
  image,
  shadowRadius,
  className,
  style,
  fallBackOnLocalhost,
}) => (
  <div
    className={`${styles[size]}${className ? ` ${className}` : ""}`}
    style={style}
  >
    <div
      className={`${styles.picture} ${withShadow && styles.withShadow}`}
      style={{
        backgroundImage: fallBackOnLocalhost
          ? image?.match("localhost")
            ? "url(https://picsum.photos/200)"
            : `url(${image})`
          : `url(${image || "https://picsum.photos/seed/13/300/400"})`,
      }}
    />
  </div>
);

export default Picture;
