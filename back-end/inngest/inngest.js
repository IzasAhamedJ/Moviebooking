import { Inngest } from "inngest";
import  user  from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "show-booking" });


const UserCreation=inngest.createFunction(
    {
        id:'create-user',
    },
    {
        event:'clerk/user.created'
    },
    async({event,step})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data

        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            image:image_url

        }

        await user.create(userData);

    //    await step.sleep('wait a monment',"1s");
    //    return {
    //     message:`hello ${event.data.email}`
    //    };

    }
);

const UserDeletion=inngest.createFunction(
    {
        id:'delete_user'
    },
    {
        event:'clerk/user.deleted'
    },
    async({event})=>{
       
        const {id}=event.data;
        await user.findByIdAndDelete(id)

    }
)

const UserUpdation=inngest.createFunction(
    {
        id:'update-user'
    },
    {
        event:'clerk/user.updated'
    },
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data

       
           const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            image:image_url

        }

        await user.findByIdAndUpdate(id,userData)

    }
)




const releaseSeatsAndDeleteBooking=inngest.createFunction({
    id:'release-seat-delete-booking'
},
{
    event:"app/checkpayment"
},
async ({event,step})=>{
   const tenMinutes=new Date(Date.now()+10*60*1000)
   await step.sleepUntil('wait for 10 minutes',tenMinutes)

   await step.run('check-payment-status',async()=>{
    const bookingId=event.data.bookingId;
    const booking=await Booking.findById(bookingId);


    if(!booking.isPaid){
        const show=await Show.findById(booking.show)
        booking.bookedSeats.forEach((seat)=>{
            delete show.occupiedSeats[seat]
        })

        show.markModified('occupiedSeats')
        await show.save();
        await Booking.findOneAndDelete(booking._id)
    }
   })
}
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    UserCreation,
    UserDeletion,
    UserUpdation,
    releaseSeatsAndDeleteBooking
];