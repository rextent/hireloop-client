import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro' : 'price_1Th5wcPSGXf1DHNfXDtNEbid',
    'seeker_premium' : 'price_1Th6j8PSGXf1DHNfBx4LfRaW',
    'recruiter_growth' : 'price_1Th72mPSGXf1DHNfo71T7YLA',
    'recruiter_enterprise' : 'price_1Th735PSGXf1DHNfFZSpSVoh'
}