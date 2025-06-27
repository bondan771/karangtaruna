const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setCustomClaims = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const userId = context.params.userId;
    const userData = change.after.data();
    
    if (!userData) return null;

    try {
      // Set custom claims
      await admin.auth().setCustomUserClaims(userId, {
        role: userData.role || 'anggota'
      });
      
      // Log success
      console.log(`Custom claims set for ${userId}:`, userData.role);
      
      // Invalidate user token
      const user = await admin.auth().getUser(userId);
      await admin.auth().revokeRefreshTokens(userId);
      
      return true;
    } catch (error) {
      console.error('Error setting claims:', error);
      return null;
    }
  });