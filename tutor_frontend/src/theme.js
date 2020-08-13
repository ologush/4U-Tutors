import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#348feb"
        },
        background: {
            default: "#303030",
            paper: "#348feb"
        }

    },
    typography: {
        fontFamily: 'Raleway, Arial'
    }
});

export default theme;