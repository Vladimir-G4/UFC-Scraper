# UFC Scraper
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/UFC_Logo.png" width="250"/>

## Overview

The `ufc-scraper` package provides a set of functions to scrape UFC fighter information, statistics, and rankings from the UFC website. It uses `axios` for making HTTP requests and `cheerio` for parsing HTML content. This package enables you to programmatically retrieve detailed UFC fighter data, including fight history, personal stats, and official rankings.

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

## Functions

### `getFighter(fighterName: string): Promise<Fighter | null>`

Retrieves both fighter information and statistics for the given fighter name.

### `getFighterInfo(fighterName: string): Promise<FighterInfo | null>`

Retrieves basic information about the fighter, including name, nickname, status, age, height, weight, reach, fighting style, division, place of birth, training camp, octagon debut, and image URL.

### `getFighterStats(fighterName: string): Promise<FighterStats | null>`

Retrieves detailed statistics about the fighter, including their record, win methods, average fight time, significant strikes by position and target, striking accuracy, and takedown accuracy.

### `getRankings(): Promise<RankingsDict | null>`

Retrieves the current UFC rankings, categorized by weight class.

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

## Error Handling

Each function logs errors to the console and returns `null` in case of any issues encountered during the scraping process. Make sure to handle `null` values appropriately in your application to avoid unexpected crashes.

## Example

Here is a complete example of using the `ufc-scraper` package to retrieve and display information about a specific UFC fighter:

```typescript
import { getFighter, getRankings } from 'ufc-scraper';

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
  Flyweight: {
    '1': 'Brandon Royval',
    '2': 'Brandon Moreno',
    '3': 'Amir Albazi',
    '4': 'Kai Kara-France',
    '5': 'Alex Perez',
    '6': 'Muhammad Mokaev',
    '7': 'Manel Kape',
    '8': 'Matheus Nicolau',
    '9': 'Steve Erceg',
    '10': 'Tim Elliott',
    '11': 'Matt Schnell',
    '12': 'Tagir Ulanbekov',
    '13': 'Tatsuro Taira',
    '14': 'Sumudaerji',
    '15': 'David Dvorak'
  },
  Bantamweight: {
    '1': 'Merab Dvalishvili',
    '2': 'Cory Sandhagen',
    '3': 'Petr Yan',
    '4': 'Marlon Vera',
    '5': 'Henry Cejudo',
    '6': 'Deiveson Figueiredo',
    '7': 'Song Yadong',
    '8': 'José Aldo',
    '9': 'Rob Font',
    '10': 'Umar Nurmagomedov',
    '11': 'Kyler Phillips',
    '12': 'Mario Bautista',
    '13': 'Dominick Cruz',
    '14': 'Jonathan Martinez',
    '15': 'Pedro Munhoz'
  },
  etc...
}
*/
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

