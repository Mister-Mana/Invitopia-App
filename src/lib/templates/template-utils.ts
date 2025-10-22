
import { Template, TemplateType, TemplateCategory } from './template-types';
import { invitationTemplates } from './invitation-templates';
import { ticketTemplates } from './ticket-templates';

// Combine all templates for easier access
export const allTemplates: Template[] = [...invitationTemplates, ...ticketTemplates];

// Function to get a template by ID
export const getTemplateById = (id: string): Template | undefined => {
  return allTemplates.find(template => template.id === id);
};

// Function to get templates by type
export const getTemplatesByType = (type: TemplateType): Template[] => {
  return allTemplates.filter(template => template.type === type);
};

// Function to get templates by category
export const getTemplatesByCategory = (category: TemplateCategory): Template[] => {
  return allTemplates.filter(template => template.category === category);
};

// Function to get templates by search query
export const searchTemplates = (query: string): Template[] => {
  const lowerQuery = query.toLowerCase();
  return allTemplates.filter(template => 
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.category.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
