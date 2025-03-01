export const responseMessages = {
  // Authentication
  REGISTER_SUCCESS:
    'Welcome aboard! 🎉 Your account has been created successfully',
  LOGIN_SUCCESS: 'Welcome back! 👋 Happy shopping/selling',
  LOGOUT_SUCCESS: "You've been safely signed out. Come back soon! 👋",
  PASSWORD_RESET_SUCCESS:
    'Password updated successfully! 🔒 A confirmation email has been sent',

  // Listings
  LISTING_CREATE:
    'Item posted successfully! 📢 Now visible to thousands of buyerss',
  LISTING_UPDATE: 'Listing updated successfully! ✨ Changes are now visible',
  LISTING_DELETE:
    "Listing removed successfully. 🗑️ It's no longer visible to buyers",
  LISTING_SOLD: 'Congratulations on your sale! 🎉 Item marked as sold',
  LISTING_GET_ONE:
    'Listing details retrieved successfully! 🗒️ Browse all information below',
  LISTING_GET_ALL: 'Listings loaded! 🔍 Explore available items below',
  LISTING_GET_ALL_OF_A_USER: 'Your listings loaded! 📋 Manage your items below',

  // Transactions
  TRANSACTION_CREATE:
    'Purchase initiated successfully! 💳 Seller has been notified',
  TRANSACTION_COMPLETE:
    'Transaction completed successfully! 🤝 Thank you for using SecondHand',
  INQUIRY_SENT: 'Message sent! 💌 The seller will respond shortly',

  // Errors
  ERROR_DEFAULT: 'Oops! Something went wrong. 🛠️ Our team has been notified',
  ERROR_VALIDATION: 'Please check your input: {{details}}',
  ERROR_NOT_FOUND: "We couldn't find what you're looking for 🔍",
  ERROR_UNAUTHORIZED: 'Please sign in to access this feature 🔒',

  // Success
  SUCCESS_GENERIC: 'Action completed successfully! ✅',
  PROFILE_UPDATE: 'Profile updated successfully! ✏️ Your changes are saved',
  WISHLIST_ADD:
    'Item added to your wishlist! 💖 View it anytime in your dashboard',

  // Admin
  USER_BANNED: 'Account restriction updated. ⚖️ Changes applied successfully',
  LISTING_REMOVED_ADMIN:
    'Listing removed by moderation. 🛡️ Thank you for keeping SecondHand safe',
} as const;

// Utility type for type safety
export type ResponseMessageKey = keyof typeof responseMessages;
