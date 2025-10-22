import { z } from 'zod';

// Guest RSVP validation schema
export const guestRSVPSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  
  email: z.string()
    .trim()
    .email("Adresse email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères")
    .optional()
    .or(z.literal('')),
  
  phone: z.string()
    .trim()
    .regex(/^\+?[0-9\s-]{8,20}$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal('')),
  
  beveragePreferences: z.array(z.string().max(50))
    .max(10, "Maximum 10 préférences de boissons")
    .optional()
    .default([]),
  
  foodPreferences: z.string()
    .max(500, "Les préférences alimentaires ne peuvent pas dépasser 500 caractères")
    .optional()
    .or(z.literal('')),
  
  dietaryRestrictions: z.string()
    .max(500, "Les restrictions alimentaires ne peuvent pas dépasser 500 caractères")
    .optional()
    .or(z.literal('')),
  
  goldenBookMessage: z.string()
    .max(1000, "Le message ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal('')),
  
  rsvpStatus: z.enum(['confirmed', 'declined', 'maybe'], {
    errorMap: () => ({ message: "Statut RSVP invalide" })
  }),
  
  plusOnes: z.number()
    .int("Le nombre doit être un entier")
    .min(0, "Le nombre ne peut pas être négatif")
    .max(10, "Maximum 10 accompagnants")
    .optional()
    .default(0)
});

export type GuestRSVPFormData = z.infer<typeof guestRSVPSchema>;

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  
  email: z.string()
    .trim()
    .email("Adresse email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  
  phone: z.string()
    .trim()
    .regex(/^\+?[0-9\s-]{8,20}$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal('')),
  
  organization: z.string()
    .max(100, "L'organisation ne peut pas dépasser 100 caractères")
    .optional()
    .or(z.literal('')),
  
  notes: z.string()
    .max(1000, "Les notes ne peuvent pas dépasser 1000 caractères")
    .optional()
    .or(z.literal(''))
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Invitation message validation schema
export const invitationMessageSchema = z.object({
  subject: z.string()
    .trim()
    .min(1, "Le sujet est requis")
    .max(200, "Le sujet ne peut pas dépasser 200 caractères"),
  
  message: z.string()
    .trim()
    .min(1, "Le message est requis")
    .max(5000, "Le message ne peut pas dépasser 5000 caractères")
});

export type InvitationMessageFormData = z.infer<typeof invitationMessageSchema>;

// Event creation validation schema
export const eventBasicSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Le titre est requis")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),
  
  description: z.string()
    .max(5000, "La description ne peut pas dépasser 5000 caractères")
    .optional()
    .or(z.literal('')),
  
  startDate: z.string().datetime("Date de début invalide"),
  
  endDate: z.string()
    .datetime("Date de fin invalide")
    .optional()
    .or(z.literal('')),
  
  capacity: z.number()
    .int("La capacité doit être un entier")
    .min(1, "La capacité doit être au moins 1")
    .max(100000, "La capacité ne peut pas dépasser 100000")
    .optional()
});

export type EventBasicFormData = z.infer<typeof eventBasicSchema>;
