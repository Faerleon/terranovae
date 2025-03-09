# Concepts

## Core Concepts

* The world map is separated into fragments using a voronoi diagram.
Using delaunay, the common borders are mapped as an undirected graph. 
* A randomly selected number of points are used as the first generation of populations. 
* Now, each round, the simulations runs sequentially for each population.
each region has his own regional graph to track the state of the population living there. 
* Civilisations can expand, split, form alliances and go to war with each other. 
* After a set amount of rounds, the simulation is done.
Usually, a round reflects a year of time.

## The region graph

The region graph is a directed graph, simulating how different factors influence each other.
The region graph provides and receives information form the population core dictionary.

### Producer-Node

A producer node is a node that produces a specific amount of a resource each turn. 

```
("population": { count: 100, produces: 1 }) 
```

### Influence-Edge

An influence edge takes a number from a node and passes it to another node

```
(Farming, count 10, produces 1) -[count, 0.2]-> (Population, count 100)
# farming count 10 -> [2] -> population count 102
```

### Threshold-Edge

A threshold edge is an edge that "fires", when a certain value is surpassed or stepped below.

```
(Hunger) --> (Unrest) -[above 1]-> (CivilWar)
```

### Event-Node

A node that communicates a specific event to the world.

```
(CivilWar)
```

Those nodes can change other nodes all around the world graph
