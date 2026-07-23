import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import '../Components/Styling/LoginPag.css';

const CustomDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle sx={{ margin: 0, padding: 2 }} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function Login({ action, handleCloseLogin }) {
  const [number, setNumber] = React.useState('');

  return (
    <div>
      <Dialog onClose={handleCloseLogin} aria-labelledby="customized-dialog-title" open={action}>
        <DialogContent dividers sx={{ padding: 2, textAlign: 'center' }}>
          <div style={{ fontSize: '20px', width: '300px', margin: 'auto' }}>Get Started</div>
          <div className="facebook">
            <i className="fab fa-facebook"></i>
            Continue with Facebook
          </div>
          <div className="google">
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
              <title>Google</title>
              <g fill="none">
                <path d="M18.33 9.744c0-.65-.058-1.274-.167-1.874H9.536v3.544h4.93a4.214 4.214 0 0 1-1.828 2.765v2.298h2.96c1.733-1.595 2.732-3.943 2.732-6.733z" fill="#4285F4"></path>
                <path d="M9.536 18.696c2.473 0 4.547-.82 6.062-2.219l-2.96-2.298c-.82.55-1.87.874-3.102.874-2.386 0-4.406-1.611-5.126-3.777H1.35v2.374a9.157 9.157 0 0 0 8.186 5.046z" fill="#34A853"></path>
                <path d="M4.41 11.276a5.507 5.507 0 0 1-.287-1.74c0-.604.104-1.191.287-1.74V5.421H1.35a9.157 9.157 0 0 0-.975 4.114c0 1.478.354 2.877.974 4.114l3.06-2.374z" fill="#FBBC05"></path>
                <path d="M9.536 4.018c1.345 0 2.552.463 3.502 1.37l2.627-2.627C14.08 1.283 12.005.375 9.535.375A9.157 9.157 0 0 0 1.35 5.422l3.06 2.373C5.13 5.63 7.15 4.018 9.537 4.018z" fill="#EA4335"></path>
                <path d="M.375.375h18.321v18.321H.375z"></path>
              </g>
            </svg>
            Continue with Google
          </div>
          <div style={{ border: 'none' }} className="google">
            OR
          </div>
          <div className="inputs">
            <div>
              <svg width="18" height="12" version="1.1" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect width="18" height="12" fill="#f93"></rect>
                  <path d="m0 4h18v4h-18z" fill="#fff"></path>
                  <path d="m0 8h18v4h-18z" fill="#128706"></path>
                  <path d="m10.602 6c0 0.88281-0.71875 1.6016-1.6016 1.6016s-1.6016-0.71875-1.6016-1.6016 0.71875-1.6016 1.6016-1.6016 1.6016 0.71875 1.6016 1.6016z" fill="#000087"></path>
                </g>
              </svg>
            </div>
            <div>+91</div>
            <div>
              <input
                type="text"
                placeholder="Continue with mobile number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            I agree to the <a href="">Terms &amp; Conditions</a> &amp; <a href="">Privacy Policy</a>
          </div>
        </DialogContent>
        <DialogActions sx={{ margin: 0, padding: 1 }}>
          <Button autoFocus onClick={() => handleCloseLogin(number)} color="primary">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
