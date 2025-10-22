import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Image,
  Ticket,
  FileText,
  Sparkles,
  Star,
  Crown,
  Tag,
} from 'lucide-react';

const categories = [
  { title: 'Tous les modèles', url: '/templates', icon: LayoutGrid },
  { title: 'Invitations', url: '/templates?type=invitation', icon: FileText },
  { title: 'Billets', url: '/templates?type=ticket', icon: Ticket },
  { title: 'Affiches', url: '/templates?type=poster', icon: Image },
  { title: 'Premium', url: '/templates?premium=true', icon: Crown },
];

const templateTypes = [
  { title: 'Mariage', url: '/templates?category=wedding', icon: Star },
  { title: 'Anniversaire', url: '/templates?category=birthday', icon: Sparkles },
  { title: 'Entreprise', url: '/templates?category=corporate', icon: Tag },
  { title: 'Conférence', url: '/templates?category=conference', icon: FileText },
];

export function TemplatesSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50';

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Catégories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Types d'événements</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {templateTypes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
