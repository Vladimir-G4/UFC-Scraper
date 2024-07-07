# UFC Scraper
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/UFC_Logo.png" width="250"/>
https://www.npmjs.com/package/ufc-scraper

## Overview

The `ufc-scraper` package provides a set of functions to scrape UFC fighter information, statistics, and rankings from the UFC website. It uses `axios` for making HTTP requests and `cheerio` for parsing HTML content. This package enables you to programmatically retrieve detailed UFC fighter data, including fighter information, statistics, records, and official rankings.

## Installation

To install the package, use npm:

```bash
npm install ufc-scraper
```

## Usage

Below are the primary functions provided by the `ufc-scraper` package and how to use them.

### `getFighter`

Retrieves both fighter information and statistics.

```typescript
import { getFighter } from 'ufc-scraper';

getFighter('max holloway').then(fighter => {
  if (fighter) {
    console.log(fighter);
  } else {
    console.log('Failed to retrieve fighter data.');
  }
});
```

### `getFighterInfo`

Retrieves basic information about a fighter.

```typescript
import { getFighterInfo } from 'ufc-scraper';

getFighterInfo('max holloway').then(info => {
  if (info) {
    console.log(info);
  } else {
    console.log('Failed to retrieve fighter information.');
  }
});
```

### `getFighterStats`

Retrieves statistics about a fighter.

```typescript
import { getFighterStats } from 'ufc-scraper';

getFighterStats('max holloway').then(stats => {
  if (stats) {
    console.log(stats);
  } else {
    console.log('Failed to retrieve fighter statistics.');
  }
});
```

### `getRankings`

Retrieves UFC rankings.

```typescript
import { getRankings } from 'ufc-scraper';

getRankings().then(rankings => {
  if (rankings) {
    console.log(rankings);
  } else {
    console.log('Failed to retrieve rankings.');
  }
});
```

### `getTitleholders`

Retrieves the current UFC titleholders, categorized by division.

```typescript
import { getTitleholders } from 'ufc-scraper';

getTitleholders().then(titleholders => {
  if (titleholders) {
    console.log(titleholders);
  } else {
    console.log('Failed to retrieve titleholders.');
  }
});
```

### `getRecords`

Retrieves UFC career records and statistics across various categories.

```typescript
import { getRecords } from 'ufc-scraper';

getRecords().then(records => {
  if (records) {
    console.log(records);
  } else {
    console.log('Failed to retrieve records.');
  }
});
```

## Functions

### `getFighter(fighterName: string): Promise<Fighter | null>`

Retrieves both fighter information and statistics for the given fighter name.

### `getFighterInfo(fighterName: string): Promise<FighterInfo | null>`

Retrieves basic information about the fighter, including name, nickname, status, age, height, weight, reach, fighting style, division, place of birth, training camp, octagon debut, and image URL.

### `getFighterStats(fighterName: string): Promise<FighterStats | null>`

Retrieves detailed statistics about the fighter, including their record, win methods, average fight time, significant strikes by position and target, striking accuracy, and takedown accuracy.

### `getRankings(): Promise<Rankings | null>`

Retrieves the current UFC rankings, categorized by weight class.

### `getTitleholders(): Promise<Titleholders | null>`
Retrieves the current UFC titleholders, categorized by division.

### `getRecords(): Promise<Records | null>`
Retrieves UFC career records and statistics across various categories.

## Interfaces

### `Fighter`

```typescript
interface Fighter {
  FighterInfo: FighterInfo | null;
  FighterStats: FighterStats | null;
}
```

### `FighterInfo`

```typescript
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
```

### `FighterStats`

```typescript
interface FighterStats {
  Record: string;
  WinByMethod: {
    KO: string;
    Decision: string;
    Submission: string;
  };
  AvgFightTime: string;
  SigStrikeByPosition: {
    Standing: string;
    Clinch: string;
    Ground: string;
  };
  SigStrikeByTarget: {
    Head: string;
    Body: string;
    Leg: string;
  };
  StrikingAccuracy: {
    SigStrikesLanded: string;
    SigStrikesAttempted: string;
  };
  TakedownAccuracy: {
    TakedownsLanded: string;
    TakedownsAttempted: string;
  };
}
```

### `Rankings`

```typescript
interface Rankings {
  [Division: string]: {
    [rank: number]: string;
  };
}
```

### `Titleholders`

