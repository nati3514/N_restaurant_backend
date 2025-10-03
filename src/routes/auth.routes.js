const express = require("express");
const { 
    signIn, 
    signOut, 
    getNewAccessToken, 
    removeDeviceAccessToken, 
    getDevices, 
    signUp, 
    getSubscriptionDetails, 
    cancelSubscription, 
    forgotPassword, 
    resetPassword,
    activateSubscription
} = require("../controllers/auth.controller");
const { isLoggedIn, isAuthenticated, hasRefreshToken, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Authentication routes
router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", isLoggedIn, isAuthenticated, signOut);
router.post("/refresh-token", hasRefreshToken, getNewAccessToken);
router.post("/remove-device", isLoggedIn, isAuthenticated, removeDeviceAccessToken);
router.get("/devices", isLoggedIn, isAuthenticated, getDevices);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Subscription routes
router.get("/subscription-details", isLoggedIn, isAuthenticated, authorize([]), getSubscriptionDetails);
router.post("/activate-subscription", isLoggedIn, isAuthenticated, authorize([]), activateSubscription);
router.post("/cancel-subscription", isLoggedIn, isAuthenticated, authorize([]), cancelSubscription);

module.exports = router;