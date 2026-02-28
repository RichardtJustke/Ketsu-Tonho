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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string | null
          complement: string | null
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          neighborhood: string | null
          number: string | null
          state: string | null
          street: string | null
          user_id: string
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          neighborhood?: string | null
          number?: string | null
          state?: string | null
          street?: string | null
          user_id: string
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          neighborhood?: string | null
          number?: string | null
          state?: string | null
          street?: string | null
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      admin_permissions: {
        Row: {
          can_edit_supply: boolean
          can_gen_email: boolean
          can_manage_orders: boolean
          can_manage_users: boolean
          id: string
          user_id: string
        }
        Insert: {
          can_edit_supply?: boolean
          can_gen_email?: boolean
          can_manage_orders?: boolean
          can_manage_users?: boolean
          id?: string
          user_id: string
        }
        Update: {
          can_edit_supply?: boolean
          can_gen_email?: boolean
          can_manage_orders?: boolean
          can_manage_users?: boolean
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      buffet_events: {
        Row: {
          created_at: string
          event_date: string
          event_location: string | null
          guest_count: number
          id: string
          notes: string | null
          order_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_date: string
          event_location?: string | null
          guest_count?: number
          id?: string
          notes?: string | null
          order_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_date?: string
          event_location?: string | null
          guest_count?: number
          id?: string
          notes?: string | null
          order_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "buffet_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      buffet_order_items: {
        Row: {
          id: string
          menu_item_id: string
          notes: string | null
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          menu_item_id: string
          notes?: string | null
          order_id: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          id?: string
          menu_item_id?: string
          notes?: string | null
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "buffet_order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buffet_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          end_date: string | null
          equipment_id: string | null
          id: string
          menu_item_id: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          quantity: number
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          equipment_id?: string | null
          id?: string
          menu_item_id?: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          quantity?: number
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          equipment_id?: string | null
          id?: string
          menu_item_id?: string | null
          platform?: Database["public"]["Enums"]["platform_type"]
          quantity?: number
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          platform: Database["public"]["Enums"]["platform_type"]
          recipient_email: string
          recipient_user_id: string | null
          status: string
          subject: string
          template_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          platform: Database["public"]["Enums"]["platform_type"]
          recipient_email: string
          recipient_user_id?: string | null
          status?: string
          subject: string
          template_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          recipient_email?: string
          recipient_user_id?: string | null
          status?: string
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          platform: Database["public"]["Enums"]["platform_type"] | null
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          platform?: Database["public"]["Enums"]["platform_type"] | null
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          platform?: Database["public"]["Enums"]["platform_type"] | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          category_id: string | null
          created_at: string
          daily_price: number
          deposit_amount: number
          description: string | null
          id: string
          is_active: boolean
          name: string
          stock_available: number
          stock_total: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          daily_price?: number
          deposit_amount?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          stock_available?: number
          stock_total?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          daily_price?: number
          deposit_amount?: number
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          stock_available?: number
          stock_total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "equipment_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      equipment_images: {
        Row: {
          display_order: number
          equipment_id: string
          id: string
          image_url: string
          is_primary: boolean
        }
        Insert: {
          display_order?: number
          equipment_id: string
          id?: string
          image_url: string
          is_primary?: boolean
        }
        Update: {
          display_order?: number
          equipment_id?: string
          id?: string
          image_url?: string
          is_primary?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "equipment_images_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_inventory_log: {
        Row: {
          action: Database["public"]["Enums"]["inventory_action"]
          created_at: string
          equipment_id: string
          id: string
          notes: string | null
          performed_by: string | null
          quantity_change: number
        }
        Insert: {
          action: Database["public"]["Enums"]["inventory_action"]
          created_at?: string
          equipment_id: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          quantity_change?: number
        }
        Update: {
          action?: Database["public"]["Enums"]["inventory_action"]
          created_at?: string
          equipment_id?: string
          id?: string
          notes?: string | null
          performed_by?: string | null
          quantity_change?: number
        }
        Relationships: [
          {
            foreignKeyName: "equipment_inventory_log_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      menu_item_images: {
        Row: {
          display_order: number
          id: string
          image_url: string
          is_primary: boolean
          menu_item_id: string
        }
        Insert: {
          display_order?: number
          id?: string
          image_url: string
          is_primary?: boolean
          menu_item_id: string
        }
        Update: {
          display_order?: number
          id?: string
          image_url?: string
          is_primary?: boolean
          menu_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_images_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          min_servings: number
          name: string
          price_per_serving: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          min_servings?: number
          name: string
          price_per_serving?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          min_servings?: number
          name?: string
          price_per_serving?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_fee: number
          id: string
          notes: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_fee?: number
          id?: string
          notes?: string | null
          platform: Database["public"]["Enums"]["platform_type"]
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_fee?: number
          id?: string
          notes?: string | null
          platform?: Database["public"]["Enums"]["platform_type"]
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          mercado_pago_id: string | null
          order_id: string
          payment_method: string | null
          raw_response: Json | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          mercado_pago_id?: string | null
          order_id: string
          payment_method?: string | null
          raw_response?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          mercado_pago_id?: string | null
          order_id?: string
          payment_method?: string | null
          raw_response?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cpf: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          id: string
          is_active?: boolean
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          cpf?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rental_bookings: {
        Row: {
          created_at: string
          delivery_address_id: string | null
          delivery_fee: number
          end_date: string
          equipment_id: string
          id: string
          notes: string | null
          order_id: string | null
          quantity: number
          start_date: string
          status: Database["public"]["Enums"]["booking_status"]
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_address_id?: string | null
          delivery_fee?: number
          end_date: string
          equipment_id: string
          id?: string
          notes?: string | null
          order_id?: string | null
          quantity?: number
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_address_id?: string | null
          delivery_fee?: number
          end_date?: string
          equipment_id?: string
          id?: string
          notes?: string | null
          order_id?: string | null
          quantity?: number
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_bookings_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rental_bookings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          categoria: string
          created_at: string
          descricao_breve: string | null
          id: string
          imagem_principal_card: string | null
          ordem: number | null
          titulo: string
        }
        Insert: {
          categoria: string
          created_at?: string
          descricao_breve?: string | null
          id?: string
          imagem_principal_card?: string | null
          ordem?: number | null
          titulo: string
        }
        Update: {
          categoria?: string
          created_at?: string
          descricao_breve?: string | null
          id?: string
          imagem_principal_card?: string | null
          ordem?: number | null
          titulo?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer"
      booking_status:
      | "pending"
      | "confirmed"
      | "in_progress"
      | "returned"
      | "cancelled"
      inventory_action:
      | "received"
      | "rented_out"
      | "returned"
      | "maintenance_start"
      | "maintenance_end"
      | "retired"
      | "adjustment"
      order_status:
      | "pending"
      | "confirmed"
      | "paid"
      | "in_progress"
      | "completed"
      | "cancelled"
      | "refunded"
      payment_status:
      | "pending"
      | "approved"
      | "rejected"
      | "refunded"
      | "cancelled"
      platform_type: "tonho" | "chicas"
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
      app_role: ["admin", "customer"],
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "returned",
        "cancelled",
      ],
      inventory_action: [
        "received",
        "rented_out",
        "returned",
        "maintenance_start",
        "maintenance_end",
        "retired",
        "adjustment",
      ],
      order_status: [
        "pending",
        "confirmed",
        "paid",
        "in_progress",
        "completed",
        "cancelled",
        "refunded",
      ],
      payment_status: [
        "pending",
        "approved",
        "rejected",
        "refunded",
        "cancelled",
      ],
      platform_type: ["tonho", "chicas"],
    },
  },
} as const
