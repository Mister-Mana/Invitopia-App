export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          action_type: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string
        }
        Relationships: []
      }
      advanced_templates: {
        Row: {
          animations: Json | null
          assets: Json
          canvas_data: Json
          category: string
          created_at: string
          created_by: string | null
          download_count: number | null
          id: string
          interactive_elements: Json | null
          is_ai_generated: boolean | null
          is_premium: boolean | null
          layers: Json
          name: string
          preview_urls: string[] | null
          rating: number | null
          tags: string[] | null
          thumbnail_url: string | null
          type: string
          updated_at: string
        }
        Insert: {
          animations?: Json | null
          assets?: Json
          canvas_data?: Json
          category: string
          created_at?: string
          created_by?: string | null
          download_count?: number | null
          id?: string
          interactive_elements?: Json | null
          is_ai_generated?: boolean | null
          is_premium?: boolean | null
          layers?: Json
          name: string
          preview_urls?: string[] | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          animations?: Json | null
          assets?: Json
          canvas_data?: Json
          category?: string
          created_at?: string
          created_by?: string | null
          download_count?: number | null
          id?: string
          interactive_elements?: Json | null
          is_ai_generated?: boolean | null
          is_premium?: boolean | null
          layers?: Json
          name?: string
          preview_urls?: string[] | null
          rating?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      advertising_accounts: {
        Row: {
          account_name: string
          account_type: string
          billing_info: Json | null
          created_at: string
          current_spent: number | null
          id: string
          monthly_budget: number
          organizer_id: string | null
          payment_method_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          account_name: string
          account_type?: string
          billing_info?: Json | null
          created_at?: string
          current_spent?: number | null
          id?: string
          monthly_budget: number
          organizer_id?: string | null
          payment_method_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          account_name?: string
          account_type?: string
          billing_info?: Json | null
          created_at?: string
          current_spent?: number | null
          id?: string
          monthly_budget?: number
          organizer_id?: string | null
          payment_method_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      api_integrations: {
        Row: {
          api_key_encrypted: string | null
          configuration: Json | null
          created_at: string
          created_by: string | null
          endpoint: string
          id: string
          last_sync: string | null
          name: string
          status: string
          sync_frequency: string | null
          type: string
          updated_at: string
        }
        Insert: {
          api_key_encrypted?: string | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          endpoint: string
          id?: string
          last_sync?: string | null
          name: string
          status?: string
          sync_frequency?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          api_key_encrypted?: string | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          endpoint?: string
          id?: string
          last_sync?: string | null
          name?: string
          status?: string
          sync_frequency?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      app_configuration: {
        Row: {
          app_icon_url: string | null
          app_title: string
          created_at: string
          created_by: string | null
          favicon_url: string | null
          id: string
          is_active: boolean
          meta_description: string | null
          updated_at: string
        }
        Insert: {
          app_icon_url?: string | null
          app_title?: string
          created_at?: string
          created_by?: string | null
          favicon_url?: string | null
          id?: string
          is_active?: boolean
          meta_description?: string | null
          updated_at?: string
        }
        Update: {
          app_icon_url?: string | null
          app_title?: string
          created_at?: string
          created_by?: string | null
          favicon_url?: string | null
          id?: string
          is_active?: boolean
          meta_description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          application_reason: string | null
          applied_at: string
          badge_type: Database["public"]["Enums"]["badge_type"]
          created_at: string
          expires_at: string | null
          id: string
          metadata: Json | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          price: number
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["badge_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          application_reason?: string | null
          applied_at?: string
          badge_type: Database["public"]["Enums"]["badge_type"]
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          price?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["badge_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          application_reason?: string | null
          applied_at?: string
          badge_type?: Database["public"]["Enums"]["badge_type"]
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          price?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["badge_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "badges_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_group_members: {
        Row: {
          added_at: string
          contact_id: string | null
          group_id: string | null
          id: string
        }
        Insert: {
          added_at?: string
          contact_id?: string | null
          group_id?: string | null
          id?: string
        }
        Update: {
          added_at?: string
          contact_id?: string | null
          group_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_group_members_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "contact_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_groups: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          is_favorite: boolean | null
          name: string
          notes: string | null
          organization: string | null
          phone: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_favorite?: boolean | null
          name: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_favorite?: boolean | null
          name?: string
          notes?: string | null
          organization?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          allow_plus_ones: boolean | null
          capacity: number | null
          cover_images: string[] | null
          created_at: string
          custom_fields: Json | null
          description: string | null
          design: Json | null
          end_date: string | null
          event_url: string | null
          id: string
          invitation_image_url: string | null
          invitation_template_id: string | null
          is_draft: boolean | null
          location: Json | null
          max_guests_per_invitation: number | null
          organizer_id: string
          primary_cover_image: string | null
          program: Json | null
          qr_code_data: string | null
          registration_deadline: string | null
          requires_approval: boolean | null
          rsvp_deadline: string | null
          settings: Json | null
          start_date: string
          status: Database["public"]["Enums"]["event_status"]
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string
          visibility: Database["public"]["Enums"]["event_visibility"]
        }
        Insert: {
          allow_plus_ones?: boolean | null
          capacity?: number | null
          cover_images?: string[] | null
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          design?: Json | null
          end_date?: string | null
          event_url?: string | null
          id?: string
          invitation_image_url?: string | null
          invitation_template_id?: string | null
          is_draft?: boolean | null
          location?: Json | null
          max_guests_per_invitation?: number | null
          organizer_id: string
          primary_cover_image?: string | null
          program?: Json | null
          qr_code_data?: string | null
          registration_deadline?: string | null
          requires_approval?: boolean | null
          rsvp_deadline?: string | null
          settings?: Json | null
          start_date: string
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["event_visibility"]
        }
        Update: {
          allow_plus_ones?: boolean | null
          capacity?: number | null
          cover_images?: string[] | null
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          design?: Json | null
          end_date?: string | null
          event_url?: string | null
          id?: string
          invitation_image_url?: string | null
          invitation_template_id?: string | null
          is_draft?: boolean | null
          location?: Json | null
          max_guests_per_invitation?: number | null
          organizer_id?: string
          primary_cover_image?: string | null
          program?: Json | null
          qr_code_data?: string | null
          registration_deadline?: string | null
          requires_approval?: boolean | null
          rsvp_deadline?: string | null
          settings?: Json | null
          start_date?: string
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["event_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "events_invitation_template_id_fkey"
            columns: ["invitation_template_id"]
            isOneToOne: false
            referencedRelation: "invitation_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      file_uploads: {
        Row: {
          created_at: string
          file_size: number
          google_drive_file_id: string | null
          id: string
          is_public: boolean
          metadata: Json | null
          mime_type: string
          original_filename: string
          storage_path: string
          stored_filename: string
          upload_source: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size: number
          google_drive_file_id?: string | null
          id?: string
          is_public?: boolean
          metadata?: Json | null
          mime_type: string
          original_filename: string
          storage_path: string
          stored_filename: string
          upload_source?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number
          google_drive_file_id?: string | null
          id?: string
          is_public?: boolean
          metadata?: Json | null
          mime_type?: string
          original_filename?: string
          storage_path?: string
          stored_filename?: string
          upload_source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          beverage_preferences: string | null
          check_in_time: string | null
          checked_in: boolean
          created_at: string
          custom_responses: Json | null
          dietary_restrictions: string | null
          email: string | null
          event_id: string
          food_preferences: string | null
          golden_book_message: string | null
          group_id: string | null
          id: string
          invitation_sent: boolean
          invitation_sent_date: string | null
          name: string
          notes: string | null
          phone: string | null
          plus_one_details: Json | null
          plus_ones: number | null
          qr_code: string | null
          qr_code_generated_at: string | null
          response_date: string | null
          rsvp_status: Database["public"]["Enums"]["rsvp_status"]
          secret_token: string
          table_assignment: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          beverage_preferences?: string | null
          check_in_time?: string | null
          checked_in?: boolean
          created_at?: string
          custom_responses?: Json | null
          dietary_restrictions?: string | null
          email?: string | null
          event_id: string
          food_preferences?: string | null
          golden_book_message?: string | null
          group_id?: string | null
          id?: string
          invitation_sent?: boolean
          invitation_sent_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          plus_one_details?: Json | null
          plus_ones?: number | null
          qr_code?: string | null
          qr_code_generated_at?: string | null
          response_date?: string | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          secret_token?: string
          table_assignment?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          beverage_preferences?: string | null
          check_in_time?: string | null
          checked_in?: boolean
          created_at?: string
          custom_responses?: Json | null
          dietary_restrictions?: string | null
          email?: string | null
          event_id?: string
          food_preferences?: string | null
          golden_book_message?: string | null
          group_id?: string | null
          id?: string
          invitation_sent?: boolean
          invitation_sent_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          plus_one_details?: Json | null
          plus_ones?: number | null
          qr_code?: string | null
          qr_code_generated_at?: string | null
          response_date?: string | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          secret_token?: string
          table_assignment?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_templates: {
        Row: {
          content: string
          created_at: string
          design_data: Json | null
          id: string
          is_default: boolean | null
          is_public: boolean | null
          name: string
          subject: string | null
          type: string
          updated_at: string
          usage_count: number | null
          user_id: string
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          design_data?: Json | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name: string
          subject?: string | null
          type: string
          updated_at?: string
          usage_count?: number | null
          user_id: string
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          design_data?: Json | null
          id?: string
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string
          usage_count?: number | null
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      invitations: {
        Row: {
          created_at: string
          delivery_method: Json | null
          event_id: string | null
          guest_id: string | null
          id: string
          invitation_type: string
          opened_at: string | null
          responded_at: string | null
          sent_at: string | null
          status: string
          template_data: Json | null
          tracking_data: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_method?: Json | null
          event_id?: string | null
          guest_id?: string | null
          id?: string
          invitation_type?: string
          opened_at?: string | null
          responded_at?: string | null
          sent_at?: string | null
          status?: string
          template_data?: Json | null
          tracking_data?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_method?: Json | null
          event_id?: string | null
          guest_id?: string | null
          id?: string
          invitation_type?: string
          opened_at?: string | null
          responded_at?: string | null
          sent_at?: string | null
          status?: string
          template_data?: Json | null
          tracking_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          ad_content: Json | null
          budget: number | null
          clicks: number | null
          conversions: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          impressions: number | null
          name: string
          spent: number | null
          start_date: string | null
          status: string | null
          target_audience: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ad_content?: Json | null
          budget?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          impressions?: number | null
          name: string
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ad_content?: Json | null
          budget?: number | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          impressions?: number | null
          name?: string
          spent?: number | null
          start_date?: string | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      master_of_ceremonies: {
        Row: {
          available_dates: Json | null
          badge_category: Database["public"]["Enums"]["badge_category"] | null
          badge_expires_at: string | null
          bio: string | null
          business_name: string
          contact_info: Json | null
          cover_image: string | null
          created_at: string
          experience_years: number | null
          gallery_images: string[] | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          location: string | null
          pricing_info: Json | null
          profile_image: string | null
          rating: number | null
          services: Json | null
          social_media: Json | null
          specialties: string[] | null
          total_reviews: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_dates?: Json | null
          badge_category?: Database["public"]["Enums"]["badge_category"] | null
          badge_expires_at?: string | null
          bio?: string | null
          business_name: string
          contact_info?: Json | null
          cover_image?: string | null
          created_at?: string
          experience_years?: number | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          pricing_info?: Json | null
          profile_image?: string | null
          rating?: number | null
          services?: Json | null
          social_media?: Json | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_dates?: Json | null
          badge_category?: Database["public"]["Enums"]["badge_category"] | null
          badge_expires_at?: string | null
          bio?: string | null
          business_name?: string
          contact_info?: Json | null
          cover_image?: string | null
          created_at?: string
          experience_years?: number | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          location?: string | null
          pricing_info?: Json | null
          profile_image?: string | null
          rating?: number | null
          services?: Json | null
          social_media?: Json | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mc_conversations: {
        Row: {
          client_id: string
          created_at: string
          id: string
          is_read_by_client: boolean | null
          is_read_by_mc: boolean | null
          last_message: string | null
          last_message_at: string | null
          mc_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          is_read_by_client?: boolean | null
          is_read_by_mc?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          mc_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          is_read_by_client?: boolean | null
          is_read_by_mc?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          mc_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mc_conversations_mc_id_fkey"
            columns: ["mc_id"]
            isOneToOne: false
            referencedRelation: "master_of_ceremonies"
            referencedColumns: ["id"]
          },
        ]
      }
      mc_messages: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          message: string
          sender_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          message: string
          sender_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mc_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "mc_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          event_id: string | null
          guest_id: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          guest_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          guest_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string
          created_by: string
          id: string
          logo: string | null
          name: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by: string
          id?: string
          logo?: string | null
          name: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string
          id?: string
          logo?: string | null
          name?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          event_id: string | null
          id: string
          metadata: Json | null
          net_amount: number | null
          payment_method: string
          processed_at: string | null
          status: string
          stripe_payment_id: string | null
          transaction_fee: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          event_id?: string | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method: string
          processed_at?: string | null
          status?: string
          stripe_payment_id?: string | null
          transaction_fee?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          event_id?: string | null
          id?: string
          metadata?: Json | null
          net_amount?: number | null
          payment_method?: string
          processed_at?: string | null
          status?: string
          stripe_payment_id?: string | null
          transaction_fee?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          organization: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id: string
          name: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      promotion_requests: {
        Row: {
          ad_content: Json
          approved_at: string | null
          approved_by: string | null
          budget: number
          campaign_name: string
          clicks: number | null
          conversions: number | null
          cost_per_click: number | null
          created_at: string
          end_date: string
          event_id: string | null
          id: string
          impressions: number | null
          organizer_id: string | null
          start_date: string
          status: string
          target_audience: Json | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          ad_content: Json
          approved_at?: string | null
          approved_by?: string | null
          budget: number
          campaign_name: string
          clicks?: number | null
          conversions?: number | null
          cost_per_click?: number | null
          created_at?: string
          end_date: string
          event_id?: string | null
          id?: string
          impressions?: number | null
          organizer_id?: string | null
          start_date: string
          status?: string
          target_audience?: Json | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          ad_content?: Json
          approved_at?: string | null
          approved_by?: string | null
          budget?: number
          campaign_name?: string
          clicks?: number | null
          conversions?: number | null
          cost_per_click?: number | null
          created_at?: string
          end_date?: string
          event_id?: string | null
          id?: string
          impressions?: number | null
          organizer_id?: string | null
          start_date?: string
          status?: string
          target_audience?: Json | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_requests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
        ]
      }
      site_content: {
        Row: {
          content: Json | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string
          created_by: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean
          metadata: Json | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          metadata?: Json | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string
          created_by?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          metadata?: Json | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_activities: {
        Row: {
          action_type: string
          created_at: string
          description: string
          id: string
          ip_address: unknown
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_monitoring: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          severity: string
          source: string
          timestamp: string
          value: Json
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          severity?: string
          source: string
          timestamp?: string
          value: Json
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          severity?: string
          source?: string
          timestamp?: string
          value?: Json
        }
        Relationships: []
      }
      tables: {
        Row: {
          assignments: Json | null
          capacity: number
          category: string | null
          coordinates: Json | null
          created_at: string
          event_id: string
          id: string
          location: string | null
          name: string
          notes: string | null
          shape: string | null
        }
        Insert: {
          assignments?: Json | null
          capacity: number
          category?: string | null
          coordinates?: Json | null
          created_at?: string
          event_id: string
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          shape?: string | null
        }
        Update: {
          assignments?: Json | null
          capacity?: number
          category?: string | null
          coordinates?: Json | null
          created_at?: string
          event_id?: string
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          shape?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tables_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tables_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          access_level: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          invited_at: string
          invited_by: string | null
          joined_at: string | null
          permissions: Json | null
          position: string | null
          role: string
          status: string
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          access_level?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          invited_at?: string
          invited_by?: string | null
          joined_at?: string | null
          permissions?: Json | null
          position?: string | null
          role?: string
          status?: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          access_level?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          invited_at?: string
          invited_by?: string | null
          joined_at?: string | null
          permissions?: Json | null
          position?: string | null
          role?: string
          status?: string
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          avatar_url: string | null
          budget: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          owner_id: string
          settings: Json | null
          status: string | null
          team_type: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          budget?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          owner_id: string
          settings?: Json | null
          status?: string | null
          team_type?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          budget?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          owner_id?: string
          settings?: Json | null
          status?: string | null
          team_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string | null
          created_at: string
          default_data: Json | null
          elements: Json | null
          id: string
          is_public: boolean
          is_system: boolean
          layout: Json | null
          name: string
          owner_id: string | null
          popularity: number | null
          preview_images: string[] | null
          required_fields: string[] | null
          tags: string[] | null
          thumbnail: string | null
          type: Database["public"]["Enums"]["template_type"]
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          default_data?: Json | null
          elements?: Json | null
          id?: string
          is_public?: boolean
          is_system?: boolean
          layout?: Json | null
          name: string
          owner_id?: string | null
          popularity?: number | null
          preview_images?: string[] | null
          required_fields?: string[] | null
          tags?: string[] | null
          thumbnail?: string | null
          type: Database["public"]["Enums"]["template_type"]
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          default_data?: Json | null
          elements?: Json | null
          id?: string
          is_public?: boolean
          is_system?: boolean
          layout?: Json | null
          name?: string
          owner_id?: string | null
          popularity?: number | null
          preview_images?: string[] | null
          required_fields?: string[] | null
          tags?: string[] | null
          thumbnail?: string | null
          type?: Database["public"]["Enums"]["template_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      venue_bookings: {
        Row: {
          booking_date: string
          booking_details: Json | null
          created_at: string
          end_time: string
          event_id: string | null
          id: string
          notes: string | null
          organizer_id: string
          start_time: string
          status: string | null
          total_cost: number
          updated_at: string
          venue_id: string
        }
        Insert: {
          booking_date: string
          booking_details?: Json | null
          created_at?: string
          end_time: string
          event_id?: string | null
          id?: string
          notes?: string | null
          organizer_id: string
          start_time: string
          status?: string | null
          total_cost?: number
          updated_at?: string
          venue_id: string
        }
        Update: {
          booking_date?: string
          booking_details?: Json | null
          created_at?: string
          end_time?: string
          event_id?: string | null
          id?: string
          notes?: string | null
          organizer_id?: string
          start_time?: string
          status?: string | null
          total_cost?: number
          updated_at?: string
          venue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "public_events_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_bookings_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          amenities: string[] | null
          availability: Json | null
          capacity: number
          contact_info: Json | null
          cover_image: string | null
          created_at: string
          created_by: string
          description: string | null
          gallery_images: string[] | null
          id: string
          images: string[] | null
          location: string
          name: string
          price: number
          rating: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          availability?: Json | null
          capacity?: number
          contact_info?: Json | null
          cover_image?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          gallery_images?: string[] | null
          id?: string
          images?: string[] | null
          location: string
          name: string
          price?: number
          rating?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          availability?: Json | null
          capacity?: number
          contact_info?: Json | null
          cover_image?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          gallery_images?: string[] | null
          id?: string
          images?: string[] | null
          location?: string
          name?: string
          price?: number
          rating?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string | null
          id: string
          is_active: boolean | null
          name: string
          steps: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          steps?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_events_view: {
        Row: {
          attendees_count: number | null
          capacity: number | null
          cover_images: string[] | null
          created_at: string | null
          custom_fields: Json | null
          description: string | null
          design: Json | null
          end_date: string | null
          id: string | null
          location: Json | null
          organizer_id: string | null
          primary_cover_image: string | null
          registration_deadline: string | null
          settings: Json | null
          start_date: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          title: string | null
          total_capacity: number | null
          type: Database["public"]["Enums"]["event_type"] | null
          updated_at: string | null
          visibility: Database["public"]["Enums"]["event_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_team_statistics: { Args: never; Returns: Json }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_activity:
        | {
            Args: {
              p_action_type: string
              p_description?: string
              p_metadata?: Json
              p_resource_id?: string
              p_resource_type: string
            }
            Returns: string
          }
        | {
            Args: {
              activity_description: string
              activity_type: string
              user_id: string
            }
            Returns: undefined
          }
        | {
            Args: { activity_description: string; user_id?: string }
            Returns: undefined
          }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "organizer" | "mc" | "guest"
      badge_category: "verified" | "premium" | "featured"
      badge_status: "pending" | "approved" | "rejected" | "active" | "revoked"
      badge_type: "excellence" | "professional" | "verified" | "premium"
      content_type:
        | "home_hero"
        | "home_features"
        | "testimonial"
        | "pricing_plan"
        | "public_event"
        | "page_content"
      event_status: "draft" | "published" | "canceled" | "completed"
      event_type:
        | "wedding"
        | "birthday"
        | "corporate"
        | "conference"
        | "concert"
        | "other"
        | "charity"
        | "sports"
        | "education"
        | "graduation"
        | "baby-shower"
        | "housewarming"
        | "theater"
      event_visibility: "public" | "private" | "unlisted"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      rsvp_status: "pending" | "confirmed" | "declined" | "maybe"
      template_type:
        | "invitation"
        | "ticket"
        | "rsvp"
        | "thank-you"
        | "save-the-date"
        | "menu"
        | "program"
      user_role: "super_admin" | "admin" | "organizer" | "guest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "organizer", "mc", "guest"],
      badge_category: ["verified", "premium", "featured"],
      badge_status: ["pending", "approved", "rejected", "active", "revoked"],
      badge_type: ["excellence", "professional", "verified", "premium"],
      content_type: [
        "home_hero",
        "home_features",
        "testimonial",
        "pricing_plan",
        "public_event",
        "page_content",
      ],
      event_status: ["draft", "published", "canceled", "completed"],
      event_type: [
        "wedding",
        "birthday",
        "corporate",
        "conference",
        "concert",
        "other",
        "charity",
        "sports",
        "education",
        "graduation",
        "baby-shower",
        "housewarming",
        "theater",
      ],
      event_visibility: ["public", "private", "unlisted"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      rsvp_status: ["pending", "confirmed", "declined", "maybe"],
      template_type: [
        "invitation",
        "ticket",
        "rsvp",
        "thank-you",
        "save-the-date",
        "menu",
        "program",
      ],
      user_role: ["super_admin", "admin", "organizer", "guest"],
    },
  },
} as const
