import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	let startStep = true;
	let finalStep = false;

	if (activeIndex > 0) startStep = false;
	if (activeIndex === steps.length - 1) finalStep = true;

	const nextStep = () => {
		if (finalStep) setActiveIndex(0);
		else setActiveIndex((index) => index + 1);
	};
	const backStep = () => {
		setActiveIndex((index) => index - 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => {
							return (
								<li
									className={
										styles['steps-item'] +
										' ' +
										(activeIndex === index ? styles.active : null) +
										' ' +
										(activeIndex > index ? styles.done : null)
									}
									key={id}
								>
									<button
										className={styles['steps-item-button']}
										key={id}
										onClick={() => setActiveIndex(index)}
									>
										{index + 1}
									</button>
									{title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={startStep}
							onClick={backStep}
						>
							Назад
						</button>
						<button className={styles.button} onClick={nextStep}>
							{finalStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
