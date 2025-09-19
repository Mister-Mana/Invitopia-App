
# Invitopia Firestore Database Structure

This document outlines the complete Firestore database structure for Invitopia, considering all application constraints including user roles, events, templates, and more.

## Collections

### Users
```
users/{userId}
```
- `uid`: string - Firebase Auth UID
- `displayName`: string - User's full name
- `email`: string? - User's email (optional if using phone auth)
- `phoneNumber`: string? - User's phone number (optional if using email auth)
- `role`: 'super_admin' | 'admin' | 'organizer' | 'guest' - User role
- `organization`: string? - Organization the user belongs to
- `avatar`: string? - URL to profile image
- `createdAt`: timestamp - When the account was created
- `lastLogin`: timestamp - Last login timestamp
- `isActive`: boolean - Whether the account is active
- `preferences`: {
    `language`: string - Preferred language
    `theme`: 'light' | 'dark' | 'system' - Preferred theme
    `notifications`: boolean - Notification preferences
    `emailNotifications`: boolean - Email notification preferences
    `smsNotifications`: boolean - SMS notification preferences
  }
- `subscription`: {
    `plan`: 'free' | 'premium' | 'professional' - Current subscription plan
    `startDate`: timestamp - When subscription started
    `endDate`: timestamp - When subscription ends
    `autoRenew`: boolean - Whether to auto-renew
    `paymentMethod`: string - Payment method ID
  }
- `quotas`: {
    `eventsRemaining`: number - Number of events user can create
    `guestsPerEventLimit`: number - Max guests per event
    `templatesRemaining`: number - Number of custom templates user can create
  }

### Organizations
```
organizations/{organizationId}
```
- `name`: string - Organization name
- `logo`: string? - URL to logo
- `address`: string? - Organization address
- `website`: string? - Organization website
- `createdAt`: timestamp - When the organization was created
- `createdBy`: string - User ID of creator
- `plan`: 'free' | 'premium' | 'professional' - Current subscription plan
- `members`: [{ 
    `userId`: string - User ID
    `role`: 'owner' | 'admin' | 'member' - Role within organization
    `joinedAt`: timestamp - When user joined
  }]
- `settings`: {
    `customDomain`: string? - Custom domain for event pages
    `brandColors`: {
      `primary`: string - Primary color
      `secondary`: string - Secondary color
    }
  }

### Events
```
events/{eventId}
```
- `title`: string - Event title
- `description`: string - Event description
- `type`: 'wedding' | 'birthday' | 'corporate' | 'conference' | 'concert' | 'other' - Event type
- `location`: {
    `address`: string - Full address
    `city`: string - City
    `country`: string - Country
    `coordinates`: {
      `latitude`: number - Latitude
      `longitude`: number - Longitude
    }
    `venueDetails`: string? - Additional venue information
  }
- `dates`: {
    `start`: timestamp - Start date and time
    `end`: timestamp? - End date and time
    `timezone`: string - Timezone
  }
- `organizer`: {
    `userId`: string - User ID of organizer
    `name`: string - Organizer name
    `contactInfo`: string - Contact information
  }
- `coOrganizers`: [{ 
    `userId`: string - User ID
    `permissions`: string[] - Array of permissions
  }]
- `status`: 'draft' | 'published' | 'canceled' | 'completed' - Event status
- `visibility`: 'public' | 'private' | 'unlisted' - Event visibility
- `capacity`: number? - Max capacity
- `registrationDeadline`: timestamp? - Registration deadline
- `customFields`: [{ 
    `id`: string - Field ID
    `name`: string - Field name
    `type`: 'text' | 'number' | 'select' | 'checkbox' | 'file' - Field type
    `required`: boolean - Whether field is required
    `options`: string[]? - Options for select fields
  }]
- `settings`: {
    `allowGuests`: boolean - Whether guests can bring +1s
    `requireApproval`: boolean - Whether registrations require approval
    `sendReminders`: boolean - Whether to send reminders
    `reminderSchedule`: [number] - Array of hours before event to send reminders
    `customUrl`: string? - Custom URL slug
  }
- `design`: {
    `templateId`: string - Template ID used
    `customizations`: object - Template customizations
    `colors`: {
      `primary`: string - Primary color
      `secondary`: string - Secondary color
      `accent`: string - Accent color
    }
    `fonts`: {
      `heading`: string - Heading font
      `body`: string - Body font
    }
  }
- `analytics`: {
    `views`: number - Page views
    `registrations`: number - Total registrations
    `checkIns`: number - Total check-ins
  }
- `createdAt`: timestamp - When event was created
- `updatedAt`: timestamp - When event was last updated

