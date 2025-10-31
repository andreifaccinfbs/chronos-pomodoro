import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";
import { ShiningButton } from "./ShiningButton";

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

  const currentPath = window.location.pathname;
  const isHomePage = currentPath === "/" || currentPath === "home";
  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Ir para a Home"
        title="Ir para a Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history"
        aria-label="Ver Historico"
        title="Ver Historico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings/"
        aria-label="Ir para as Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <ShiningButton
        href="https://flexbeesistemas.com.br/"
        title="Flexbee Sistemas"
        ariaLabel="Ir para o site da empresa"
        shouldShine={isHomePage}
      />

      <RouterLink
        className={styles.menuLink}
        href="#"
        aria-label="Mudar Tema"
        title="Mudar Tema"
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
