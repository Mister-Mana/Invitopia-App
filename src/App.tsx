import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicEventView from './pages/PublicEventView';
import PublicEventRedirect from './pages/PublicEventRedirect';
import GuestView from './pages/GuestView';
import GuestRSVP from './pages/GuestRSVP';
import { useAuth } from './contexts/auth';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEvent';
import EventDetailsPage from './pages/EventDetailsPage';
import EventEditPage from './pages/EventEditPage';
import MCProfile from './pages/MCProfile';
import MCPage from './pages/MCPage';
import WorkflowBuilder from './pages/WorkflowBuilder';
import MarketingCampaigns from './pages/MarketingCampaigns';
import EventManagementPage from './pages/EventManagement';
import GuestsPage from './pages/GuestView';
import ContactsPage from './pages/ContactsPage';
import InvitationsPage from './pages/InvitationsPage';
import TemplateGallery from './pages/TemplateGallery';
import AdvancedTemplateEditor from './pages/AdvancedTemplateEditor';
import TemplatesPage from './pages/TemplatesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/auth/Settings';
import ProfilePage from './pages/auth/ProfileNew';
import BillingPage from './pages/BillingPage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import OrganizationsManagementPage from './pages/admin/OrganizationsManagementPage';
import VenuesManagementPage from './pages/admin/VenuesManagementPage';
import PaymentsManagementPage from './pages/admin/PaymentsManagementPage';
import MCManagementPage from './pages/admin/MCManagementPage';
import PaymentValidationPage from './pages/admin/PaymentValidationPage';
import ContentManagementPage from './pages/admin/ContentManagementPage';
import BadgeManagementPage from './pages/admin/BadgeManagementPage';
import FileManagementPage from './pages/admin/FileManagementPage';
import ApiIntegrationsPage from './pages/admin/ApiIntegrationsPage';
import InvitopiaAdsPage from './pages/admin/InvitopiaAdsPage';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import MonitoringPage from './pages/admin/MonitoringPage';
import PublicContentPage from './pages/admin/PublicContentPage';
import TeamManagementPage from './pages/admin/TeamManagementPage';
import MenuConfigPage from './pages/admin/MenuConfigPage';
import NotFound from './pages/NotFound';
import PricingPage from './pages/Pricing';
import FeaturesPage from './pages/Features';
import ContactPage from './pages/help/Contact';
import AboutPage from './pages/About';
import Team from './pages/Team';
import Testimonials from './pages/Testimonials';
import Updates from './pages/Updates';
import PrivacyPolicy from './pages/legal/Privacy';
import TermsOfService from './pages/legal/Terms';
import Compliance from './pages/legal/Compliance';
import Cookies from './pages/legal/Cookies';
import HelpCenter from './pages/help/HelpCenter';
import CanvaEditor from './pages/templates/CanvaEditor';
import Index from './pages/Index';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Demo from './pages/Demo';

import AdvancedCanvaEditor from '@/pages/templates/AdvancedCanvaEditor';
import PremiumTemplateGallery from '@/components/templates/PremiumTemplateGallery';
import BadgeApplication from '@/pages/BadgeApplication';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        
        {/* Authentication routes - multiple paths for compatibility */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route path="/auth/login" element={user ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path="/auth/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        
        {/* Public pages */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/compliance" element={<Compliance />} />
        <Route path="/legal/cookies" element={<Cookies />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/status" element={<div className="container mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Service Status</h1><p>Tous les services sont opérationnels</p></div>} />
        
        {/* Public event view - no authentication required */}
        <Route path="/public/events/:eventId" element={<PublicEventView />} />
        <Route path="/rsvp/:eventId/:guestId" element={<GuestRSVP />} />
        <Route path="/invitation/:eventId/:guestId" element={<GuestRSVP />} />
        <Route path="/e/:eventId" element={<PublicEventRedirect />} />
        <Route path="/guests/:eventId" element={<GuestView />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        {/* Old route for compatibility */}
        <Route
          path="/events/:eventId"
          element={
            <ProtectedRoute>
              <EventDetailsPage />
            </ProtectedRoute>
          }
        />
        {/* Event edit route */}
        <Route
          path="/events/:eventId/edit"
          element={
            <ProtectedRoute>
              <EventEditPage />
            </ProtectedRoute>
          }
        />
        {/* New event management route */}
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventManagementPage />
            </ProtectedRoute>
          }
        />
        <Route path="/mc/:id" element={<MCProfile />} />
        <Route
          path="/mc"
          element={
            <ProtectedRoute>
              <MCPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflow-builder"
          element={
            <ProtectedRoute>
              <WorkflowBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketing-campaigns"
          element={
            <ProtectedRoute>
              <MarketingCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guests"
          element={
            <ProtectedRoute>
              <GuestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invitations"
          element={
            <ProtectedRoute>
              <InvitationsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Template routes */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/template-gallery"
          element={
            <ProtectedRoute>
              <TemplateGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/premium"
          element={
            <ProtectedRoute>
              <PremiumTemplateGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/editor/:id"
          element={
            <ProtectedRoute>
              <CanvaEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/advanced-editor/:id"
          element={
            <ProtectedRoute>
              <AdvancedTemplateEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/template-editor/:id?"
          element={
            <ProtectedRoute>
              <AdvancedTemplateEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/canva-editor/:id"
          element={
            <ProtectedRoute>
              <AdvancedCanvaEditor />
            </ProtectedRoute>
          }
        />
        
        <Route path="/admin/mc" element={<ProtectedRoute><MCManagementPage /></ProtectedRoute>} />
        <Route path="/admin/payments/validation" element={<ProtectedRoute><PaymentValidationPage /></ProtectedRoute>} />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/badge-application"
          element={
            <ProtectedRoute>
              <BadgeApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin specific routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/organizations"
          element={
            <ProtectedRoute>
              <OrganizationsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/venues"
          element={
            <ProtectedRoute>
              <VenuesManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute>
              <PaymentsManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedRoute>
              <ContentManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/badges"
          element={
            <ProtectedRoute>
              <BadgeManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/files"
          element={
            <ProtectedRoute>
              <FileManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/api-integrations"
          element={
            <ProtectedRoute>
              <ApiIntegrationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/invitopia-ads"
          element={
            <ProtectedRoute>
              <InvitopiaAdsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/super"
          element={
            <ProtectedRoute>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/monitoring"
          element={
            <ProtectedRoute>
              <MonitoringPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/public-content"
          element={
            <ProtectedRoute>
              <PublicContentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <ProtectedRoute>
              <TeamManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu-config"
          element={
            <ProtectedRoute>
              <MenuConfigPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <TeamManagementPage />
            </ProtectedRoute>
          }
        />
        
        {/* Missing create-event route */}
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        
        {/* Missing profile-new route */}
        <Route
          path="/profile-new"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;