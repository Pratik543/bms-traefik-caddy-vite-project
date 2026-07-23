import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Components/Styling/Summery.module.css';
import Food from '../Components/SummeryPage/Food';
import { handleAddTotalPrice } from '../Redux/booking_details/actions';
import PaymentsPage from './PaymentsPage';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SummaryPage({ foodModalOpen, handleCloseFoodModal }) {
  const [totalFood, setTotalFood] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [proceed, setProceed] = React.useState(false);
  const city = useSelector(state => state.app.city);
  const foodArray = useSelector(state => state.food.foodArray);
  const booking_details = useSelector(state => state.booking_details);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let sum = 0;
    for (let i = 0; i < foodArray.length; i++) {
      sum += +foodArray[i].count * +foodArray[i].food_price;
    }
    setTotalFood(sum);
  }, [foodArray]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {};

  let totalAmount = booking_details.price + 28 + totalFood;

  const handleProceed = () => {
    dispatch(handleAddTotalPrice(totalAmount));
    setProceed(true);
  };

  return (
    <div>
      <Dialog fullScreen open={foodModalOpen} onClose={handleCloseFoodModal} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', background: '#1F2533' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseFoodModal} aria-label="close">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 2, flex: 1, color: 'white' }}>
              {booking_details.movie_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseFoodModal}>
              <ClearIcon />
            </Button>
          </Toolbar>
        </AppBar>

        <div className={styles.container}>
          <Food />
          <div className={styles.summeryPart}>
            <div>Booking Summery</div>
            <div className={styles.categories}>
              <div style={{ textTransform: 'uppercase' }}>{booking_details.cinemas_name}</div>
              <div>Rs {booking_details.price}</div>
            </div>
            <span>AUDI 5</span>
            <div className={styles.categories}>
              <div style={{ fontSize: '12px', lineHeight: '25px' }}>Internet handeling fees</div>
              <div>Rs 28.00</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.categories}>
              <div>Sub total</div>
              <div>{booking_details.price + 28}</div>
            </div>

            {foodArray.length > 0 && (
              <div style={{ fontSize: '12px' }} className={styles.categories}>
                <div>Food and beverages</div>
                <div> Rs. {totalFood}</div>
              </div>
            )}

            <div className={styles.charity}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" onChange={handleChange} />
                  <img src="https://in.bmscdn.com/webin/common/icons/bookasmile-logo.svg" alt="" />
                </div>
                <div>Rs 1</div>
              </div>
              <div style={{ fontSize: '12px', padding: '10px 20px' }}>
                <div>Re. 1 will be added to your transaction as a donation.</div>
                <div>Re.1/1 Ticket</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', margin: '0 30px', fontWeight: '600' }}>
              Your current State is <a href="">{city}</a>
            </div>
            <div className={styles.total}>
              <div>Amount Payable</div>
              <div>Rs {totalAmount}</div>
            </div>
            <h3 className={styles.ticketType}>Select Ticket Type</h3>
            <div onClick={handleProceed} className={styles.proceedBtn}>
              <div>Total : Rs {totalAmount}</div>
              <div> Proceed</div>
            </div>
            <div className={styles.cancellation_policy}>
              You can cancel the tickets 20 min(s) before the show. Refunds will be done according to{' '}
              <a href="">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </Dialog>
      <PaymentsPage proceed={proceed} />
    </div>
  );
}
