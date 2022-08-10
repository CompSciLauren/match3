import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'timeToSwap',
      'selectedTile',
      'allTiles',
      'individualTile',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedTile',
      'resetAfterSwap',
    ]),
    getRandomTileType(i1, i2) {
      const min = i1;
      const max = i2 + 1;
      return Math.floor(Math.random(min, max) * (max - min) + min);
    },
    getTileColor(tileType) {
      let color = null;

      switch (tileType) {
        case 1:
          color = 'red';
          break;
        case 2:
          color = 'orange';
          break;
        case 3:
          color = 'yellow';
          break;
        case 4:
          color = 'lightgreen';
          break;
        case 5:
          color = 'lightblue';
          break;
        case 6:
          color = 'violet';
          break;
        case 7:
          color = 'cyan';
          break;
        default:
          color = 'brown';
      }

      return color;
    },
    setSelectedTile() {
      this.updateSelectedTile(this.tile);
    },
  },
};
