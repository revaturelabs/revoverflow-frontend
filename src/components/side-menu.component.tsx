/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import Typography from "@material-ui/core/Typography";
import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { Box } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                zIndex: theme.zIndex.drawer + 1,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        drawerContainer: {
            overflow: 'auto',
        },
    })
);
interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}
export function SideMenuComponent(props: Props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const history = useHistory();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Typography variant="h6" noWrap>
                Menu
        </Typography>
            {/* <Divider /> */}
            <List>
                {["Feed"].map((text, index) => (
                    <ListItem
                        onClick={() => history.push("/feed")}
                        style={{ color: "#F26925" }}
                        button
                        key={text}
                    >
                        <ListItemIcon>
                            <LiveHelpIcon
                                onClick={() => history.push("/feed")}
                                style={{ color: "#F26925" }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                {["Post A Question"].map((text, index) => (
                    <ListItem
                        onClick={() => {
                            history.push("/question");
                        }}
                        style={{ color: "#F26925" }}
                        button
                        key={text}
                    >
                        <ListItemIcon>
                            <QuestionAnswerIcon
                                onClick={() => {
                                    history.push("/question");
                                }}
                                style={{ color: "#F26925" }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const container =
        window !== undefined ? () => window().document.body : undefined;
    return (
        <Box className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </Box>
    );
}
