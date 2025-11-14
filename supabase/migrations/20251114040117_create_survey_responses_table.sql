/*
  # Freshwater Ecosystems Conservation Survey Schema

  ## Overview
  This migration creates a table to store survey responses for freshwater ecosystems conservation awareness in India.

  ## New Tables
  
  ### `survey_responses`
  Stores all survey form submissions with the following fields:
  
  **Demographics:**
  - `id` (uuid, primary key) - Unique identifier for each response
  - `age` (text) - Respondent's age
  - `education` (text) - Education level (UG/PG/PhD)
  - `works_in_conservation` (text) - Whether they work in conservation field
  - `awareness_rating` (integer) - Self-rated awareness (0-5 scale)
  
  **Survey Questions:**
  - `q01_freshwater_keywords` (text) - Keywords about freshwater ecosystems
  - `q02_threatened_species` (text) - List of threatened species
  - `q03_endemic_fish` (text) - Endemic fish species in Western Ghats
  - `q04_major_threats` (text) - Major threats to freshwater ecosystems
  - `q05_threat_ratings` (jsonb) - Ratings for various threats (A-L)
  - `q07_umbrella_species` (text) - Ideal umbrella species for conservation
  - `q08_support_overlooked` (text) - Support for overlooked biodiversity
  - `q09_conservation_approach` (text) - Single or multiple location approach
  - `q10_engagement_innovations` (text) - Ideas for public engagement
  
  **Follow-up:**
  - `willing_to_volunteer` (text) - Willingness to volunteer time/funds
  - `contact_name` (text, nullable) - Optional contact name
  - `contact_info` (text, nullable) - Optional contact information
  
  **Metadata:**
  - `created_at` (timestamptz) - Timestamp of submission
  
  ## Security
  - Enable RLS on `survey_responses` table
  - Add policy allowing anyone to insert survey responses (public form)
  - Add policy for authenticated users to view all responses (for admin/analysis)
  
  ## Notes
  - The form is public-facing, so INSERT is allowed for anonymous users
  - Contact information is optional and nullable
  - Threat ratings stored as JSONB for flexible querying and analysis
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  age text NOT NULL,
  education text NOT NULL,
  works_in_conservation text NOT NULL,
  awareness_rating integer NOT NULL CHECK (awareness_rating >= 0 AND awareness_rating <= 5),
  q01_freshwater_keywords text NOT NULL,
  q02_threatened_species text NOT NULL,
  q03_endemic_fish text NOT NULL,
  q04_major_threats text NOT NULL,
  q05_threat_ratings jsonb NOT NULL,
  q07_umbrella_species text NOT NULL,
  q08_support_overlooked text NOT NULL,
  q09_conservation_approach text NOT NULL,
  q10_engagement_innovations text NOT NULL,
  willing_to_volunteer text NOT NULL,
  contact_name text,
  contact_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit survey responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);
