import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Field } from 'redux-form';
import { registration } from './actions';
import { FieldData, Registration } from './types';

const empty = {
  value: '',
  message: '',
};

const initialState: Registration = {
  login: empty,
  password: empty,
  email: empty,
  repassword: empty,
  registered: false,
  open: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<FieldData>) => {
      state.login = {
        value: action.payload.value,
      };
    },
    setPassword: (state, action: PayloadAction<FieldData>) => {
      state.password = {
        value: action.payload.value,
      };
    },
    setEmail: (state, action: PayloadAction<FieldData>) => {
      state.email = {
        value: action.payload.value,
      };
    },
    setRepassword: (state, action: PayloadAction<FieldData>) => {
      state.repassword = {
        value: action.payload.value,
      };
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setRegistered: (state, action: PayloadAction<boolean>) => {
      state.registered = action.payload;
    },
    clearData: (state) => {
      state.login = empty;
      state.password = empty;
      state.email = empty;
      state.repassword = empty;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state) => {
      state.registered = true;
      state.open = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      const { message, constraint } = action.payload as Record<string, string>;
      state.open = true;
      if (constraint === 'login') {
        state.login = {
          message: message,
        };
      }
      if (constraint === 'email') {
        state.email = {
          message: message,
        };
      }
    });
  },
});

export const { setLogin, setPassword, setEmail, setRepassword, setOpen, setRegistered, clearData } =
  registrationSlice.actions;

export default registrationSlice.reducer;
