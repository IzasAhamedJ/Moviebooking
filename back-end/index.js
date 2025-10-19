import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';


/**clerk */
import { clerkMiddleware } from '@clerk/express'
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

/**inngest */
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/inngest.js"

/**Routes---- */
import showRoutes from './routes/showRoute.js';
import bookRoutes from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { stripeWebHooks } from './controllers/stripeWebHooks.js';

const app=express();
const PORT=5000;

//stripe
app.use('/api/stripe',express.raw({
  type:'application/json'
}),stripeWebHooks)






await connectDB();


app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());




// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/',(req,res)=>{
  res.send('welcome')
})

app.use('/api/shows',showRoutes);
app.use('/api/booking',bookRoutes);
app.use('/api/admin',adminRouter);
app.use('/api/user',userRoutes)



// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})





app.listen(PORT,()=>{
    console.log("server is running on the port 5000")
})