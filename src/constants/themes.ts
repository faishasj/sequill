const enum Themes {
  Console = "themes/console.css",
  Modest = "themes/modest.css",
  Social = "themes/social.css",
}

export default Themes;

export const getThemeNames = () => ["Console", "Modest", "Social"];
export const getThemes = () => [Themes.Console, Themes.Modest, Themes.Social];
