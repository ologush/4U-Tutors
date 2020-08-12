import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#002c73"
        },
        background: {
            default: "#303030",
            paper: "#002c73"
        }

    }
});

export default theme;