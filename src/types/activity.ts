import { MethaAthlete } from "./methaAthlete";

export type Activity = {
  id: number;
  external_id: string;
  upload_id: number;
  athlete: MethaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  elev_high: number;
  elev_low: number;
  type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  start_latlng: number[];
};
