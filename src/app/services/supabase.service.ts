import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface SurveyResponse {
  age: string;
  education: string;
  works_in_conservation: string;
  awareness_rating: number;
  q01_freshwater_keywords: string;
  q02_threatened_species: string;
  q03_endemic_fish: string;
  q04_major_threats: string;
  q05_threat_ratings: ThreatRatings;
  q07_umbrella_species: string;
  q08_support_overlooked: string;
  q09_conservation_approach: string;
  q10_engagement_innovations: string;
  willing_to_volunteer: string;
  contact_name?: string;
  contact_info?: string;
}

export interface ThreatRatings {
  large_hydroelectric: number;
  commercial_fishing: number;
  agricultural_runoff: number;
  water_abstraction: number;
  deforestation: number;
  urban_runoff: number;
  industrial_runoff: number;
  subsistence_fishing: number;
  river_interlinking: number;
  exotic_aquaculture: number;
  exotic_ornamental: number;
  invasive_species: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  async submitSurvey(response: SurveyResponse) {
    const { data, error } = await this.supabase
      .from('survey_responses')
      .insert([response])
      .select();

    if (error) {
      throw error;
    }

    return data;
  }
}
