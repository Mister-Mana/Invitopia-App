const en = {
  common: {
    welcomeMessage: "Welcome to Invitopia",
    createEvent: "Create event",
    dashboard: "Dashboard",
    account: "Account",
    login: "Login",
    signup: "Sign up",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    back: "Back",
    next: "Next",
    previous: "Previous",
    loading: "Loading...",
    search: "Search...",
    noResults: "No results found",
    error: "An error occurred",
    success: "Operation successful",
    events: {
      title: "Events",
      createEvent: "Create Event",
      editEvent: "Edit Event",
      deleteEvent: "Delete Event",
      eventDetails: "Event Details",
      startDate: "Start Date",
      endDate: "End Date",
      location: "Location",
      description: "Description",
      attendees: "Attendees",
      totalInvited: "Total Invited"
    },
    admin: {
      title: "Administrator",
      userManagement: "User Management",
      systemSettings: "System Settings",
      paymentSettings: "Payment Settings"
    },
    user: {
      profile: "Profile",
      editProfile: "Edit Profile",
      changePassword: "Change Password",
      logout: "Logout"
    },
    errorMessage: {
      notFound: "Not Found",
      unauthorized: "Unauthorized",
      serverError: "Server Error"
    },
    teams: {
      title: "Teams",
      createTeam: "Create Team",
      editTeam: "Edit Team",
      deleteTeam: "Delete Team"
    },
    superAdmin: {
      title: "Super Administrator",
      manageAdmins: "Manage Administrators",
      systemOverview: "System Overview"
    },
    navbar: {
      language: "Language",
      theme: "Theme",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard"
    }
  },
  commonCore: {},
  auth: {
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    createAccount: "Create account",
    loginWithGoogle: "Login with Google",
    loginWithFacebook: "Login with Facebook",
    orContinueWith: "Or continue with",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    resetPassword: "Reset password"
  },
  dashboard: {
    welcome: "Welcome to your dashboard",
    upcomingEvents: "Upcoming events",
    pastEvents: "Past events",
    recentNotifications: "Recent notifications",
    guestStatistics: "Guest statistics",
    invitationsSent: "Invitations sent",
    pendingGuests: "Pending guests",
    markAllAsRead: "Mark all as read",
    viewAllNotifications: "View all notifications",
    accepted: "Accepted",
    declined: "Declined",
    pending: "Pending"
  },
  createEvent: {
    title: "Create a new event",
    description: "Follow the steps to set up your event",
    steps: {
      eventType: "Event type",
      basicInfo: "Basic information",
      locationDate: "Location and date",
      customization: "Customization"
    },
    templates: {
      corporate: "Corporate Event",
      wedding: "Wedding",
      birthday: "Birthday",
      social: "Social Event",
      fundraiser: "Fundraiser",
      other: "Other"
    },
    fields: {
      title: "Event title",
      description: "Description",
      date: "Date",
      time: "Time",
      location: "Location",
      address: "Full address",
      maxGuests: "Maximum number of guests"
    },
    customization: {
      appearance: "Appearance",
      guests: "Guests",
      settings: "Settings",
      coverImage: "Cover image",
      colorTheme: "Color theme"
    },
    validation: {
      selectType: "Please select an event type to continue.",
      fillRequired: "Please fill in all required fields."
    },
    success: "Event created successfully!"
  },
  templates: {
    gallery: "Template gallery",
    chooseTemplate: "Choose a template",
    invitation: "Invitations",
    ticket: "Tickets",
    customize: "Customize",
    preview: "Preview",
    download: "Download",
    share: "Share"
  },
  payment: {
    methods: "Payment methods",
    subscription: "Subscription",
    oneTime: "One-time payment",
    manualPayment: "Manual payment",
    generateCode: "Generate code",
    validatePayment: "Validate payment",
    paymentStatus: "Payment status",
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    currency: "Currency",
    amount: "Amount",
    paymentCode: "Payment code",
    enterPaymentCode: "Enter payment code"
  },
  contacts: {
    title: "Contact book",
    addContact: "Add contact",
    importContacts: "Import contacts",
    exportContacts: "Export contacts",
    searchContacts: "Search contacts",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    groups: "Groups",
    addToGroup: "Add to group",
    createGroup: "Create group"
  },
  rsvp: {
    title: "RSVP",
    attending: "Attending",
    notAttending: "Not attending",
    maybe: "Maybe",
    additionalGuests: "Additional guests",
    dietaryRestrictions: "Dietary restrictions",
    comments: "Comments"
  },
  stats: {
    title: "Statistics",
    invitationsSent: "Invitations sent",
    viewed: "Viewed",
    responded: "Responded",
    attending: "Attending",
    notAttending: "Not attending",
    pending: "Pending"
  },
  export: {
    title: "Export",
    format: "Format",
    pdf: "PDF",
    jpg: "JPG",
    png: "PNG",
    svg: "SVG",
    quality: "Quality",
    download: "Download"
  },
  home: {
    footer: {
      description: "Invitopia is an all-in-one event management platform that helps you create, manage, and track your events with ease.",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      testimonials: "Testimonials",
      updates: "Updates",
      support: "Support",
      helpCenter: "Help Center",
      contact: "Contact",
      documentation: "Documentation",
      status: "Service Status",
      legal: "Legal",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      compliance: "Compliance",
      copyright: "All rights reserved"
    }
  },
  settings: {
    languageRegion: "Language & Region",
    languageDescription: "Set your preferred language and regional settings",
    language: "Language",
    timeZone: "Time Zone",
    timeZoneDescription: "Your time zone is used to display dates and times correctly",
    accessibility: "Accessibility",
    accessibilityDescription: "Customize your experience to improve accessibility",
    reducedMotion: "Reduce animations",
    reducedMotionDescription: "Limits or disables animations to reduce visual fatigue",
    highContrast: "High contrast",
    highContrastDescription: "Enhances color contrast for better readability",
    connectedDevices: "Connected Devices",
    devicesDescription: "Manage devices that have access to your account",
    removeDevice: "Remove",
    currentDevice: "Current device",
    appearance: "Appearance",
    appearanceDescription: "Customize the look and feel of the application",
    theme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    systemTheme: "System",
    accentColor: "Accent color",
    fontSize: "Font size"
  },
  pages: {
    help: {
      title: "Help Center",
      description: "Find answers to your questions and learn how to use Invitopia",
      searchPlaceholder: "Search for help...",
      popularTopics: "Popular Topics",
      contactSupport: "Contact Support"
    },
    contact: {
      title: "Contact Us",
      description: "Our team is ready to assist you",
      form: {
        name: "Full Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send"
      },
      info: {
        title: "Contact Information",
        email: "support@invitopia.com",
        phone: "+243 123 456 789",
        address: "Boulevard Avenue, Kinshasa, DRC"
      }
    },
    documentation: {
      title: "Documentation",
      description: "Detailed guides to get the most out of Invitopia",
      gettingStarted: "Getting Started",
      api: "API",
      tutorials: "Tutorials",
      faq: "FAQ"
    },
    status: {
      title: "Service Status",
      description: "Check the current status of our services",
      allOperational: "All systems operational",
      partialOutage: "Partial outage",
      majorOutage: "Major outage",
      maintenanceMode: "Maintenance mode",
      lastUpdated: "Last updated"
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "Last updated"
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated"
    },
    cookies: {
      title: "Cookie Policy",
      description: "How we use cookies",
      necessary: "Necessary",
      preferences: "Preferences",
      statistics: "Statistics",
      marketing: "Marketing",
      accept: "Accept all",
      decline: "Decline all",
      customize: "Customize"
    },
    compliance: {
      title: "Compliance",
      description: "Information about our regulatory compliance",
      gdpr: "GDPR",
      ccpa: "CCPA",
      hipaa: "HIPAA"
    },
    testimonials: {
      title: "Testimonials",
      description: "What our customers say about us",
      viewAll: "View all testimonials"
    },
    updates: {
      title: "Updates",
      description: "Latest news and updates from Invitopia",
      readMore: "Read more",
      categories: {
        all: "All",
        features: "New Features",
        improvements: "Improvements",
        fixes: "Fixes"
      }
    }
  },
  about: {
    title: "About Invitopia",
    description: "Invitopia is the platform that energizes your events.",
    mission: "Our mission is to simplify and empower event management for everyone.",
    team: "Meet our passionate team.",
    contact: "Contact us for more information."
  }
};

// Exports des sections principales
export const commonEn = en.common;
export const commonCoreEn = en.commonCore;
export const authEn = en.auth;
export const dashboardEn = en.dashboard;
export const createEventEn = en.createEvent;
export const templatesEn = en.templates;
export const paymentEn = en.payment;
export const contactsEn = en.contacts;
export const rsvpEn = en.rsvp;
export const statsEn = en.stats;
export const exportDataEn = en.export;
export const homeEn = en.home;
export const settingsLocalEn = en.settings;
export const pagesEn = en.pages;
export const aboutEn = en.about;
export const adminEn = en.common.admin;
export const errorEn = en.common.errorMessage;
export const teamsEn = en.common.teams;
export const superAdminEn = en.common.superAdmin;
export const navbarEn = en.common.navbar;
export const eventsEn = en.common.events;
export const userEn = en.common.user;

export default en;