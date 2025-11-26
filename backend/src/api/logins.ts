import { Request, Response } from "express";
import { getLoginEvents, clearLoginEvents } from "../storage/loginEvents";

export function getLogins(req: Request, res: Response) {
  res.json(getLoginEvents());
}

export function clearLogins(req: Request, res: Response) {
  clearLoginEvents();
  res.json({ success: true });
}
