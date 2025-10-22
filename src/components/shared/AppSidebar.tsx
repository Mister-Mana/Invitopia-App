
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/auth';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  PenTool,
  ImageIcon,
  Crown,
  CreditCard,
  CalendarDays,
  UsersRound,
  Building2,
  Shield,
  Activity,
  UserCheck,
  MapPin,
  Sparkles,
  FileText,
  Award,
  Database,
  Zap,
  Target,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'dashboard.sidebar.dashboard' },
  { path: '/events', icon: Calendar, label: 'dashboard.sidebar.events' },
  { path: '/teams', icon: UsersRound, label: 'dashboard.sidebar.teams' },
  { path: '/contacts', icon: Users, label: 'dashboard.sidebar.contacts' },
  { path: '/templates', icon: PenTool, label: 'dashboard.sidebar.templates' },
  { path: '/template-gallery', icon: ImageIcon, label: 'templates.gallery' },
  { path: '/template-editor/new', icon: PenTool, label: 'templates.createTemplate' },
  { path: '/mc', icon: Award, label: 'dashboard.sidebar.mc' },
  { path: '/workflow-builder', icon: Workflow, label: 'dashboard.sidebar.workflowBuilder' },
  { path: '/marketing-campaigns', icon: Target, label: 'dashboard.sidebar.marketing' },
  { path: '/settings', icon: Settings, label: 'dashboard.sidebar.settings' }
];

const adminMenuItems = [
  { path: '/admin/dashboard', icon: Shield, label: 'admin.dashboard', roles: ['admin', 'super_admin'] },
  { path: '/admin/users', icon: UserCheck, label: 'admin.users', roles: ['admin', 'super_admin'] },
  { path: '/admin/organizations', icon: Building2, label: 'admin.organizations', roles: ['admin', 'super_admin'] },
  { path: '/admin/venues', icon: MapPin, label: 'admin.venues', roles: ['admin', 'super_admin'] },
  { path: '/admin/payments', icon: CreditCard, label: 'admin.payments', roles: ['admin', 'super_admin'] },
  { path: '/admin/content', icon: FileText, label: 'admin.content', roles: ['admin', 'super_admin'] },
  { path: '/admin/badges', icon: Award, label: 'admin.badges', roles: ['admin', 'super_admin'] },
  { path: '/admin/files', icon: Database, label: 'admin.files', roles: ['admin', 'super_admin'] },
  { path: '/admin/api-integrations', icon: Zap, label: 'Intégrations API', roles: ['admin', 'super_admin'] },
  { path: '/admin/invitopia-ads', icon: Target, label: 'Invitopia Ads', roles: ['admin', 'super_admin'] }
];

const superAdminMenuItems = [
  { path: '/admin/super', icon: Sparkles, label: 'superAdmin.dashboard', roles: ['super_admin'] },
  { path: '/admin/monitoring', icon: Activity, label: 'admin.monitoring', roles: ['super_admin'] },
  { path: '/admin/public-content', icon: Crown, label: 'admin.publicContent', roles: ['super_admin'] }
];

interface AppSidebarProps {
  type?: 'dashboard' | 'settings' | 'admin';
}

const AppSidebar: React.FC<AppSidebarProps> = ({ type = 'dashboard' }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  
  const isActive = (path: string) => {
    if (path === '/templates' && location.pathname.startsWith('/templates')) {
      return true;
    }
    if (path === '/template-editor/new' && location.pathname.includes('/template-editor')) {
      return location.pathname.includes('/new');
    }
    return location.pathname === path;
  };
  
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const isSuperAdmin = user?.role === 'super_admin';

  const hasAccessToMenuItem = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logoutSuccess'));
    navigate('/');
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarRail />
      <SidebarHeader>
        <div className="px-2 py-2">
          <Link to="/dashboard" className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            {state === "expanded" && (
              <div className="ml-3">
                <span className="text-xl font-bold text-foreground">Invitopia</span>
              </div>
            )}
          </Link>
          
          {state === "expanded" && user && (
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role || t('user.role.user')}</p>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('common.navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={t(`common.${item.label}`)}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{t(item.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('admin.sectionTitle')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems
                  .filter(item => hasAccessToMenuItem(item.roles))
                  .map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        tooltip={typeof item.label === 'string' && item.label.includes('.') ? t(item.label) : item.label}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{typeof item.label === 'string' && item.label.includes('.') ? t(item.label) : item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {isSuperAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>{t('superAdmin.sectionTitle')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {superAdminMenuItems
                  .filter(item => hasAccessToMenuItem(item.roles))
                  .map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.path)}
                        tooltip={t(item.label)}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-5 w-5" />
                          <span>{t(item.label)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {state === "expanded" && t('auth.logout')}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
