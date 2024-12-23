import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { PersonOutlineOutlined } from '@mui/icons-material';
import SearchBarComponent from './SearchBarComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DrawerComponent from './DrawerComponent';
import { useState } from 'react';
import { Badge, Divider, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import AddAddressComponent from './AddAddressComponent';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [cartWindow, setCartWindow] = useState(false);
  const [addressComponentOpen, setAddressComponentOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matches2 = useMediaQuery(theme.breakpoints.down(450));
  const navigate = useNavigate();

  const products = useSelector((state) => state.Cart);
  let prd = {};
  try {
    prd = JSON.parse(localStorage.getItem('Cart')) || {};
  } catch (e) {
    prd = {};
  }

  let userdata = JSON?.parse(localStorage.getItem('USER'));

  const keys = Object?.keys(prd);
  const cartValue = Object?.values(prd);

  const handleOpen = () => {
    setOpen(true);
  };

  const getTotalItems = () => {
    return cartValue.reduce((total, next) => {
      return (total += next.qty);
    }, 0);
  };

  const showCarts = () => {
    return cartValue.map((item, index) => (
      <div
        key={index}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '3% 0',
          fontSize: '.85rem',
        }}
      >
        <div style={{ width: '80%' }}>{item?.productname}</div>
        <div style={{ width: '20%', textAlign: 'end' }}>qty: {item?.qty}</div>
      </div>
    ));
  };

  const myCart = () => {
    return (
      <Paper
        elevation={5}
        style={{
          width: '300px',
          height: 'auto',
          zIndex: 2,
          background: '#fff',
          position: 'absolute',
          top: matches ? '200%' : '100%',
          right: '1%',
          color: 'black',
          padding: '1%',
          transition: 'all 2s ease',
        }}
        onMouseOver={handleCartWindow}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '.9rem',
            fontWeight: 'bold',
            marginBottom: '3%',
          }}
        >
          Order Summary <span> qty: {getTotalItems()}</span>
        </div>
        <Divider />
        <div style={{ width: '100%' }}>{showCarts()}</div>
      </Paper>
    );
  };

  const handleCartWindow = () => {
    setCartWindow(true);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: '#2d2d2d', color: '#fff', height: '64px' }}>
          <Toolbar>
            {matches ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpen}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <div
              style={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: 24,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/home')}
            >
              SolarBuddy
            </div>
            <div
              style={{
                width: '80%',
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {!matches && <SearchBarComponent width="50%" />}
            </div>
            <div
              style={{
                width: 80,
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '20px',
                cursor: 'pointer',
              }}
            >
              {!matches && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <PersonOutlineOutlined
                    style={{ fontSize: 36 }}
                    onClick={handleOpen}
                  />
                  <div style={{ fontSize: '.7rem' }}>{userdata?.firstname}</div>
                </div>
              )}

              <Badge
                badgeContent={keys.length}
                color="primary"
                onClick={() => navigate('/cart')}
              >
                <ShoppingBagOutlined
                  style={{ fontSize: 32, cursor: 'pointer' }}
                  onMouseOver={handleCartWindow}
                  onMouseLeave={() => setCartWindow(false)}
                />
              </Badge>
            </div>
          </Toolbar>
          {matches2 ? null : cartWindow ? myCart() : null}
        </AppBar>
        {matches ? (
          <Box>
            <AppBar
              style={{
                width: '100%',
                height: 60,
                background: '#b2bec3',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '64px',
              }}
            >
              <SearchBarComponent width="95%" />
            </AppBar>
          </Box>
        ) : null}
        <DrawerComponent open={open} setOpen={setOpen} />
      </Box>
    </div>
  );
}
