// /* eslint-disable no-undef */

// import { shallowMount } from '@vue/test-utils';
// // eslint-disable-next-line import/no-unresolved
// import Vuex from 'vuex';
// import BoardTile from '@/components/BoardTile.vue';

// describe('BoardTile.vue', () => {
//   beforeEach(() => {
//     const store = new Vuex.Store({
//       modules: {
//         auth: {
//           state: {},
//           getters: {
//             allTiles: jest.fn(),
//           },
//         },
//       },
//     });
//   });

//   it('renders props.xPos and props.yPos when passed', () => {
//     console.log('[LAUREN] enter test');

//     // const wrapper = shallow(App, { store, localVue })
//   	// wrapper.setComputed({tokenExpired: true})

//     console.log('[LAUREN] 0:');

//     const xPos = 0;
//     const yPos = 0;
//     console.log('[LAUREN] 1:');
//     const wrapper = shallowMount(BoardTile, {
//       props: { xPos, yPos },
//     });
//     console.log('[LAUREN] 2:');
//     console.log('[LAUREN] 3:', wrapper);
//     expect(wrapper.text()).toMatch('xPos');
//   });
// });
