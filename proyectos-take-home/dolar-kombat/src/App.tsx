import { useEffect, useState } from 'react';
import { DolarData } from './DolarData';
import audio from '../public/14. The Tower.mp3';

function App() {
	const [currentDolar, setCurrentDolar] = useState<DolarData | null>(null);

	const bills = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 0];

	useEffect(() => {
		const fetchDolar = async () => {
			try {
				const data = await fetch('https://api.bluelytics.com.ar/v2/latest', {
					method: 'GET',
				});

				if (!data) return;
				const results = await data.json();

				setCurrentDolar(results.oficial);
			} catch (error) {
				console.error(error);
			}
		};
		fetchDolar();
	}, []);

	if (!currentDolar) return <div>Cargando...</div>;

	return (
		<main>
			<audio src={audio} autoPlay={true}>
				Your browser does not support the <code>audio</code> element.
			</audio>
			<div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
				<div className='tower_container'>
					{bills.map((bill, idx) => {
						const nextBill = bills[idx + 1] ?? -Infinity;

						const shouldRenderDolar = currentDolar.value_avg <= bill && currentDolar.value_avg > nextBill;

						let difference;
						if (shouldRenderDolar) {
							difference = ((bill - currentDolar.value_avg) / (bill - nextBill)) * 100;
							console.log(difference);
						}
						return (
							<div
								key={idx}
								className='step_container'
								style={{
									height: `${100 / bills.length}%`,
								}}
							>
								{shouldRenderDolar ? (
									<div
										className='dolar_container'
										style={{
											top: `${difference}%`,
											animation: 'climbing 5s ease-in-out',
										}}
									>
										<img alt='1 dollar' src='/dollar.png' />
										<p className='dolar_value'>
											{currentDolar.value_avg.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
										</p>
									</div>
								) : (
									<p></p>
								)}
							</div>
						);
					})}
				</div>
				<img alt='Tower' src='/tower.png' className='tower' style={{ marginLeft: '-5.5rem' }} />
			</div>
		</main>
	);
}

export default App;