```typescript
interface Titleholders {
  [Division: string]: {
    Weight: string;
    ChampName: string;
    ChampNickname: string;
    ChampRecord: string;
    ChampLastFight: string;
  };
}
```

### 'Records'

```typescript
interface Records {
  [Category: string]: {
    [Rank: number]: {
      Fighter: string;
      Statistic: string;
    }
  };
}
```

## Error Handling

Each function logs errors to the console and returns `null` in case of any issues encountered during the scraping process. Make sure to handle `null` values appropriately in your application to avoid unexpected crashes.

## Example

Here is a complete example of using the `ufc-scraper` package to retrieve and display information about a specific UFC fighter:

```typescript
import { getFighter, getRankings, getTitleholders, getRecords } from 'ufc-scraper';

getFighter('max holloway').then((fighter) => {
    console.log(fighter);
});

/* Returns the following:
{
  FighterInfo: {
    Name: 'Max Holloway',
    Nickname: '"Blessed"',
    Status: 'Active',
    Age: '32',
    Height: '71.00',
    Weight: '156.00',
    ArmReach: '69.00',
    LegReach: '42.00',
    FightingStyle: 'Muay Thai',
    Division: 'Lightweight Division',
    PlaceOfBirth: 'Waianae, United States',
    TrainingCamp: 'Hawaii Elite MMA - Hawaii',
    OctagonDebut: 'Feb. 4, 2012',
    ImageURL: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/HOLLOWAY_MAX_L_04-13.png?itok=U9IB8OUQ'
  },
  FighterStats: {
    Record: '26-7-0 (W-L-D)',
    WinByMethod: { KO: '12 (48%)', Decision: '11 (44%)', Submission: '2 (8%)' },
    AvgFightTime: '16:15',
    SigStrikeByPosition: { Standing: '2961 (88%)', Clinch: '245 (7%)', Ground: '172 (5%)' },
    SigStrikeByTarget: { Head: '2213', Body: '816', Leg: '349' },
    StrikingAccuracy: { SigStrikesLanded: '3378', SigStrikesAttempted: '7023' },
    TakedownAccuracy: { TakedownsLanded: '4', TakedownsAttempted: '15' }
  }
}
*/

getRankings().then((rankings) => {
    console.log(rankings);
});

/* Returns the following: 
{
  "Men's Pound-for-Pound Top Rank": {
    '1': 'Islam Makhachev',
    '2': 'Jon Jones',
    '3': 'Leon Edwards',
    '4': 'Alex Pereira',
    '5': 'Ilia Topuria',
    '6': "Sean O'Malley",
    '7': 'Alexander Volkanovski',
    '8': 'Max Holloway',
    '9': 'Dricus Du Plessis',
    '10': 'Alexandre Pantoja',
    '11': 'Israel Adesanya',
    '12': 'Tom Aspinall',
    '13': 'Charles Oliveira',
    '14': 'Sean Strickland',
    '15': 'Aljamain Sterling'
  },
  etc...
}
*/

getTitleholders().then((titleholders) => {
    console.log(titleholders);
});

/* Returns the following: 
{
  Flyweight: {
    Weight: '125 lb (56.82 kg)',
    ChampName: 'Alexandre Pantoja',
    ChampNickname: '"The Cannibal"',
    ChampRecord: '28-5-0 (W-L-D)',
    ChampLastFight: 'Alexandre Pantoja vs Steve Erceg'
  },
  etc...
}
*/

getRecords().then((records) => {
    console.log(records);
});

/* Returns the following: 
{
  'Total Fights': {
    '1': { Fighter: 'Jim Miller', Statistic: '44' },
    '2': { Fighter: 'Andrei Arlovski', Statistic: '41' },
    '3': { Fighter: 'Donald Cerrone', Statistic: '38' },
    '4': { Fighter: 'Clay Guida', Statistic: '36' },
    '5': { Fighter: 'Rafael Dos Anjos', Statistic: '35' },
    '6': { Fighter: 'Jeremy Stephens', Statistic: '34' },
    '7': { Fighter: 'Demian Maia', Statistic: '33' },
    '8': { Fighter: 'Charles Oliveira', Statistic: '33' },
    '9': { Fighter: 'Diego Sanchez', Statistic: '32' },
    '10': { Fighter: 'Neil Magny', Statistic: '32' }
  },
  etc...
}
*/
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.
