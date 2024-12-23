import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

const FileImportHistoryTable = ({ fileImportHistory }) => {
    const columns = useMemo(() => [
        {
            accessorKey: 'user.username',
            header: 'Username',
        },
        {
            accessorKey: 'user.id',
            header: 'User ID',
        },
        {
            accessorKey: 'worker.id',
            header: 'Worker ID',
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ row }) => {
                const timestamp = row.original.createdAt;
                const readableDate = new Date(timestamp).toLocaleString();
                return readableDate;
            }
        },
        {
            accessorKey: 'actionType',
            header: 'Action Type',
        },
    ], []);

    const [filterUsername, setFilterUsername] = useState('');
    const [filterUserId, setFilterUserId] = useState('');
    const [filterWorkerId, setFilterWorkerId] = useState('');
    const [filterCreatedAt, setFilterCreatedAt] = useState('');
    const [filterActionType, setFilterActionType] = useState('');

    const filteredData = useMemo(() => {
        return fileImportHistory.filter((item) => {
            return (
                (filterUsername === '' || item.user.username.toLowerCase().includes(filterUsername.toLowerCase())) &&
                (filterUserId === '' || item.user.id.toString().includes(filterUserId)) &&
                (filterWorkerId === '' || item.worker.id.toString().includes(filterWorkerId)) &&
                (filterCreatedAt === '' || item.createdAt.includes(filterCreatedAt)) &&
                (filterActionType === '' || item.actionType.toLowerCase().includes(filterActionType.toLowerCase()))
            );
        });
    }, [fileImportHistory, filterUsername, filterUserId, filterWorkerId, filterCreatedAt, filterActionType]);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        pageCount: Math.ceil(filteredData.length / pagination.pageSize),
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });

    return (
        <>
            <div className="overflow-x-auto overflow-y-auto mb-4">
                <table className="min-w-full border border-gray-300">
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-200">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={`border-2 border-gray-300 px-4 py-2 cursor-pointer
                      ${header.column.getIsSorted() === 'asc' ? 'border-t-blue-500' : ''}
                      ${header.column.getIsSorted() === 'desc' ? 'border-b-blue-500' : ''}
                    `}
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            {header.column.columnDef.header === 'Username' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterUsername}
                                                    onChange={(e) => setFilterUsername(e.target.value)}
                                                />
                                            )}
                                            {header.column.columnDef.header === 'User ID' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterUserId}
                                                    onChange={(e) => setFilterUserId(e.target.value)}
                                                />
                                            )}
                                            {header.column.columnDef.header === 'Worker ID' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterWorkerId}
                                                    onChange={(e) => setFilterWorkerId(e.target.value)}
                                                />
                                            )}
                                            {header.column.columnDef.header === 'Created At' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterCreatedAt}
                                                    onChange={(e) => setFilterCreatedAt(e.target.value)}
                                                />
                                            )}
                                            {header.column.columnDef.header === 'Action Type' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterActionType}
                                                    onChange={(e) => setFilterActionType(e.target.value)}
                                                />
                                            )}
                                        </div>

                                        <button
                                            className="border border-gray-300 px-3 py-2 bg-gray-200 rounded ml-2"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            Sort
                                        </button>
                                    </div>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div>
                    <button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-2 bg-gray-200 rounded mr-2"
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-2 bg-gray-200 rounded"
                    >
                        {'<'}
                    </button>
                </div>

                <span className="mx-2">
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>

                <div>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-2 bg-gray-200 rounded"
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-2 bg-gray-200 rounded ml-2"
                    >
                        {'>>'}
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <label className="mr-2">Rows per page:</label>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="px-2 py-1 border border-gray-300 rounded"
                >
                    {[3, 5, 10].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default FileImportHistoryTable;
