import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMerchant from '../ts/IMerchant';

interface IFiltersState {
  filters: {
    [key: string]: boolean;
  }
  selected: IMerchant | null
}

const initialFilters = ["Food & Drinks", "Shops", "Services"];
const initialState: IFiltersState = {
  filters: initialFilters.reduce((acc, filter) => {
    acc[filter] = true;  // Set all filters to true by default
    return acc;
  }, { "All": true } as { [key: string]: boolean }),  // Add "All" with default true
  selected: null
};

export const mapFilteringSlice = createSlice({
  name: 'mapFiltering',
  initialState,
  reducers: {
    setFiltering: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      if (filter === "All") {
        const areAllTrue = Object.keys(state.filters)
          .filter((key) => key !== "All")
          .every(key => state.filters[key]);
          
        Object.keys(state.filters).forEach(key => {
          if (key !== "All") {
            state.filters[key] = !areAllTrue;  // If all are true, uncheck all; otherwise, check all
          }
        });
        state.filters["All"] = !areAllTrue;  // Update "All" based on the toggle state

        // ✅ If user just turned ALL filters OFF -> close any open selected tile
        if (state.filters["All"] === false) {
          state.selected = null;
        }
      } else {
        // Toggle the individual filter
        state.filters[filter] = !state.filters[filter];

        // Update the "All" key based on whether all individual filters are true
        const areAllSelected = Object.keys(state.filters)
          .filter((key) => key !== "All")
          .every(key => state.filters[key]);
        state.filters["All"] = areAllSelected;

        // ✅ NEW: if user reached "all unselected" (all individual filters false), close selected tile
        const areAllUnselected = Object.keys(state.filters)
          .filter((key) => key !== "All")
          .every((key) => state.filters[key] === false);

        if (areAllUnselected) {
          state.selected = null;
        }
      }
    },
    setSelected: (state, action: PayloadAction<IMerchant|null>) => {
      state.selected = action.payload
    }
  },
});

export const { setFiltering, setSelected } = mapFilteringSlice.actions;
export default mapFilteringSlice.reducer;
