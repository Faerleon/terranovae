# Terranovae

A toolset for world creators in fantasy, sci-fi, cyberpunk and more.

## Installation
- run `npm i terranovae`

## Modules

### Calendarius
Create all sorts of unit systems from time to distance.
Used for custom unit creation like custom calendars and distance systems.
Supports 

```typescript
const generatedDefinition = createUnitDefinition(
    ({ define, base, sequence }) => {
        base('millisecond');
        define('second', [['millisecond', 1000]]);
        define('minute', [['second', 60]]);
        define('hour', [['minute', 60]]);
        define('day', [['hour', 24]]);
        define('week', [['day', 7]]);
        define('month', (rawMonths: number) => {
            let totalDays: number = 0;
            let currentMonth = 1;
            let currentYear = 1;
            for (let i = 1; i <= rawMonths; i++) {
                totalDays += retrieveDaysOfMonth(currentMonth, currentYear);
                currentMonth++;
                if (currentMonth > 12) {
                    currentMonth = 1;
                    currentYear++;
                }
            }
            return [['day', totalDays]];
        });
        define('year', [['month', 12]]);

        sequence('time', '{hour}:{minute}:{second}');
        sequence('date', '{day}.{month}.{year}');
        sequence('year', '{year}');
    },
);

// contains the value as base value, in milliseconds in this case
const myTime = generatedDefinition.create('time', '11:32:42');
```

## Changelog

### 0.1.0-alpha.2
- added functionality to allow dynamic definitions
- added "sequence" function to allow creating custom templates

### 0.1.0-alpha.1
- initial version, just containing a unit definition module for calendarius