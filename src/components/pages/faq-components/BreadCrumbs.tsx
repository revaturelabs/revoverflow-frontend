import React, { useEffect } from 'react';
import { emphasize, withStyles, Theme, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});


const useStyles = makeStyles({
    parentCrumb:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      boxSizing:"border-box",
      width:"100%"

    },
    babyCrumb:{
      // flexGrow:"1"
      margin: "1.5rem",

    },
    crumbIcon: {
      color: "#3498db"
    }

});



const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[100],
      color: "#000000",

         fontWeight: "bold"
      
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.primary.main,
   
    },
  },
}))(Chip) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a location.');
}

export default function CustomizedBreadcrumbs() {

  const classes = useStyles();


  return (

    <ThemeProvider theme={theme} > 
     
      <Breadcrumbs separator="|" className={classes.parentCrumb} aria-label="breadcrumb">
        <StyledBreadcrumb
          className={classes.babyCrumb}
          component="a"
          href="#Toronto"
          label="Toronto"
          icon={<HomeIcon fontSize="large" className={classes.crumbIcon}/>}
          onClick={handleClick}
        />
        <StyledBreadcrumb 
        className={classes.babyCrumb}
        component="a" 
        href="#Reston" 
        label="Reston" 
        icon={<HomeIcon fontSize="large"  className={classes.crumbIcon}/>}
        onClick={handleClick} 
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Tampa"
          deleteIcon={<ExpandMoreIcon />}
          icon={<HomeIcon fontSize="large" className={classes.crumbIcon} />}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="New York"
          deleteIcon={<ExpandMoreIcon />}
          icon={<HomeIcon fontSize="large"  className={classes.crumbIcon}/>}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Dallas"
          deleteIcon={<ExpandMoreIcon />}
          icon={<HomeIcon fontSize="large"  className={classes.crumbIcon}/>}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Orlando"
          icon={<HomeIcon fontSize="large"  className={classes.crumbIcon}/>}
          onClick={handleClick}
        />
        <StyledBreadcrumb
        className={classes.babyCrumb}
          label="Morgantown"
          icon={<HomeIcon fontSize="large"  className={classes.crumbIcon}/>}
          onClick={handleClick}
        />
      </Breadcrumbs>

    </ThemeProvider>
  );
}
