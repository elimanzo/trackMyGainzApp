import React, { useState, useEffect }from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import gainz from '../../images/gainz.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const credential = user?.credential;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className = {classes.appBar} position="static" color="inherit">
            <div className = {classes.brandContainer}>
                <Typography component={Link} to ="/" className={classes.heading} variant="h2" align="center">Track My Gainz</Typography>
                <img className={classes.image} src={gainz} alt="gainz" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.given_name} src={user?.result.picture}>{user?.result.given_name.charAt(0)}</Avatar>
                        <Typography className = {classes.userName} variant = "h6">{user?.result.given_name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
                    </div>
                ) : (
                    <Button component = {Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;