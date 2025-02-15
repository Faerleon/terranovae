# Terranovae

A toolset for world creators in fantasy, sci-fi, cyberpunk and more.

## Installation
- run `npm i terranovae`

## Modules

### Calendarius
Create all sorts of unit systems from time to distance.
used for custom unit creation like custom calendars and distance systems.

```typescript
const generatedDefinition = createUnitDefinition(({ define, base }) => {
    base('millisecond');
    define('second', [['millisecond', 1000]]);
    define('minute', [['second', 60]]);
    define('hour', [['minute', 60]]);
    define('day', [['hour', 24]]);
});
```

## Changelog

### 0.1.0-alpha.1
- initial version, just containing a unit definition module for calendarius