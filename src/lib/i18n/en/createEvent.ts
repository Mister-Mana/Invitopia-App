
import { Resource } from '../index';

export const createEventEn: Resource = {
  title: 'Create Event',
  subtitle: 'Create and customize your perfect event invitation',
  basicInfo: 'Basic Information',
  locationDate: 'Location & Date',
  customization: 'Customization',
  contacts: 'Contacts',
  confirmation: 'Confirmation',
  
  // Steps
  steps: {
    type: {
      title: 'Event Type',
      description: 'Choose the type of event you want to create'
    },
    basic: {
      title: 'Basic Information',
      description: 'Add the essential details about your event'
    },
    location: {
      title: 'Location & Date',
      description: 'Set when and where your event will take place'
    },
    customization: {
      title: 'Customization',
      description: 'Customize the look and feel of your event'
    },
    contacts: {
      title: 'Contacts & Team',
      description: 'Select contacts and assign a team to your event'
    },
    confirm: {
      title: 'Confirmation',
      description: 'Review and publish your event'
    }
  },
  
  // Templates
  templates: {
    corporate: {
      name: 'Corporate Event',
      description: 'Professional events, meetings, and conferences'
    },
    wedding: {
      name: 'Wedding',
      description: 'Wedding ceremonies and celebrations'
    },
    birthday: {
      name: 'Birthday Party',
      description: 'Birthday celebrations and parties'
    },
    social: {
      name: 'Social Event',
      description: 'Social gatherings and informal events'
    },
    fundraiser: {
      name: 'Fundraiser',
      description: 'Charity events and fundraising activities'
    },
    other: {
      name: 'Other',
      description: 'Custom event type'
    }
  },
  
  // Contact Selection
  selectContactGroup: 'Select Contact Group',
  chooseContactGroup: 'Choose Contact Group',
  allContacts: 'All Contacts',
  
  // Team Assignment
  assignTeam: 'Assign Team',
  selectTeam: 'Select Team',
  chooseTeam: 'Choose Team',
  noTeamSelected: 'No team selected',
  teamRequired: 'A team is required for this event',
  
  // Form fields
  eventName: 'Event Name',
  eventNamePlaceholder: 'Enter event name',
  eventDescription: 'Event Description',
  eventDescriptionPlaceholder: 'Describe your event',
  eventType: 'Event Type',
  selectEventType: 'Select event type',
  
  // Location and date
  eventLocation: 'Event Location',
  eventLocationPlaceholder: 'Enter event location',
  eventDate: 'Event Date',
  eventTime: 'Event Time',
  selectDate: 'Select date',
  selectTime: 'Select time',
  date: 'Date',
  time: 'Time',
  location: 'Location',
  locationPlaceholder: 'Enter the event location',
  address: 'Address',
  addressPlaceholder: 'Enter the full address',
  
  // Additional fields
  maxGuests: 'Maximum Guests',
  maxGuestsPlaceholder: 'Enter maximum number of guests',
  
  // Appearance
  appearance: 'Appearance',
  
  // Validation messages
  eventNameRequired: 'Event name is required',
  eventTypeRequired: 'Event type is required',
  eventDateRequired: 'Event date is required',
  eventLocationRequired: 'Event location is required',
  
  // Actions
  saveAsDraft: 'Save as Draft',
  continueToNext: 'Continue',
  publishEvent: 'Publish Event',
  previewEvent: 'Preview Event',
  createEvent: 'Create Event',
  
  // Success and error messages
  success: 'Event created successfully!',
  readyToCreate: 'Ready to Create',
  confirmationMessage: 'Your event is ready to be created. Review the details below and click "Create Event" to publish.',
  
  // Errors
  errors: {
    selectTemplate: 'Please select an event template',
    requiredFields: 'Please fill in all required fields'
  }
};