### Guests
```
events/{eventId}/guests/{guestId}
```
- `name`: string - Guest name
- `email`: string? - Guest email
- `phone`: string? - Guest phone
- `rsvpStatus`: 'pending' | 'confirmed' | 'declined' | 'maybe' - RSVP status
- `checkedIn`: boolean - Whether guest has checked in
- `checkInTime`: timestamp? - When guest checked in
- `invitationSent`: boolean - Whether invitation was sent
- `invitationSentDate`: timestamp? - When invitation was sent
- `responseDate`: timestamp? - When guest responded
- `plusOnes`: number - Number of additional guests
- `plusOneDetails`: [{
    `name`: string? - Plus one name
    `email`: string? - Plus one email
    `phone`: string? - Plus one phone
    `dietaryRestrictions`: string? - Dietary restrictions
  }]
- `groupId`: string? - Group ID if part of a group
- `tableAssignment`: string? - Table assignment
- `customResponses`: { [fieldId: string]: any } - Responses to custom fields
- `notes`: string? - Private notes about guest
- `tags`: string[] - Tags for categorizing guests

### Tables
```
events/{eventId}/tables/{tableId}
```
- `name`: string - Table name
- `capacity`: number - Table capacity
- `category`: string? - Table category (e.g., "VIP", "Family")
- `location`: string? - Table location description
- `coordinates`: {
    `x`: number - X coordinate on floor plan
    `y`: number - Y coordinate on floor plan
  }
- `shape`: 'round' | 'rectangle' | 'oval' | 'custom' - Table shape
- `assignments`: [{
    `guestId`: string - Guest ID
    `seatNumber`: number? - Specific seat number
  }]
- `notes`: string? - Additional notes

### Templates
```
templates/{templateId}
```
- `name`: string - Template name
- `type`: 'invitation' | 'ticket' | 'rsvp' | 'thank-you' | 'save-the-date' | 'menu' | 'program' - Template type
- `category`: 'wedding' | 'birthday' | 'corporate' | 'concert' | 'conference' | 'other' - Template category
- `thumbnail`: string - URL to thumbnail image
- `previewImages`: string[] - URLs to preview images
- `isSystem`: boolean - Whether it's a system template or user-created
- `isPublic`: boolean - Whether it's available to all users
- `ownerUserId`: string? - User ID of creator (if user-created)
- `ownerOrganizationId`: string? - Organization ID of creator (if org-created)
- `createdAt`: timestamp - When template was created
- `updatedAt`: timestamp - When template was last updated
- `popularity`: number - Usage count
- `tags`: string[] - Searchable tags
- `layout`: object - Template layout configuration
- `elements`: [{
    `id`: string - Element ID
    `type`: 'text' | 'image' | 'shape' | 'qrcode' | 'barcode' | 'dynamic-field' - Element type
    `properties`: {
      // Different properties based on element type
      `position`: { x: number, y: number } - Position coordinates
      `size`: { width: number, height: number } - Size
      `rotation`: number - Rotation angle
      `content`: string? - Text content
      `fontFamily`: string? - Font family for text
      `fontSize`: number? - Font size for text
      `fontWeight`: string? - Font weight for text
      `color`: string? - Color
      `backgroundColor`: string? - Background color
      `borderRadius`: number? - Border radius
      `opacity`: number? - Opacity
      `zIndex`: number - Z-index for layering
      `dynamicField`: string? - Dynamic field reference
    }
  }]
- `defaultData`: object - Default data for template fields
- `requiredFields`: string[] - Required fields to use template

### TemplateCategories
```
templateCategories/{categoryId}
```
- `name`: string - Category name
- `description`: string? - Category description
- `icon`: string? - Category icon
- `order`: number - Display order
- `isActive`: boolean - Whether category is active

### Transactions
```
transactions/{transactionId}
```
- `userId`: string - User ID
- `organizationId`: string? - Organization ID if applicable
- `amount`: number - Transaction amount
- `currency`: string - Currency code
- `description`: string - Transaction description
- `type`: 'subscription' | 'template-purchase' | 'addon' | 'refund' - Transaction type
- `status`: 'pending' | 'completed' | 'failed' | 'refunded' - Transaction status
- `paymentMethod`: {
    `type`: 'credit_card' | 'paypal' | 'bank_transfer' | 'mobile_money' - Payment method type
    `lastFour`: string? - Last four digits
    `expiryDate`: string? - Expiration date
  }
- `receiptUrl`: string? - URL to receipt
- `items`: [{
    `name`: string - Item name
    `description`: string? - Item description
    `quantity`: number - Quantity
    `unitPrice`: number - Unit price
    `total`: number - Total for item
    `itemReference`: string? - Reference to related item (e.g., templateId)
  }]
- `metadata`: object? - Additional metadata
- `createdAt`: timestamp - When transaction was created
- `completedAt`: timestamp? - When transaction was completed

