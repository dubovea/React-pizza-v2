import logo from '../assets/img/pizza-logo.svg';
import Search from './Search';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  FormHelperText,
} from '@mui/material';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { cartSelector } from '../redux/cart/selectors';
import {
  setEmail,
  setLogin,
  setPassword,
  setRepassword,
  clearData,
} from '../redux/registration/slice';
import { useAppDispath } from '../redux/store';
import { registrationSelector } from '../redux/registration/selectors';
import { setOpen, setRegistered } from '../redux/registration/slice';
import { registration } from '../redux/registration/actions';

const Header: React.FC = () => {
  const dispatch = useAppDispath();
  const { pathname } = useLocation();
  const cartPath = '/cart';
  const { totalPrice, items } = useSelector(cartSelector);
  const { login, email, password, repassword, registered, open } =
    useSelector(registrationSelector);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickOpen = () => {
    dispatch(setOpen(true));
  };
  const handleExit = () => {
    dispatch(setRegistered(false));
  };

  const handleClose = () => {
    dispatch(setOpen(false));
    dispatch(clearData());
  };
  const handleRegistration = (e: any) => {
    dispatch(
      registration({
        login: {
          value: login.value,
        },
        password: {
          value: password.value,
        },
        repassword: {
          value: repassword.value,
        },
        email: {
          value: email.value,
        },
        open: true,
      }),
    );
  };

  const handleChangeField = (input: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = input.target;
    switch (id) {
      case 'login':
        dispatch(
          setLogin({
            value: value,
          }),
        );
        break;
      case 'password':
        dispatch(
          setPassword({
            value: value,
          }),
        );
        break;
      case 'email':
        dispatch(
          setEmail({
            value: value,
          }),
        );
        break;
      case 'repassword':
        dispatch(
          setRepassword({
            value: value,
          }),
        );
        break;
      default:
        break;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>Medik Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname !== cartPath && <Search />}
        <div className="header__cart">
          <Link to={cartPath} className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{items.length}</span>
          </Link>
        </div>
        {registered ? (
          <div className="header__exit">
            {login.value}{' '}
            <Button variant="outlined" onClick={handleExit}>
              Выйти
            </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={handleClickOpen}>
            Войти
          </Button>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Регистрация</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Пожалуйста, введите данные для создания учетной записи на нашем сайте.
            </DialogContentText>
            <TextField
              error={!!login.message}
              helperText={login.message}
              autoFocus
              margin="dense"
              id="login"
              label="Логин"
              fullWidth
              variant="outlined"
              onChange={handleChangeField}
            />
            <TextField
              error={!!email.message}
              helperText={email.message}
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              onChange={handleChangeField}
            />
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChangeField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel htmlFor="repassword">Повторите пароль</InputLabel>
              <OutlinedInput
                error={password.value !== repassword.value}
                id="repassword"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChangeField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {password.value !== repassword.value && (
                <FormHelperText error>Введите одинаковые пароли.</FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleRegistration}>Регистрация</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
