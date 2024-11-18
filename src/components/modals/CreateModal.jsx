import { useForm } from 'react-hook-form';
import { useState} from "react";
import {formatMillisecondsTimestampToInputValue} from "../../utils/DataFormatter";

const sampleDefaultValues = {
    "coordinates": {
        "x": "10",
        "y": "10"
    },
    "creationDate": "2024-10-23",
    "endDate": "2024-10-23",
    "name": "Вася",
    "organization": {
        "annualTurnover": "10",
        "employeesCount": "10",
        "fullName": "ООО \"Вася\"",
        "officialAddress": {
            "street": 'Улица',
            "zipCode": 'зип',
            "town": {
                "x": '10',
                "y": '10',
                "z": '10',
                "name": 'Чебоксары'
            }
        },
        "type": "PRIVATE_LIMITED_COMPANY"
    },
    "person": {
        "birthday": "2024-10-15",
        "eyeColor": "RED",
        "hairColor": "RED",
        "height": "120",
        "location": {
            "x": '10',
            "y": '10',
            "z": '10',
            "name": '10'
        },
        "passportID": "12345",
    },
    "rating": "10",
    "salary": "10",
    "startDate": "2024-10-23",
    "status": ""
}
const CreateModal = ({ onClose, onCreate, loading, currentUser, coordinates, organizations, persons }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            ...sampleDefaultValues
        }
    });
    const [selectedCoordinates, setSelectedCoordinates] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [isOrgNull, setIsOrgNull] = useState(false);
    const onSubmit = (data) => {
        const formattedRequest = {
            ...data,
            status: data.status === "" ? null : data.status,
            creationDate: new Date(data.creationDate).toISOString(),
            startDate: new Date(data.startDate).toISOString(),
            endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
            coordinates: {
                ...data.coordinates,
                id: selectedCoordinates ? selectedCoordinates : null
            },
            organization: isOrgNull ? null : ({
                ...data.organization,
                id: selectedOrg ? selectedOrg : null
            }),
            person: {
                ...data.person,
                id: selectedPerson ? selectedPerson : null,
                birthday: data.person.birthday ? new Date(data.person.birthday).toISOString() : null
            },
        };

        console.log(formattedRequest);
        onCreate(formattedRequest);
    };

    const handleCoordinatesSelect = (coord) => {
        if (coord) {
            setValue('coordinates.x', coord.x);
            setValue('coordinates.y', coord.y);
        } else {
            setValue('coordinates.x', '');
            setValue('coordinates.y', '');
        }
    };
    const handleOrgSelect = (org) => {
        if (org) {
            setValue('organization.fullName', org.fullName);
            setValue('organization.type', org.type);
            setValue('organization.annualTurnover', org.annualTurnover);
            setValue('organization.employeesCount', org.employeesCount);
            setValue('organization.officialAddress.street', org.officialAddress.street);
            setValue('organization.officialAddress.zipCode', org.officialAddress.zipCode);
            setValue('organization.officialAddress.town.x', org.officialAddress.town.x);
            setValue('organization.officialAddress.town.y', org.officialAddress.town.y);
            setValue('organization.officialAddress.town.z', org.officialAddress.town.z);
            setValue('organization.officialAddress.town.name', org.officialAddress.town.name);
        } else {
            setValue('organization.fullName', '');
            setValue('organization.type', '');
            setValue('organization.annualTurnover', '');
            setValue('organization.employeesCount', '');
            setValue('organization.officialAddress.street', '');
            setValue('organization.officialAddress.zipCode', '');
            setValue('organization.officialAddress.town.x', '');
            setValue('organization.officialAddress.town.y', '');
            setValue('organization.officialAddress.town.z', '');
            setValue('organization.officialAddress.town.name', '');
        }
    };
    const handlePersonsSelect = (person) => {
        if (person) {
            setValue('person.eyeColor', person.eyeColor);
            setValue('person.hairColor', person.hairColor);
            setValue('person.location.x', person.location.x);
            setValue('person.location.y', person.location.y);
            setValue('person.location.z', person.location.z);
            setValue('person.location.name', person.location.name);
            setValue('person.birthday', formatMillisecondsTimestampToInputValue(person.birthday));
            setValue('person.height', person.height);
            setValue('person.passportID', person.passportID);
        } else {
            setValue('person.eyeColor', '');
            setValue('person.hairColor', '');
            setValue('person.location.x', '');
            setValue('person.location.y', '');
            setValue('person.location.z', '');
            setValue('person.location.name', '');
            setValue('person.birthday', '');
            setValue('person.height', '');
            setValue('person.passportID', '');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-[90%]">
                <h2 className="text-lg font-bold underline mb-2">Add Record</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'grid grid-cols-6 gap-3 items-start justify-center'}>
                        <div>
                            <h3 className="font-bold mb-2">Worker</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register('name', {required: true, minLength: 1,
                                    onBlur: (e) => setValue('name', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                            />
                            {errors.name && <p className="text-red-500">Name is required and cannot be empty.</p>}

                            <input
                                type="number"
                                placeholder="Salary"
                                {...register('salary', {required: true, min: 0.01})}
                                className="border p-2 mb-2 w-full"
                            />
                            {errors.salary && <p className="text-red-500">Salary must be greater than 0.</p>}

                            <input
                                type="number"
                                placeholder="Rating"
                                {...register('rating', {required: true, min: 0.01})}
                                className="border p-2 mb-2 w-full"
                            />
                            {errors.rating && <p className="text-red-500">Rating must be greater than 0.</p>}

                            <label htmlFor="person.birthday" className="block mb-1 font-medium">Creation Date</label>
                            <input
                                type="date"
                                placeholder="Creation Date"
                                {...register('creationDate', {required: true})}
                                className="border p-2 mb-2 w-full"
                            />
                            {errors.creationDate && <p className="text-red-500">Creation Date is required.</p>}

                            <label htmlFor="person.birthday" className="block mb-1 font-medium">Start Date</label>
                            <input
                                type="date"
                                placeholder="Start Date"
                                {...register('startDate', {required: true})}
                                className="border p-2 mb-2 w-full"
                            />
                            {errors.startDate && <p className="text-red-500">Start Date is required.</p>}

                            <label htmlFor="person.birthday" className="block mb-1 font-medium">End Date</label>
                            <input
                                type="date"
                                placeholder="End Date"
                                {...register('endDate')}
                                className="border p-2 mb-2 w-full"
                            />

                            <select
                                {...register('status')}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                            >
                                <option value="" disabled>Select Status</option>
                                <option value="">None</option>
                                <option value="FIRED">Fired</option>
                                <option value="HIRED">Hired</option>
                                <option value="RECOMMENDED_FOR_PROMOTION">Recommended for Promotion</option>
                                <option value="PROBATION">Probation</option>
                            </select>
                        </div>
                        <div>
                        {/* Coordinates Section */}
                            <h3 className="font-bold mb-2">Coordinates</h3>
                            <select
                                value={selectedCoordinates}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const coord = selectedId === "" ? null
                                        : currentUser.role === 'ADMIN' ?
                                            coordinates.find(c => c.id === Number(selectedId))
                                            : coordinates.filter(c => c.author.id === currentUser.id).find(c => c.id === Number(selectedId));
                                    handleCoordinatesSelect(coord);
                                    setSelectedCoordinates(selectedId);
                                }}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                            >
                                <option value="" disabled>Select Coordinates ID</option>
                                <option value="">Empty</option>
                                {currentUser.role === 'ADMIN' ?
                                    coordinates.map(coord => (
                                        <option key={coord.id} value={coord.id}>{coord.id}</option>
                                    ))
                                    : coordinates.filter(coord => coord.author.id === currentUser.id).map(coord => (
                                        <option key={coord.id} value={coord.id}>{coord.id}</option>
                                    ))}
                            </select>
                            <input
                                type="number"
                                placeholder="X Coordinate"
                                {...register('coordinates.x', {required: true, max: 863})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedCoordinates !== ''}
                            />
                            {errors.coordinates?.x &&
                                <p className="text-red-500">X Coordinate must be less than or equal to 863.</p>}

                            <input
                                type="number"
                                placeholder="Y Coordinate"
                                {...register('coordinates.y', {required: true})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedCoordinates !== ''}
                            />
                        </div>

                        {/* Organization Section */}
                        <div>
                            <h3 className="font-bold mb-2">Organization</h3>
                            <input id="is-org-null" onChange={() => {
                                setIsOrgNull(!isOrgNull)
                            }} checked={isOrgNull} type="checkbox"/>
                            <label htmlFor={'is-org-null'} className={'ml-[5px]'}>
                                No organization
                            </label>
                            <select
                                value={selectedOrg}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const org = selectedId === "" ? null
                                        : currentUser.role === 'ADMIN' ?
                                            organizations.find(o => o.id === Number(selectedId))
                                            : organizations.filter(o => o.author.id === currentUser.id).find(o => o.id === Number(selectedId));
                                    handleOrgSelect(org);
                                    setSelectedOrg(selectedId);
                                }}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                                disabled={isOrgNull}
                            >
                                <option value="" disabled>Select Organization ID</option>
                                <option value="">Empty</option>
                                {currentUser.role === 'ADMIN' ?
                                    organizations.map(org => (
                                        <option key={org.id} value={org.id}>{org.id}</option>
                                    ))
                                    : organizations.filter(org => org.author.id === currentUser.id).map(org => (
                                        <option key={org.id} value={org.id}>{org.id}</option>
                                    ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Organization Full Name"
                                {...register('organization.fullName', {
                                    required: isOrgNull ? false : "Organization Full Name is required.",
                                    minLength: isOrgNull ? undefined : {
                                        value: 1,
                                        message: "Organization Full Name cannot be empty.",
                                    },
                                    validate: isOrgNull ? undefined : (value) => {
                                        console.log(organizations);
                                        const isUnique = !organizations.some(org => org.fullName === value) || selectedOrg !== '' || isOrgNull;
                                        return isUnique || "Organization Full Name already exists.";
                                    },
                                    onBlur: (e) => setValue('organization.fullName', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.fullName && (
                                <p className="text-red-500">{errors.organization.fullName.message}</p>
                            )}
                            <select
                                {...register('organization.type', {required: !isOrgNull})}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                                disabled={selectedOrg !== '' || isOrgNull}
                            >
                                <option value="" disabled>Select Organization Type</option>
                                <option value="GOVERNMENT">Government</option>
                                <option value="TRUST">Trust</option>
                                <option value="PRIVATE_LIMITED_COMPANY">Private limited company</option>
                            </select>
                            {errors.organization?.type &&
                                <p className="text-red-500">Organization Type is required.</p>}
                            <input
                                type="number"
                                placeholder="Annual Turnover"
                                {...register('organization.annualTurnover', {min: isOrgNull ? undefined : 0})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.annualTurnover &&
                                <p className="text-red-500">Annual Turnover must be greater than 0.</p>}

                            <input
                                type="number"
                                placeholder="Employees Count"
                                {...register('organization.employeesCount', {min: isOrgNull ? undefined : 0})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.employeesCount &&
                                <p className="text-red-500">Employees Count must be greater than 0.</p>}
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Org. Address</h3>
                            <input
                                type="text"
                                placeholder="Street"
                                {...register('organization.officialAddress.street', {required: !isOrgNull, minLength: isOrgNull ? undefined : 1,
                                    onBlur: (e) => setValue('organization.officialAddress.street', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.officialAddress?.street &&
                                <p className="text-red-500">Street is required and cannot be empty.</p>}

                            <input
                                type="text"
                                placeholder="Zip Code"
                                {...register('organization.officialAddress.zipCode', {
                                    onBlur: (e) => setValue('organization.officialAddress.zipCode', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />

                            {/* Town Coordinates */}
                            <input
                                type="number"
                                placeholder="Town X"
                                {...register('organization.officialAddress.town.x')}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />

                            <input
                                type="number"
                                placeholder="Town Y"
                                {...register('organization.officialAddress.town.y', {required: !isOrgNull})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.officialAddress?.town?.y &&
                                <p className="text-red-500">Town Y Coordinate is required.</p>}

                            <input
                                type="number"
                                placeholder="Town Z"
                                {...register('organization.officialAddress.town.z', {required: !isOrgNull})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.officialAddress?.town?.z &&
                                <p className="text-red-500">Town Z Coordinate is required.</p>}

                            <input
                                type="text"
                                placeholder="Town Name"
                                {...register('organization.officialAddress.town.name', {required: !isOrgNull, minLength: isOrgNull ? undefined : 1,
                                    onBlur: (e) => setValue('organization.officialAddress.town.name', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedOrg !== '' || isOrgNull}
                            />
                            {errors.organization?.officialAddress?.town?.name &&
                                <p className="text-red-500">Town Name is required and cannot be empty.</p>}
                        </div>

                        {/* Person Section */}
                        <div>
                            <h3 className="font-bold mb-2">Person</h3>
                            <select
                                value={selectedPerson}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const person = selectedId === "" ? null
                                        : currentUser.role === 'ADMIN' ?
                                            persons.find(p => p.id === Number(selectedId))
                                            : persons.filter(p => p.author.id === currentUser.id).find(p => p.id === Number(selectedId));
                                    handlePersonsSelect(person);
                                    setSelectedPerson(selectedId);
                                }}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                            >
                                <option value="" disabled>Select Person ID</option>
                                <option value="">Empty</option>
                                {currentUser.role === 'ADMIN' ?
                                    persons.map(person => (
                                        <option key={person.id} value={person.id}>{person.id}</option>
                                    ))
                                    : persons.filter(person => person.author.id === currentUser.id).map(person => (
                                        <option key={person.id} value={person.id}>{person.id}</option>
                                    ))}
                            </select>
                            <select
                                {...register('person.eyeColor', {required: true})}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                                disabled={selectedPerson !== ''}
                            >
                                <option value="" disabled>Select eye color</option>
                                <option value="GREEN">Green</option>
                                <option value="RED">Red</option>
                                <option value="YELLOW">Yellow</option>
                            </select>
                            {errors.person?.eyeColor && <p className="text-red-500">Eye Color is required.</p>}

                            <select
                                {...register('person.hairColor', {required: true})}
                                className="border p-2 mb-2 w-full disabled:bg-disabled-grey-400 disabled:border-disabled-grey-900"
                                disabled={selectedPerson !== ''}
                            >
                                <option value="" disabled>Select hair color</option>
                                <option value="GREEN">Green</option>
                                <option value="RED">Red</option>
                                <option value="YELLOW">Yellow</option>
                            </select>
                            {errors.person?.hairColor && <p className="text-red-500">Hair Color is required.</p>}
                        </div>
                        <div>
                            {/* Person Location */}
                            <h3 className="font-bold mb-2">Person Location</h3>
                            <input
                                type="number"
                                placeholder="Location X"
                                {...register('person.location.x')}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />

                            <input
                                type="number"
                                placeholder="Location Y"
                                {...register('person.location.y', {required: true})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />
                            {errors.person?.location?.y && <p className="text-red-500">Location Y is required.</p>}

                            <input
                                type="number"
                                placeholder="Location Z"
                                {...register('person.location.z', {required: true})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />
                            {errors.person?.location?.z && <p className="text-red-500">Location Z is required.</p>}

                            <input
                                type="text"
                                placeholder="Location Name"
                                {...register('person.location.name', {required: true, minLength: 1,
                                    onBlur: (e) => setValue('person.location.name', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />
                            {errors.person?.location?.name &&
                                <p className="text-red-500">Location Name is required and cannot be empty.</p>}

                            <label htmlFor="person.birthday" className="block mb-1 font-medium">Birthday</label>
                            <input
                                type="date"
                                placeholder="Birthday"
                                {...register('person.birthday')}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />

                            <input
                                type="number"
                                placeholder="Height"
                                {...register('person.height', {required: true, min: 1})}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />
                            {errors.person?.height && <p className="text-red-500">Height must be greater than 0.</p>}

                            <input
                                type="text"
                                placeholder="Passport ID"
                                {...register('person.passportID', {
                                    required: "Passport ID is required.",
                                    maxLength: {
                                        value: 25,
                                        message: "Passport ID cannot be exceed 25 characters."
                                    },
                                    validate: (value) => {
                                        const isUnique = !persons.some(p => p.passportID === value) || selectedPerson !== '';
                                        return isUnique || "Passport ID already exists.";
                                    },
                                    onBlur: (e) => setValue('person.passportID', e.target.value.trim())
                                })}
                                className="border p-2 mb-2 w-full"
                                disabled={selectedPerson !== ''}
                            />
                            {errors.person?.passportID &&
                                <p className="text-red-500">{errors.person.passportID.message}</p>
                            }
                        </div>
                    </div>

                    <div className="border-t-2 pt-2 mt-2 flex justify-end col-span-3">
                        <button type="submit" className={`text-white disabled:bg-gray-500 bg-blue-500 p-2 mr-2 rounded`} disabled={loading}>
                            Add
                        </button>
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;