### SystemSettings
```
systemSettings/config
```
- `maintenance`: {
    `enabled`: boolean - Whether site is in maintenance mode
    `message`: string? - Maintenance message
    `allowedRoles`: string[] - Roles that can access during maintenance
  }
- `security`: {
    `passwordPolicy`: {
      `minLength`: number - Minimum password length
      `requireSpecialChars`: boolean - Require special characters
      `requireNumbers`: boolean - Require numbers
      `requireUppercase`: boolean - Require uppercase letters
    }
    `twoFactorAuth`: {
      `enabled`: boolean - Whether 2FA is enabled
      `requiredForRoles`: string[] - Roles required to use 2FA
    }
    `loginAttempts`: {
      `maxAttempts`: number - Max failed login attempts
      `lockoutDuration`: number - Lockout duration in minutes
    }
  }
- `analytics`: {
    `trackingEnabled`: boolean - Whether analytics tracking is enabled
    `trackingIds`: {
      `googleAnalytics`: string? - Google Analytics ID
      `facebookPixel`: string? - Facebook Pixel ID
    }
  }
- `email`: {
    `fromAddress`: string - From email address
    `replyToAddress`: string? - Reply-to email address
    `templates`: {
      `welcome`: {
        `subject`: string - Email subject
        `enabled`: boolean - Whether email is enabled
      }
      `invitation`: {/* Similar structure */}
      `reminder`: {/* Similar structure */}
      `passwordReset`: {/* Similar structure */}
    }
  }
- `sms`: {
    `enabled`: boolean - Whether SMS is enabled
    `templates`: {
      `invitation`: {/* Template structure */}
      `reminder`: {/* Template structure */}
    }
  }
- `localization`: {
    `availableLanguages`: string[] - Available languages
    `defaultLanguage`: string - Default language
  }
- `payments`: {
    `providers`: {
      `stripe`: {
        `enabled`: boolean - Whether Stripe is enabled
        `publicKey`: string? - Stripe public key
      }
      `paypal`: {/* Similar structure */}
      `mobileMoney`: {/* Similar structure */}
    }
    `currencies`: string[] - Supported currencies
    `defaultCurrency`: string - Default currency
  }

### AuditLog
```
auditLog/{logId}
```
- `userId`: string - User who performed action
- `action`: string - Action performed
- `resource`: {
    `type`: string - Resource type (e.g., "user", "event")
    `id`: string - Resource ID
  }
- `changes`: object? - Changes made
- `metadata`: object? - Additional metadata
- `ipAddress`: string? - IP address
- `userAgent`: string? - User agent
- `timestamp`: timestamp - When action occurred

### UserPermissions
```
userPermissions/{userId}
```
- `permissions`: string[] - Array of permission codes
- `customPermissions`: { [key: string]: boolean } - Custom permission flags
- `restrictedEvents`: string[] - Events with restricted access
- `accessLevel`: number - Numeric access level (higher = more access)
- `updatedAt`: timestamp - When permissions were last updated
- `updatedBy`: string - User who last updated permissions

## Security Rules

The Firestore security rules should implement the following access controls:

1. Super admins have full read/write access to all collections
2. Admins have full access to most collections except SystemSettings and super admin user data
3. Organizers can manage their own events, guests, and templates
4. All users can read public templates and their own profile
5. Guests can only read event details they're invited to

## Relationships

- Users belong to Organizations
- Events are created by Users
- Guests belong to Events
- Tables belong to Events
- Templates can be system-provided or created by Users
- Transactions are associated with Users and/or Organizations

## Indexes

To optimize query performance, the following composite indexes should be created:

1. events (organizer.userId, dates.start): For retrieving a user's upcoming events
2. events (status, visibility, dates.start): For public event discovery
3. templates (type, isPublic, isSystem): For template browsing
4. guests (events/{eventId}, rsvpStatus): For filtering guests by RSVP status
5. transactions (userId, status, createdAt): For user transaction history

## Considerations

1. **Scalability**: The structure allows for collections to grow independently
2. **Queries**: Common queries are optimized with appropriate indexes
3. **Security**: Fine-grained access control through security rules
4. **Offline support**: Core data can be cached for offline use
5. **Cost optimization**: Denormalized where needed to reduce read operations
```

### Role-Based Access Control

The application implements a hierarchical role system:

1. **Super Admin**:
   - Complete system access
   - Can manage all users, organizations, and events
   - Access to system settings and configurations
   - View audit logs and system health metrics
   - Manage payment providers and system templates
   
2. **Admin**:
   - Manage users and organizations
   - Access to analytics and reporting
   - Approve/reject events and templates
   - Limited access to system settings

3. **Organizer**:
   - Create and manage their own events
   - Invite and manage guests
   - Create custom templates
   - Basic analytics for their events

4. **Guest**:
   - View event details they're invited to
   - RSVP to events
   - Customize their profile
