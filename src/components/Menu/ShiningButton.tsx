import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import styles from "./ShiningButton.module.css";

interface ShiningButtonProps {
  href: string;
  title?: string;
  ariaLabel?: string;
  shouldShine?: boolean;
}

export function ShiningButton({
  href,
  title,
  ariaLabel,
  shouldShine,
}: ShiningButtonProps) {
  const [isPulsing, setIsPulsing] = useState(shouldShine || false);

  useEffect(() => {
    if (shouldShine) {
      setIsPulsing(true);

      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [shouldShine]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      aria-label={ariaLabel}
      className={`${styles.menuLink} ${isPulsing ? styles.pulseBorder : ""}`}
    >
      <Star className={styles.starIcon} />
    </a>
  );
}
