import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  filters: {
    [key: string]: boolean;
  };
}

const initialFilters = ["Food & Drinks", "Shops", "Services"];
const initialState: FiltersState = {
  filters: initialFilters.reduce((acc, filter) => {
    acc[filter] = true;  // Set all filters to true by default
    return acc;
  }, {} as { [key: string]: boolean }),
};

export const mapFilteringSlice = createSlice({
  name: 'mapFiltering',
  initialState,
  reducers: {
    setFiltering: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      if (filter === "All") {
        const areAllTrue = Object.values(state.filters).every(value => value);
        Object.keys(state.filters).forEach(key => {
          state.filters[key] = !areAllTrue;  // If all are true, uncheck all, otherwise check all
        });
      } else {
        state.filters[filter] = !state.filters[filter];

        // Check if "All" should be selected or not
        const areAllSelected = Object.values(state.filters).every(value => value);
        if (areAllSelected) {
          state.filters["All"] = true;
        } else {
          state.filters["All"] = false;
        }
      }
    },
  },
});

export const { setFiltering } = mapFilteringSlice.actions;
export default mapFilteringSlice.reducer;
