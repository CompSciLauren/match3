# TODO

## Initial Planning

something like https://en.wikipedia.org/wiki/Bejeweled

8x8 grid composed of multi-value tiles - DONE

### Actions

* click on two adjacent tiles to swap
  * swap horizontal neighbors - DONE
  * swap vertical neighbors - DONE
  * can only swap if the result makes a match

### Goals

* make connecting lines (horizontal or vertical) of 3 or more matching tiles

### Mutations

* matches disappear
* tiles fall to fill gaps
* new tiles fill from the top to fill up the grid

### Lose Condition

* can make no further moves

### Moves Count

* count of how many swaps you've done

### Score

* score increases for
  * each match made
  * each match composed of more than 3 items

### Milestones

* board displays
* can swap tiles
* matches are detected
* matches are removed
* board falls into gaps
* board fills in top
* lose condition checked
* points
* bonus items?

## Additional Planning

* Themed
* P2W (lol)

## Just Finished / Next to Work On

* Just Finished: At start of game, find all horizontal and vertical matches.
* Next to Work On:
  * All tiles that are part of matches are highlighted on screen (some sort of obv css styling to differentiate them; thicker borders or something).
  * Only allow a swap if it results in a match
