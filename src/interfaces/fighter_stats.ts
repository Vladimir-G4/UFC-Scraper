export interface FighterStats {
    Record: string;
    WinByMethod: { KO: string, Decision: string, Submission: string };
    AvgFightTime: string;
    SigStrikeByPosition: {Standing: string, Clinch: string, Ground: string};
    SigStrikeByTarget: {Head: string, Body: string, Leg: string};
    StrikingAccuracy: {SigStrikesLanded: string, SigStrikesAttempted: string};
    TakedownAccuracy: {TakedownsLanded: string, TakedownsAttempted: string};
}