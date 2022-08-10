import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTiles',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedTile',
    ]),
    setSelectedTile() {
      this.updateSelectedTile(this.tile);
    },
  },
};
