import React, { useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Icon,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue
} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable
} from '@tanstack/react-table';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import axios from 'axios';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

type FishType = {
	id: number;
	name: string;
	price: string;
	ukuran_awal: string;
	waktu_panen: string;
	ukuran_panen: string;
	stocking_density: string;
	fcr: string;
	fish_food_id: string;
	waktu_sampling: string;
	created_at: string | null;
	updated_at: string;
};

const columnHelper = createColumnHelper<FishType>();

const ComplexTable: React.FC = () => {
	const [data, setData] = useState<FishType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://api2.nokt.tech/fishtypes');
				setData(response.data.fishTypes);
			} catch (err) {
				setError('Failed to fetch data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400">
					NAME
				</Text>
			),
			cell: (info) => (
				<Flex align="center">
					<Text color={textColor} fontSize="sm" fontWeight="700">
						{info.getValue()}
					</Text>
				</Flex>
			),
		}),
		columnHelper.accessor('price', {
			id: 'price',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400">
					PRICE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					Rp. {info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('ukuran_awal', {
			id: 'ukuran_awal',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400">
					UKURAN AWAL
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()} gram
				</Text>
			),
		}),
		columnHelper.accessor('waktu_panen', {
			id: 'waktu_panen',
			header: () => (
				<Text
					justifyContent="space-between"
					align="center"
					fontSize={{ sm: '10px', lg: '12px' }}
					color="gray.400">
					WAKTU PANEN
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize="sm" fontWeight="700">
					{info.getValue()} months
				</Text>
			),
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<Text>Loading...</Text>
			</Box>
		);
	}

	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="red.500">
				<Text>{error}</Text>
			</Box>
		);
	}

	return (
		<Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px="25px" mb="8px" justifyContent="space-between" align="center">
				<Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
					Complex Table - Fish Types
				</Text>
				<Menu />
			</Flex>
			<Box>
				<Table variant="simple" color="gray.500" mb="24px" mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe="10px"
											borderColor={borderColor}
											cursor="pointer"
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent="space-between"
												align="center"
												fontSize={{ sm: '10px', lg: '12px' }}
												color="gray.400">
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor="transparent">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
};

export default ComplexTable;
