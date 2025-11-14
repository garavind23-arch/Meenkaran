import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService, SurveyResponse, ThreatRatings } from '../services/supabase.service';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent {
  formData: SurveyResponse = {
    age: '',
    education: '',
    works_in_conservation: '',
    awareness_rating: 0,
    q01_freshwater_keywords: '',
    q02_threatened_species: '',
    q03_endemic_fish: '',
    q04_major_threats: '',
    q05_threat_ratings: {
      large_hydroelectric: 1,
      commercial_fishing: 1,
      agricultural_runoff: 1,
      water_abstraction: 1,
      deforestation: 1,
      urban_runoff: 1,
      industrial_runoff: 1,
      subsistence_fishing: 1,
      river_interlinking: 1,
      exotic_aquaculture: 1,
      exotic_ornamental: 1,
      invasive_species: 1
    },
    q07_umbrella_species: '',
    q08_support_overlooked: '',
    q09_conservation_approach: '',
    q10_engagement_innovations: '',
    willing_to_volunteer: '',
    contact_name: '',
    contact_info: ''
  };

  threats = [
    { key: 'large_hydroelectric', label: 'Large hydroelectric projects' },
    { key: 'commercial_fishing', label: 'Commercial fishing' },
    { key: 'agricultural_runoff', label: 'Agricultural runoff' },
    { key: 'water_abstraction', label: 'Water abstraction' },
    { key: 'deforestation', label: 'Deforestation' },
    { key: 'urban_runoff', label: 'Urban runoff' },
    { key: 'industrial_runoff', label: 'Industrial runoff' },
    { key: 'subsistence_fishing', label: 'Subsistence fishing' },
    { key: 'river_interlinking', label: 'River interlinking' },
    { key: 'exotic_aquaculture', label: 'Exotic species introduced for aquaculture' },
    { key: 'exotic_ornamental', label: 'Exotic ornamental fish' },
    { key: 'invasive_species', label: 'Invasive species' }
  ];

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  String = String;

  constructor(private supabaseService: SupabaseService) {}

  async onSubmit() {
    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    try {
      await this.supabaseService.submitSurvey(this.formData);
      this.submitSuccess = true;
      this.resetForm();
    } catch (error: any) {
      this.submitError = error.message || 'Failed to submit survey. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.formData = {
      age: '',
      education: '',
      works_in_conservation: '',
      awareness_rating: 0,
      q01_freshwater_keywords: '',
      q02_threatened_species: '',
      q03_endemic_fish: '',
      q04_major_threats: '',
      q05_threat_ratings: {
        large_hydroelectric: 1,
        commercial_fishing: 1,
        agricultural_runoff: 1,
        water_abstraction: 1,
        deforestation: 1,
        urban_runoff: 1,
        industrial_runoff: 1,
        subsistence_fishing: 1,
        river_interlinking: 1,
        exotic_aquaculture: 1,
        exotic_ornamental: 1,
        invasive_species: 1
      },
      q07_umbrella_species: '',
      q08_support_overlooked: '',
      q09_conservation_approach: '',
      q10_engagement_innovations: '',
      willing_to_volunteer: '',
      contact_name: '',
      contact_info: ''
    };
  }

  getThreatRating(key: string): number {
    return (this.formData.q05_threat_ratings as any)[key] || 1;
  }

  setThreatRating(key: string, value: number) {
    (this.formData.q05_threat_ratings as any)[key] = value;
  }
}
