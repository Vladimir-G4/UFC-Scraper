import axios from 'axios';
import * as cheerio from 'cheerio';

interface Fighter {
  FighterInfo: FighterInfo | null;
  FighterStats: FighterStats | null;
}

export async function getFighter(fighterName: string = 'max holloway'): Promise<Fighter | null> {
  try {
    let [fighterInfo, fighterStats] = await Promise.all([
      getFighterInfo(fighterName),
      getFighterStats(fighterName)
    ]);
    
    return {
      FighterInfo: fighterInfo,
      FighterStats: fighterStats
    };
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
}

interface FighterInfo {
  Name: string;
  Nickname: string;
  Status: string;
  Age: string;
  Height: string;
  Weight: string;
  ArmReach: string;
  LegReach: string;
  FightingStyle: string;
  Division: string;
  PlaceOfBirth: string;
  TrainingCamp: string;
  OctagonDebut: string;
  ImageURL: string | undefined;
}

export async function getFighterInfo(fighterName: string = 'max holloway'): Promise<FighterInfo | null> {
  const formattedName = fighterName.replace(' ', '-').toLowerCase();
  const url = `https://www.ufc.com/athlete/${formattedName}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let name = $('.hero-profile__name').text().trim();
    let nickname = $('.hero-profile__nickname').text().trim();
    let status = $('.c-bio__label:contains("Status")').next('.c-bio__text').text().trim();
    let age = $('.c-bio__label:contains("Age")').next('.c-bio__text').find('.field__item').text().trim();
    let height = $('.c-bio__label:contains("Height")').next('.c-bio__text').text().trim();
    let weight = $('.c-bio__label:contains("Weight")').next('.c-bio__text').text().trim();

    let armReach = $('.c-bio__label:contains("Reach")').next('.c-bio__text').text().trim();
    let legReach = $('.c-bio__label:contains("Leg reach")').next('.c-bio__text').text().trim();
    let fightingStyle = $('.c-bio__label:contains("Fighting style")').next('.c-bio__text').text().trim();
    let division = $('.hero-profile__division-title').text().trim();

    let placeOfBirth = $('.c-bio__label:contains("Place of Birth")').next('.c-bio__text').text().trim();
    let trainingCamp = $('.c-bio__label:contains("Trains at")').next('.c-bio__text').text().trim();
    let octagonDebut = $('.c-bio__label:contains("Octagon Debut")').next('.c-bio__text').text().trim();
    let imageURL = $('.hero-profile__image').attr('src');

    return {
      Name: name,
      Nickname: nickname,
      Status: status,
      Age: age,
      Height: height,
      Weight: weight,
      ArmReach: armReach,
      LegReach: legReach,
      FightingStyle: fightingStyle,
      Division: division,
      PlaceOfBirth: placeOfBirth,
      TrainingCamp: trainingCamp,
      OctagonDebut: octagonDebut,
      ImageURL: imageURL
    };
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
}

interface FighterStats {
  Record: string;
  WinByMethod: { KO: string, Decision: string, Submission: string };
  AvgFightTime: string;
  SigStrikeByPosition: {Standing: string, Clinch: string, Ground: string};
  SigStrikeByTarget: {Head: string, Body: string, Leg: string};
  StrikingAccuracy: {SigStrikesLanded: string, SigStrikesAttempted: string};
  TakedownAccuracy: {TakedownsLanded: string, TakedownsAttempted: string};
}

export async function getFighterStats(fighterName: string = 'max holloway'): Promise<FighterStats| null> {
  const formattedName = fighterName.replace(' ', '-').toLowerCase();
  const url = `https://www.ufc.com/athlete/${formattedName}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let record = $('.hero-profile__division-body').text().trim();

    let ko = $('.c-stat-3bar__label:contains("KO/TKO")').next('.c-stat-3bar__value').text().trim();
    let dec = $('.c-stat-3bar__label:contains("DEC")').next('.c-stat-3bar__value').text().trim();
    let sub = $('.c-stat-3bar__label:contains("SUB")').next('.c-stat-3bar__value').text().trim();
    let winByMethod = {KO: ko, Decision: dec, Submission: sub};

    let standing = $('.c-stat-3bar__label:contains("Standing")').next('.c-stat-3bar__value').text().trim();
    let clinch = $('.c-stat-3bar__label:contains("Clinch")').next('.c-stat-3bar__value').text().trim();
    let ground = $('.c-stat-3bar__label:contains("Ground")').next('.c-stat-3bar__value').text().trim();
    let sigStrikeByPosition = {Standing: standing, Clinch: clinch, Ground: ground};

    let headSigStrikes = $('#e-stat-body_x5F__x5F_head_value').text().trim();
    let bodySigStrikes = $('#e-stat-body_x5F__x5F_body_value').text().trim();
    let legSigStrikes = $('#e-stat-body_x5F__x5F_leg_value').text().trim();
    let sigStrikeByTarget = {Head: headSigStrikes, Body: bodySigStrikes, Leg: legSigStrikes};

    let avgFightTime = $('.c-stat-compare__label:contains("Average fight time")').prev('.c-stat-compare__number').text().trim();
    let sigStrikesLanded = $('.c-overlap__stats-text:contains("Sig. Strikes Landed")').next('.c-overlap__stats-value').text().trim();
    let sigStrikesAttempted = $('.c-overlap__stats-text:contains("Sig. Strikes Attempted")').next('.c-overlap__stats-value').text().trim();
    let strikingAccuracy = {SigStrikesLanded: sigStrikesLanded, SigStrikesAttempted: sigStrikesAttempted};

    let takedownsLanded = $('.c-overlap__stats-text:contains("Takedowns Landed")').next('.c-overlap__stats-value').text().trim();
    let takedownsAttempted = $('.c-overlap__stats-text:contains("Takedowns Attempted")').next('.c-overlap__stats-value').text().trim();
    let takeDownAccuracy = {TakedownsLanded: takedownsLanded, TakedownsAttempted: takedownsAttempted};

    return {
      Record: record,
      WinByMethod: winByMethod,
      AvgFightTime: avgFightTime,
      SigStrikeByPosition: sigStrikeByPosition,
      SigStrikeByTarget: sigStrikeByTarget,
      StrikingAccuracy: strikingAccuracy,
      TakedownAccuracy: takeDownAccuracy,
    };
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
}

interface Rankings {
  [Division: string]: { [Rank: number]: string };
}

export async function getRankings(): Promise<Rankings | null> {
  const url = 'https://www.ufc.com/rankings';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let rankingsDict: Rankings = {};

    $('.view-grouping').each((i, element) => {
      let header = $(element).find('.view-grouping-header').text().trim();
      let rankings: { [Rank: number]: string } = {};

      $(element).find('tbody tr').each((j, row) => {
        let rank = parseInt($(row).find('.views-field-weight-class-rank').text().trim(), 10);
        let fighter = $(row).find('.views-field-title a').text().trim();
        rankings[rank] = fighter;
      });

      rankingsDict[header] = rankings;
    });

    return rankingsDict;
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
}

interface Titleholders {
  [Division: string]: {
    Weight: string;
    ChampName: string;
    ChampNickname: string;
    ChampRecord: string;
    ChampLastFight: string;
  };
}

export async function getTitleholders(): Promise<Titleholders | null> {
  const url = 'https://www.ufc.com/athletes';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let titleholdersDict: Titleholders = {};

    $('.l-listing__item').each((i, element) => {
      let division = $(element).find('.ath-wlcass strong').text().trim();
      let weight = $(element).find('.ath-weight').text().trim();
      let champName = $(element).find('.ath-n__name a span').text().trim();
      let champNickname = $(element).find('.ath-nn__nickname .field__item').text().trim();
      let champRecord = $(element).find('.c-ath--record').text().trim();
      let champLastFight = $(element).find('.view-fighter-last-fight .view-content .views-row').first().text().trim();

      if (division) {
        titleholdersDict[division] = {
          Weight: weight,
          ChampName: champName,
          ChampNickname: champNickname,
          ChampRecord: champRecord,
          ChampLastFight: champLastFight,
        };
      }
    });

    return titleholdersDict;
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
}

interface Records {
  [Category: string]: {
    [Rank: number]: {
      Fighter: string;
      Statistic: string;
    }
  };
}

export async function getRecords(): Promise<Records | null> {
  const url = 'http://statleaders.ufc.com/en/career';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let recordsDict: Records = {};

    $('.results-group').each((i, element) => {
      let category = $(element).find('header h3').text().trim();
      recordsDict[category] = {};

      $(element).find('.results-table--tr:not(.results-table--th)').each((index, row) => {
        let rank = index + 1;
        let fighter = $(row).find('span').eq(1).text().trim();
        let total = $(row).find('span').eq(2).text().trim();

        if (rank && fighter && total) {
          recordsDict[category][rank] = { Fighter: fighter, Statistic: total };
        }
      });
    });

    return recordsDict;
  } catch (error) {
    console.error(`Error scraping UFC.com: ${error}`);
    return null;
  }
}