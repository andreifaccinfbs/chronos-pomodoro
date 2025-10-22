import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

type AvailableThemes = "dark" | "light"; // Digo que o tipo da minha variavel vai ser dark ou light

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem("theme") as AvailableThemes) || "dark";
    return storageTheme;

    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  // Começo o processo de escolher o tema do site
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault(); // não segue o link, faz contiuar na pagina

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    }); // o que retonar nessa função, é o valor do tema atual
  }
  // Escolha do tema finalizado
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]); // executa apenas quando o valor de theme muda

  return (
    <nav className={styles.menu}>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ver Historico"
        title="Ver Historico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para as Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar Tema"
        title="Mudar Tema"
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
