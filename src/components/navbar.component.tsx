/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

/**
 * @file Nanage the side menu component for the web application
 * @author Yurrian Pierre-Boyer
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { Drawer, AppBar, Toolbar, List } from "@material-ui/core";
import { CssBaseline, Typography, Divider, IconButton } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import * as loginRemote from '../remotes/login.remote'



const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#FFFFFF",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    orange: {
      color: "#F26925",
      fontSize: 40,
    },
    pointsDisplay: {
      color: "#F26925",
      fontSize: 30,
      paddingTop: 11,
    },
    imageDoor: {
      paddingBottom: 10,
    },
    arrangement: {
      display: "flex",
      justifyContent: "space-between",
    },
    arrangementInternal: {
      display: "flex",
      flexDirection: "row",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      color: "white",
      backgroundColor: "gray",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "white",
      fontWeight: "bolder",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);
export const NavbarComponent: React.FC<any> = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.removeItem("accessToken");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose()}>
        {" "}
        <Typography onClick={() => history.push("/")}> Log Out </Typography>
      </MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  const [points, setPoints] = useState<any>(0);
  const gettingPoints = localStorage.getItem("points");

  //update components when point change
  useEffect(() => {
    displayPoints();
  }, [points]);

  const displayPoints = async () => {
    if (gettingPoints) {
      try {
        const response = await loginRemote.getUserById(
          +JSON.parse(JSON.stringify(localStorage.getItem("userId")))
        );
        localStorage.setItem("points", JSON.stringify(response.data.points));
      } catch {
        alert("Couldnt retrieve points");
      }
      setPoints(localStorage.getItem("points"));
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.arrangement}>
          <Box className={classes.arrangementInternal}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, classes.orange, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Box className={classes.imageDoor}>
              <img
                src={require("../logo/image.png")}
                height={40}
                width={100}
                alt="pop"
              />
            </Box>
          </Box>

          <Box id="profile-icon-box" className={classes.arrangementInternal}>
            <IconButton
              id="profile-icon-button"
              edge="start"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle className={classes.orange} />
            </IconButton>

            <Typography className={classes.pointsDisplay} variant="h4">
              Points: {points}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Feed"].map((text, index) => (
            <ListItem
              id="feedTab"
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
          <Divider />
          {["Post A Question"].map((text, index) => (
            <ListItem
              id="postQuestionTab"
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
          <Divider />
          {["FAQ"].map((text, index) => (
            <ListItem
              onClick={() => {
                history.push("/faq")
              }}
              style={{ color: "#F26925" }}
              button
              key={text}
              >
                

              <ListItemIcon>
                <RecordVoiceOverIcon
                  onClick={() => {
                    history.push("/faq")}} style={{ color: "#F26925" }}>
                      
                </RecordVoiceOverIcon>
               
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            ))}
            <Divider />
              {["Question"].map((text, index) => (
                <ListItem
                  id="allQuestionsTab"
                  onClick={() => {
                    history.push("/revatureQuestion");

                  }}
                  style={{ color: "#F26925" }}
                  button
                  key={text}

                >
                  <ListItemIcon>
                  <HelpOutlineIcon
                    onClick={() => {
                      history.push("/revatureQuestion");
                    }}
                    style={{ color: "#F26925" }}
                  />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
        </List>
      </Drawer>
        {renderMobileMenu}
        {renderMenu}
    </div>
  );
};
