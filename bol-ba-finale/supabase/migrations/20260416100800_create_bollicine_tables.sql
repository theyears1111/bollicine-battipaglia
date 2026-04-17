/*
  # Bollicine Restaurant — Database Schema

  ## Overview
  Creates the core tables for the Bollicine restaurant website.

  ## New Tables

  ### 1. reservations
  Stores table booking requests submitted via the Prenotazioni page.
  - id: auto-generated UUID
  - nome, cognome: guest name
  - email: contact email
  - telefono: phone number
  - data_prenotazione: requested date
  - orario: requested time slot (e.g. "20:00")
  - numero_persone: party size (1–20)
  - occasione: optional occasion type (Compleanno, Anniversario, etc.)
  - note: free-text special requests
  - created_at: submission timestamp

  ### 2. contact_messages
  Stores contact form submissions from the Contatti page.
  - id, nome, email, messaggio, created_at

  ### 3. event_requests
  Stores event/private dining enquiries from the Eventi page.
  - id, nome, email, telefono, tipo_evento, data_evento, numero_persone, messaggio, created_at

  ## Security
  - RLS enabled on all tables
  - INSERT allowed for anonymous users (public form submission)
  - SELECT/UPDATE/DELETE restricted to authenticated service-role only (admin access)
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cognome text NOT NULL,
  email text NOT NULL,
  telefono text NOT NULL,
  data_prenotazione date NOT NULL,
  orario text NOT NULL,
  numero_persone integer NOT NULL DEFAULT 2,
  occasione text,
  note text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a reservation"
  ON reservations
  FOR INSERT
  TO anon
  WITH CHECK (
    nome IS NOT NULL AND
    cognome IS NOT NULL AND
    email IS NOT NULL AND
    telefono IS NOT NULL AND
    data_prenotazione IS NOT NULL AND
    orario IS NOT NULL
  );

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  messaggio text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    nome IS NOT NULL AND
    email IS NOT NULL AND
    messaggio IS NOT NULL
  );

CREATE TABLE IF NOT EXISTS event_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  telefono text NOT NULL,
  tipo_evento text,
  data_evento date,
  numero_persone integer,
  messaggio text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an event request"
  ON event_requests
  FOR INSERT
  TO anon
  WITH CHECK (
    nome IS NOT NULL AND
    email IS NOT NULL AND
    telefono IS NOT NULL
  );
