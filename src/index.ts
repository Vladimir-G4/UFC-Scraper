import axios from 'axios';
import * as cheerio from 'cheerio';
import { FighterStats } from './interfaces/fighter_stats';
import { FighterInfo } from './interfaces/fighter_info';
import { Fighter } from './interfaces/fighter';

export async function getFighter(fighterName: string = 'max holloway'): Promise<Fighter | null> {
  try {
    return {
      FighterInfo: await getFighterInfo(fighterName),
      FighterStats: await getFighterStats(fighterName),
    }
  } catch (error) {
    console.error(`Error scraping UFC.com : ${error}`);
    return null;
  }
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
  [Division: string]: { [rank: number]: string };
}

export async function getRankings(): Promise<Rankings | null> {
  const url = 'https://www.ufc.com/rankings';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let rankingsDict: Rankings = {};

    $('.view-grouping').each((i, element) => {
      let header = $(element).find('.view-grouping-header').text().trim();
      let rankings: { [rank: number]: string } = {};

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