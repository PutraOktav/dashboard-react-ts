// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
	// State untuk menyimpan data
	const [fishTypes, setFishTypes] = useState([]);
	const [fishFoods, setFishFoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [fishTypesResponse, fishFoodsResponse] = await Promise.all([
					axios.get('https://api2.nokt.tech/fishtypes'),
					axios.get('https://api2.nokt.tech/fishfood'),
				]);
				setFishTypes(fishTypesResponse.data.fishTypes);
				setFishFoods(fishFoodsResponse.data.fishFoods);
			} catch (err) {
				setError('Error fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Handling loading state
	if (loading) {
		return (
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
				<p>Loading...</p>
			</Box>
		);
	}

	// Handling error state
	if (error) {
		return (
			<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
				<p>{error}</p>
			</Box>
		);
	}

	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid mb="20px" columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
				{/* Menggunakan tabel dengan data fishTypes dan fishFoods */}
				<DevelopmentTable data={fishTypes} />
				<CheckTable data={fishFoods} />
				{/* Jika ingin menambahkan tabel lain, Anda dapat menyesuaikannya di sini */}
				<ColumnsTable data={fishTypes} />
				<ComplexTable data={fishFoods} />
			</SimpleGrid>
		</Box>
	);
}

