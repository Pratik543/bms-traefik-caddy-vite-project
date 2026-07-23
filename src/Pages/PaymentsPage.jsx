import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import FirstSection from '../Components/PaymentsPage/FirstSection';
import SecondSection from '../Components/PaymentsPage/SecondSection';
import styles from '../Components/Styling/PaymentsPage.module.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getBookingDetails, postBookingDetails } from '../Redux/booking/action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Counter = () => (
  <CountdownCircleTimer
    isPlaying
    duration={600}
    colors={[
      ['#004777', 0.33],
      ['#F7B801', 0.33],
      ['#A30000', 0.33],
    ]}
  >
    {({ remainingTime }) => Math.floor(remainingTime / 60) + ' : ' + (remainingTime % 60) + ' Minutes'}
  </CountdownCircleTimer>
);

export default function FullScreenDialog({ proceed }) {
  const [state, setState] = React.useState(false);
  const city = useSelector(state => state.app.city);
  const booking_details = useSelector(state => state.booking_details);
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(true);

  const handleClose = () => {
    setState(false);
  };

  const handlePayment = () => {
    setState(true);
    dispatch(postBookingDetails(booking_details)).then(res => {
      if (res) {
        console.log('POSTED');
        dispatch(getBookingDetails());
      }
    });
    setTimeout(() => {
      setCounter(false);
    }, 2000);
  };

  const history = useHistory();
  const handleMove = () => {
    history.push('/');
  };

  console.log(state);
  return (
    <div>
      <Dialog fullScreen open={proceed} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', background: '#1F2533' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ marginLeft: 2, flex: 1 }}>
              <svg height="40" width="150">
                <Link to="/">
                  <image href="//in.bmscdn.com/webin/common/icons/bms.svg" width="150" height="40"></image>
                </Link>
              </svg>
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={styles.page}>
          <div className={styles.firstSection}>
            <FirstSection handlePayment={handlePayment} />
          </div>
          <div className={styles.secondSection}>
            <SecondSection />
            <div style={{ width: '80px', margin: '20px auto', fontSize: '20px', wordBreak: 'break-word' }}>
              <Counter />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state} TransitionComponent={Transition}>
        {counter && (
          <DialogTitle id="customized-dialog-title" sx={{ background: '#F84464', color: 'white' }}>
            Please hold tight we are getting your tickets ready.
          </DialogTitle>
        )}
        <DialogContent dividers>
          {counter ? (
            <img
              style={{ width: '70%', margin: '0 15%' }}
              src="https://cdn.dribbble.com/users/801336/screenshots/10037782/media/d7f28f902699655bba0b75e34dd9eb44.gif"
              alt=""
            />
          ) : (
            <div style={{ textAlign: 'center', color: 'white', background: '#F84464', padding: '100px 50px', borderRadius: '5px' }}>
              <h1>Congratulations!</h1>
              <div style={{ fontSize: '20px' }}>We have got your tickets</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleMove} variant="contained" color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
