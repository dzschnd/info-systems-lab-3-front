import { formatDateArrayToInputValue, formatMillisecondsTimestampToInputValue, formatUnixTimestampToInputValue } from "../utils/DataFormatter";
import {useMemo, useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
const WorkersTable = ({workers, currentUser, setRecord, setIsCreateModalOpen, setIsUpdateModalOpen, setIsDeleteModalOpen}) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'actions',
                header: '',
                cell: ({ row }) => (
                    (currentUser && (currentUser.role === 'ADMIN' || currentUser.id === row.original.author.id)) && (
                        <div className={'flex space-x-2'}>
                            <button
                                onClick={() => {
                                    setRecord(row.original);
                                    setIsUpdateModalOpen(true);
                                }}
                                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setRecord(row.original);
                                    setIsDeleteModalOpen(true);
                                }}
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    )
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'author.id',
                header: 'Author ID',
                cell: ({ row }) => row.original.author?.id ?? 'N/A',
            },
            {
                accessorKey: 'author.username',
                header: 'Author Name',
                cell: ({ row }) => row.original.author?.username ?? 'N/A',
            },
            {
                accessorKey: 'id',
                header: 'Worker ID',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'name',
                header: 'Name',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'coordinates.x',
                header: 'X Coordinate',
                cell: ({ row }) => row.original.coordinates?.x ?? 'N/A',
            },
            {
                accessorKey: 'coordinates.y',
                header: 'Y Coordinate',
                cell: ({ row }) => row.original.coordinates?.y ?? 'N/A',
            },
            {
                accessorKey: 'creationDate',
                header: 'Creation Date',
                cell: ({ getValue }) => formatDateArrayToInputValue(getValue() ?? 'N/A'),
            },
            {
                accessorKey: 'salary',
                header: 'Salary',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'rating',
                header: 'Rating',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'startDate',
                header: 'Start Date',
                cell: ({ getValue }) => formatUnixTimestampToInputValue(getValue() ?? 'N/A'),
            },
            {
                accessorKey: 'endDate',
                header: 'End Date',
                cell: ({ getValue }) => formatDateArrayToInputValue(getValue() ?? 'N/A'),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'organization.annualTurnover',
                header: 'Org. Annual Turnover',
                cell: ({ row }) => row.original.organization?.annualTurnover ?? 'N/A',
            },
            {
                accessorKey: 'organization.employeesCount',
                header: 'Org. Employees Count',
                cell: ({ row }) => row.original.organization?.employeesCount ?? 'N/A',
            },
            {
                accessorKey: 'organization.fullName',
                header: 'Org. Full Name',
                cell: ({ row }) => row.original.organization?.fullName ?? 'N/A',
            },
            {
                accessorKey: 'organization.type',
                header: 'Org. Type',
                cell: ({ row }) => row.original.organization?.type ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.street',
                header: 'Org. Street',
                cell: ({ row }) => row.original.organization?.officialAddress?.street ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.zipCode',
                header: 'Org. Zip',
                cell: ({ row }) => row.original.organization?.officialAddress?.zipCode ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.town.x',
                header: 'Org. Town X',
                cell: ({ row }) => row.original.organization?.officialAddress?.town?.x ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.town.y',
                header: 'Org. Town Y',
                cell: ({ row }) => row.original.organization?.officialAddress?.town?.y ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.town.z',
                header: 'Org. Town Z',
                cell: ({ row }) => row.original.organization?.officialAddress?.town?.z ?? 'N/A',
            },
            {
                accessorKey: 'organization.officialAddress.town.name',
                header: 'Org. Town Name',
                cell: ({ row }) => row.original.organization?.officialAddress?.town?.name ?? 'N/A',
            },
            {
                accessorKey: 'person.eyeColor',
                header: 'Eye Color',
                cell: ({ row }) => row.original.person?.eyeColor ?? 'N/A',
            },
            {
                accessorKey: 'person.hairColor',
                header: 'Hair Color',
                cell: ({ row }) => row.original.person?.hairColor ?? 'N/A',
            },
            {
                accessorKey: 'person.location.x',
                header: 'Location X',
                cell: ({ row }) => row.original.person?.location?.x ?? 'N/A',
            },
            {
                accessorKey: 'person.location.y',
                header: 'Location Y',
                cell: ({ row }) => row.original.person?.location?.y ?? 'N/A',
            },
            {
                accessorKey: 'person.location.z',
                header: 'Location Z',
                cell: ({ row }) => row.original.person?.location?.z ?? 'N/A',
            },
            {
                accessorKey: 'person.location.name',
                header: 'Location Name',
                cell: ({ row }) => row.original.person?.location?.name ?? 'N/A',
            },
            {
                accessorKey: 'person.birthday',
                header: 'Birthday',
                cell: ({ getValue }) => formatMillisecondsTimestampToInputValue(getValue() ?? 'N/A'),
            },
            {
                accessorKey: 'person.height',
                header: 'Height',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
            {
                accessorKey: 'person.passportID',
                header: 'Passport ID',
                cell: ({ getValue }) => getValue() ?? 'N/A',
            },
        ],
        [currentUser, setRecord, setIsUpdateModalOpen, setIsDeleteModalOpen]
    );


    const [filterAuthorId, setFilterAuthorId] = useState('');
    const [filterAuthorName, setFilterAuthorName] = useState('');
    const [filterId, setFilterId] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterXCoordinate, setFilterXCoordinate] = useState('');
    const [filterYCoordinate, setFilterYCoordinate] = useState('');
    const [filterCreationDate, setFilterCreationDate] = useState('');
    const [filterSalary, setFilterSalary] = useState('');
    const [filterRating, setFilterRating] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterAnnualTurnover, setFilterAnnualTurnover] = useState('');
    const [filterEmployeesCount, setFilterEmployeesCount] = useState('');
    const [filterFullName, setFilterFullName] = useState('');
    const [filterOrgType, setFilterOrgType] = useState('');
    const [filterStreet, setFilterStreet] = useState('');
    const [filterZip, setFilterZip] = useState('');
    const [filterTownX, setFilterTownX] = useState('');
    const [filterTownY, setFilterTownY] = useState('');
    const [filterTownZ, setFilterTownZ] = useState('');
    const [filterTownName, setFilterTownName] = useState('');
    const [filterEyeColor, setFilterEyeColor] = useState('');
    const [filterHairColor, setFilterHairColor] = useState('');
    const [filterLocationX, setFilterLocationX] = useState('');
    const [filterLocationY, setFilterLocationY] = useState('');
    const [filterLocationZ, setFilterLocationZ] = useState('');
    const [filterLocationName, setFilterLocationName] = useState('');
    const [filterBirthday, setFilterBirthday] = useState('');
    const [filterHeight, setFilterHeight] = useState('');
    const [filterPassportID, setFilterPassportID] = useState('');

    const filteredData = useMemo(() => {
        return workers.filter((worker) => {
            return (
                (filterAuthorId === '' || worker.author.id.toString().includes(filterAuthorId)) &&
                (filterAuthorName === '' || worker.author.username.toString().includes(filterAuthorName)) &&
                (filterId === '' || worker.id.toString().includes(filterId)) &&
                (filterName === '' || worker.name.toLowerCase().includes(filterName.toLowerCase())) &&
                (filterXCoordinate === '' || worker.coordinates.x.toString().includes(filterXCoordinate)) &&
                (filterYCoordinate === '' || worker.coordinates.y.toString().includes(filterYCoordinate)) &&
                (filterCreationDate === '' || formatDateArrayToInputValue(worker.creationDate).includes(filterCreationDate)) &&
                (filterSalary === '' || worker.salary.toString().includes(filterSalary)) &&
                (filterRating === '' || worker.rating.toString().includes(filterRating)) &&
                (filterStartDate === '' || formatUnixTimestampToInputValue(worker.startDate).includes(filterStartDate)) &&
                (filterEndDate === '' || formatDateArrayToInputValue(worker.endDate).includes(filterEndDate)) &&
                (filterStatus === '' || worker.status.toLowerCase().includes(filterStatus.toLowerCase())) &&
                (filterAnnualTurnover === '' || worker.organization.annualTurnover.toString().includes(filterAnnualTurnover)) &&
                (filterEmployeesCount === '' || worker.organization.employeesCount.toString().includes(filterEmployeesCount)) &&
                (filterFullName === '' || worker.organization.fullName.toLowerCase().includes(filterFullName.toLowerCase())) &&
                (filterOrgType === '' || worker.organization.type.toLowerCase().includes(filterOrgType.toLowerCase())) &&
                (filterStreet === '' || worker.organization.officialAddress.street.toLowerCase().includes(filterStreet.toLowerCase())) &&
                (filterZip === '' || worker.organization.officialAddress.zipCode.toString().includes(filterZip)) &&
                (filterTownX === '' || worker.organization.officialAddress.town.x.toString().includes(filterTownX)) &&
                (filterTownY === '' || worker.organization.officialAddress.town.y.toString().includes(filterTownY)) &&
                (filterTownZ === '' || worker.organization.officialAddress.town.z.toString().includes(filterTownZ)) &&
                (filterTownName === '' || worker.organization.officialAddress.town.name.toLowerCase().includes(filterTownName.toLowerCase())) &&
                (filterEyeColor === '' || worker.person.eyeColor.toLowerCase().includes(filterEyeColor.toLowerCase())) &&
                (filterHairColor === '' || worker.person.hairColor.toLowerCase().includes(filterHairColor.toLowerCase())) &&
                (filterLocationX === '' || worker.person.location.x.toString().includes(filterLocationX)) &&
                (filterLocationY === '' || worker.person.location.y.toString().includes(filterLocationY)) &&
                (filterLocationZ === '' || worker.person.location.z.toString().includes(filterLocationZ)) &&
                (filterLocationName === '' || worker.person.location.name.toLowerCase().includes(filterLocationName.toLowerCase())) &&
                (filterBirthday === '' || formatMillisecondsTimestampToInputValue(worker.person.birthday).includes(filterBirthday)) &&
                (filterHeight === '' || worker.person.height.toString().includes(filterHeight)) &&
                (filterPassportID === '' || worker.person.passportID.toLowerCase().includes(filterPassportID.toLowerCase()))
            );
        });
    }, [
        workers,
        filterAuthorId,
        filterAuthorName,
        filterId,
        filterName,
        filterXCoordinate,
        filterYCoordinate,
        filterCreationDate,
        filterSalary,
        filterRating,
        filterStartDate,
        filterEndDate,
        filterStatus,
        filterAnnualTurnover,
        filterEmployeesCount,
        filterFullName,
        filterOrgType,
        filterStreet,
        filterZip,
        filterTownX,
        filterTownY,
        filterTownZ,
        filterTownName,
        filterEyeColor,
        filterHairColor,
        filterLocationX,
        filterLocationY,
        filterLocationZ,
        filterLocationName,
        filterBirthday,
        filterHeight,
        filterPassportID
    ]);

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
    });

    return (
        <>
            {currentUser && (
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-green-500 text-white py-2 px-4 mb-4 rounded hover:bg-green-600 transition duration-300"
                >
                    Create Worker
                </button>
            )}
            <div className="overflow-x-auto overflow-y-auto">
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
                                    <div className={''}>
                                        <div className={'flex'}>
                                            {header.column.columnDef.header === 'Author ID' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterAuthorId}
                                                    onChange={(e) => setFilterAuthorId(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Author Name' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterAuthorName}
                                                    onChange={(e) => setFilterAuthorName(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Worker ID' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterId}
                                                    onChange={(e) => setFilterId(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Name' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterName}
                                                    onChange={(e) => setFilterName(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'X Coordinate' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterXCoordinate}
                                                    onChange={(e) => setFilterXCoordinate(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Y Coordinate' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterYCoordinate}
                                                    onChange={(e) => setFilterYCoordinate(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Creation Date' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterCreationDate}
                                                    onChange={(e) => setFilterCreationDate(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Salary' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterSalary}
                                                    onChange={(e) => setFilterSalary(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Rating' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterRating}
                                                    onChange={(e) => setFilterRating(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Start Date' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterStartDate}
                                                    onChange={(e) => setFilterStartDate(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'End Date' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterEndDate}
                                                    onChange={(e) => setFilterEndDate(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Status' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterStatus}
                                                    onChange={(e) => setFilterStatus(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Annual Turnover' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterAnnualTurnover}
                                                    onChange={(e) => setFilterAnnualTurnover(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Employees Count' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterEmployeesCount}
                                                    onChange={(e) => setFilterEmployeesCount(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Full Name' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterFullName}
                                                    onChange={(e) => setFilterFullName(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Type' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterOrgType}
                                                    onChange={(e) => setFilterOrgType(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Street' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterStreet}
                                                    onChange={(e) => setFilterStreet(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Zip' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterZip}
                                                    onChange={(e) => setFilterZip(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Town X' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterTownX}
                                                    onChange={(e) => setFilterTownX(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Town Y' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterTownY}
                                                    onChange={(e) => setFilterTownY(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Town Z' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterTownZ}
                                                    onChange={(e) => setFilterTownZ(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Org. Town Name' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterTownName}
                                                    onChange={(e) => setFilterTownName(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Eye Color' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterEyeColor}
                                                    onChange={(e) => setFilterEyeColor(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Hair Color' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterHairColor}
                                                    onChange={(e) => setFilterHairColor(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Location X' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterLocationX}
                                                    onChange={(e) => setFilterLocationX(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Location Y' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterLocationY}
                                                    onChange={(e) => setFilterLocationY(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Location Z' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterLocationZ}
                                                    onChange={(e) => setFilterLocationZ(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Location Name' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterLocationName}
                                                    onChange={(e) => setFilterLocationName(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Birthday' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterBirthday}
                                                    onChange={(e) => setFilterBirthday(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Height' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterHeight}
                                                    onChange={(e) => setFilterHeight(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header === 'Passport ID' && (
                                                <input
                                                    className="border border-gray-300 px-2 py-1 my-1 rounded"
                                                    type="text"
                                                    value={filterPassportID}
                                                    onChange={(e) => setFilterPassportID(e.target.value)}
                                                />
                                            )}

                                            {header.column.columnDef.header !== '' && (
                                                <button
                                                    className="border border-gray-300 px-3 py-2 bg-gray-200 rounded ml-2"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    Sort
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
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
    )
}

export default WorkersTable;