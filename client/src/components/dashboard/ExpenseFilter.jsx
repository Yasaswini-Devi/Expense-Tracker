import React from "react";

const ExpenseFilter = ({
  filters,
  setFilters,
  categories,
  showDropdown,
  setShowDropdown,
  clearFilters,
  appliedFilters,
  handleRemoveFilter,
}) => {
  return (
    <>
      <div className="d-flex justify-content-evenly">
        {/* Start Date */}
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="form-control"
          />
        </div>

        {/* End Date */}
        <div className="d-flex flex-column align-items-center">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="form-control"
          />
        </div>

        {/* Categories */}
        <div className="d-flex flex-column align-items-center position-relative">
          <label htmlFor="category">Categories</label>
          <div
            className="form-control"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {filters.category.length > 0 ? filters.category.join(", ") : "Select Categories"}
          </div>
          {showDropdown && (
            <div className="dropdown-menu show p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {categories.map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={cat}
                    id={`cat-${cat}`}
                    checked={filters.category.includes(cat)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newCategories = checked
                        ? [...filters.category, cat]
                        : filters.category.filter((c) => c !== cat);
                      setFilters({ ...filters, category: newCategories });
                    }}
                  />
                  <label className="form-check-label" htmlFor={`cat-${cat}`}>
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={clearFilters} className="btn primary-btn m-3">
          Clear Filters
        </button>
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="mt-3">
          <h5>Applied Filters:</h5>
          <div className="d-flex flex-wrap">
            {appliedFilters.map((filter, index) => (
              <span
                key={index}
                className="badge d-inline-flex align-items-center me-2 py-2 px-3"
              >
                <span className="text-white">
                  {filter.type === "category"
                    ? `Category: ${filter.value}`
                    : filter.type === "startDate"
                    ? `Start: ${filter.value}`
                    : `End: ${filter.value}`}
                </span>
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  aria-label="Close"
                  style={{ transform: "scale(0.7)" }}
                  onClick={() => handleRemoveFilter(filter)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseFilter;
