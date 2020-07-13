import React from 'react';
import { Link, createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            display: 'flex',
            color: "#ffffff"
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        toolbar: {
            backgroundColor: "#474c55",
            paddingLeft: 80
        }
    }),
);

export const BreadcrumbBarComponent: React.FC = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const pathname = (window.location.pathname).substring(1);

    function refreshPage() {
        window.location.reload(false);
    }

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/" + pathname);
        refreshPage();
    }

    function handleClick2(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        history.push("/")
        refreshPage();
    }

    return (
        <Toolbar className={classes.toolbar}>
            <Link color="inherit" href="/" onClick={handleClick2} className={classes.link}>
                <HomeIcon className={classes.icon} />
            </Link>
            <ArrowForwardIosIcon className={classes.link} />
            <Link
                color="inherit"
                href={pathname}
                onClick={handleClick}
                className={classes.link}
            >
                {pathname}
            </Link>
        </Toolbar>
    );
}