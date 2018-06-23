const mediaQuery = {
  phoneWidth: `30rem`,
  tabletWidth: `48rem`,
  laptopWidth: `70rem`,
  desktopWidth: `100rem`,
  phone: () => `@media only screen and (max-width: ${mediaQuery.phoneWidth})`,
  tablet: () => `@media only screen and (max-width: ${mediaQuery.tabletWidth})`,
  laptop: () => `@media only screen and (max-width: ${mediaQuery.laptopWidth})`,
  desktop: () => `@media only screen and (max-width: ${mediaQuery.desktopWidth})`,
  minPhone: () => `@media only screen and (min-width: ${mediaQuery.phoneWidth})`,
  minTablet: () => `@media only screen and (min-width: ${mediaQuery.tabletWidth})`,
  minLaptop: () => `@media only screen and (min-width: ${mediaQuery.laptopWidth})`,
  minDesktop: () => `@media only screen and (min-width: ${mediaQuery.desktopWidth})`,
}

export default mediaQuery