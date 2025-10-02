/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person submitting the form
      - `email` (text) - Email address for contact
      - `phone` (text) - Phone number for contact
      - `service` (text) - Type of cleaning service requested
      - `message` (text) - Message or additional details from the customer
      - `created_at` (timestamptz) - Timestamp when the submission was created

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their contact submissions
    - No read/update/delete policies needed as this is a contact form submission table
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
