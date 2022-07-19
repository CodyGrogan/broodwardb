import DataTable from 'react-data-table-component';
import { useMemo, useState, useEffect } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';


interface DataRow {
    title: string;
    director: string;
    year: string;
}

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

const data = [
    {
        director: 'A',
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        director: "Abc",
        title: 'Ghostbusters',
        year: '1984',
    },
]

interface FilterParams {
    filterText: string;
    onFilter: any;
    onClear: any;
}
const FilterComponent = ({ filterText, onFilter, onClear }: FilterParams) => (
    <div>
        <input className="form-control form-control-lg"
            type="text" 
            id="search"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
   
    </div>
);

function ExDataTable(){

    const [filterText, setFilterText] = useState('');
    
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
		item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
	);
	

    

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={(e: any) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			
			persistTableHead
        />
    );
};

export default ExDataTable;