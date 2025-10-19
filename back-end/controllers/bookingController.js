
import Show from "../models/Show.js";
import Booking from "../models/Booking.js"

import stripe from 'stripe';


const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {

    const show = await Show.findById(showId);

    if (!show) return false;

    const occupiedSeats = show.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat])

    return isAnySeatTaken

  } catch (error) {

    return false
  }
}


export const createBooking = async (req, res) => {
  try {

    const userId = req.auth?.userId;

    console.log('booking request', userId, req.body)

    const { showId, selectedSeats } = req.body;

    const { origin } = req.headers;

    const isAvailable = await checkSeatsAvailability(showId, selectedSeats)

    if (isAvailable) {
      return res.status(400).json({
        message: 'Selected Seats are already booked'
      })
    }

    const showData = await Show.findById(showId.trim()).populate('movie')

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats
    })

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId
    })

    showData.markModified('occupiedSeats');

    await showData.save();

    //Stripe Gateway Initialize

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)


    //creating line items to for stripe
  const line_items = [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100
        },
        quantity: 1
      }
    ]
  

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/mybookings`,
      cancel_url: `${origin}/mybookings`,
      line_items: line_items,
      mode: 'payment',
      metadata: {
        bookingId: booking._id.toString()
      },
      expires_at:Math.floor(Date.now()/1000) + 30 * 60  //expires in 30 Minutes
    })


    booking.paymentLink=session.url;
    await booking.save();

    res.status(200).json({
      success: true,
      url:session.url
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const getUserBooking = async (req, res) => {
  try {


    const { userId } = req.auth();

    const getUserBook = await Booking.find({
      user: userId
    })

    res.status(200).json({
      success: true,
      bookingData: getUserBook
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed To get Booking Data'
    })
  }
}

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const showData = await Show.findById(showId);

    const occupiedSeat = Object.keys(showData.occupiedSeats)


    res.status(200).json({
      success: true,
      occupiedSeats: occupiedSeat
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}