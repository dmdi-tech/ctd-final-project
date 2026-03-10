import styles from '../shared/Sort.module.css';

function Sort({ sortDirection, setSortDirection, sortField, setSortField, filter, setFilter }) {
    return (
        <>
            <div className={styles.sortOptions}>
                <label>Filter By
                    <select 
                        id="filterBy"
                        onChange={(event) => {
                            setFilter(event.target.value);
                        }}
                        value={filter}
                    >
                        <option value={"favorites"}>Favorites</option>
                        <option value={"all"}>All</option>
                    </select>
                </label>
                <label id="sortBy">Sort By
                    <select 
                        id="sortBy"
                        onChange={(event) => {
                            setSortField(event.target.value);
                        }}
                        value={sortField}
                    >
                        <option value={"title"}>Title</option>
                        <option value={"createdTime"}>Time added</option>
                    </select>
                </label>
                

                <label id="direction">Direction
                    <select 
                        id="direction"
                        onChange={(event) => {
                            setSortDirection(event.target.value);
                        }}
                        value={sortDirection}
                    >
                        <option value={"asc"}>Ascending</option>
                        <option value={"desc"}>Descending</option>
                    </select>
                </label>
            </div>
        </>
    );
}

export default Sort