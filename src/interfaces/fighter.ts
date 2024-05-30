import { FighterInfo } from "./fighter_info";
import { FighterStats } from "./fighter_stats";

export interface Fighter {
    FighterInfo: FighterInfo | null;
    FighterStats: FighterStats | null;
}